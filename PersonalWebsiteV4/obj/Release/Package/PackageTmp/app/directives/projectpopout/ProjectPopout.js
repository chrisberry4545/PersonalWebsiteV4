(function () {



    angular.module('projectPopoutDirective', [])
        .directive('ngLoad', ['$parse', function ($parse) {
    
        return {
            restrict: 'A',
            compile: function ($element, attr) {
                var fn = $parse(attr['ngLoad']);
    
                return function (scope, element, attr) {
                    element.on('load', function (event) {
                        scope.$apply(function () {
                            fn(scope, { $event: event });
                        });
                    });
                };
    
            }
        };
    
    }]);

    angular.module('projectPopoutDirective')
        .directive('projectPopout', [function () {

            function link(scope, element, attrs) {
            }

            function compile(tElement, tAttr) {

                return function (scope, iElement, iAttr) {
                    
                    var animTime = 1000;
                    scope.activeProj = null;
                    scope.allImagesLoaded = false;

                    scope.openPopup = function ($event) {

                        if (scope.activeProj == null) {
                            scope.activeProj = this.proj;
                            scope.activeProj.IsActive = true;
                            var imgEl = $event.currentTarget;
                            scope.activeImgEl = imgEl;
                            var boundingRect = imgEl.getBoundingClientRect();
                            var translateLeft = (window.innerWidth / 2) - boundingRect.left - (boundingRect.width / 2);
                            var translateTop = -boundingRect.top + 75;
                            scope.activeProj.transform =
                                'translate(' + translateLeft + 'px, ' + translateTop + 'px)';

                            setTimeout(function () {
                                scope.activeProj.ShowDetails = true;
                                scope.$apply();
                            }, animTime);
                        }

                    }

                    scope.closePopup = function () {
                        scope.activeProj.ShowDetails = false;

                        setTimeout(function () {
                            scope.activeProj.transform = 'translate(0,0)';
                            scope.activeProj.IsActive = false;
                            scope.activeProj = null;
                            scope.$apply();
                        }, animTime);
                    }

                    scope.imageLoaded = function () {
                        this.proj.imgIsReady = true;
                    }

                    var nextProjToLoad = 0;
                    var timeBetweenImgLoads = parseInt(scope.timebetweenimgloads, 10);

                    setTimeout(function () {

                        var repeatLoadImages = setInterval(function () {
                            if (nextProjToLoad < scope.projects.length) {
                                var projToExamine = scope.projects[nextProjToLoad];
                                if (projToExamine.imgIsReady) {
                                    nextProjToLoad++;
                                    projToExamine.imgIsLoaded = true;
                                    scope.$apply();
                                }
                            } else {
                                /*Used to hide the loading spinners so they are not still 
                                 * animating even though they are hidden, while still giving
                                 * the last image time to fade in.
                                */
                                setTimeout(function () {
                                    scope.allImagesLoaded = true;
                                    scope.$apply();
                                }, 500);
                                clearInterval(this);
                            }
                        }, parseInt(timeBetweenImgLoads, 10));


                    }, parseInt(scope.animstartdelay, 10));

                };
            }

            return {
                link: link,
                scope: {
                    projects: '=projects',
                    timebetweenimgloads: '=timebetweenimgloads',
                    animstartdelay: '=animstartdelay'
                },
                compile: compile,
                templateUrl: '/app/directives/projectpopout/project-popout-template.html'
            };
        }]);

})();

