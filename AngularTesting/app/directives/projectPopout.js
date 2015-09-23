(function () {

    angular.module('projectPopoutDirective', [])
        .directive('projectPopout', [function () {

            function link(scope, element, attrs) {
            }

            function compile(tElement, tAttr) {

                return function (scope, iElement, iAttr) {
                    
                    var animTime = 1000;
                    scope.activeProj = null;

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

                    var projWithLoadedImages = [];
                    var imageToLoad = 0;
                    scope.imageLoaded = function () {
                        projWithLoadedImages.push(this.proj);
                    }

                    var timeBetweenImgLoads = scope.timebetweenimgloads;


                    setTimeout(function () {


                        var repeatLoadImages = setInterval(function () {
                            if (imageToLoad < scope.projects.length) {
                                if (projWithLoadedImages.length > imageToLoad) {
                                    projWithLoadedImages[imageToLoad].imgIsLoaded = true;
                                    imageToLoad++;
                                    scope.$apply();
                                }
                            } else {
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
                templateUrl: 'project-popout-template.html'
            };
        }]);

})();

