(function () {

    angular.module('projectSpinnerDirective', [])
        .directive('projectSpinner', ['$interval', function ($interval) {

            function link(scope, element, attrs) {
                var timeoutId;

                function setUpScopeDefaults(optionsScope) {
                    optionsScope.selectedProject = optionsScope.selectedProject != null ? optionsScope.selectedProject : 0;
                    optionsScope.timeBetweenScroll = optionsScope.timeBetweenScroll != null ? optionsScope.timeBetweenScroll : 0;
                    optionsScope.usePreviousButton = optionsScope.usePreviousButton != null ? true : false;
                    optionsScope.useNextButton = optionsScope.useNextButton != null ? true : false;
                    optionsScope.scaleBetweenElements = optionsScope.scaleBetweenElements != null ? optionsScope.scaleBetweenElements : 100;
                }

                setUpScopeDefaults(scope);

                function updateProjectPositions() {
                    function makeTranslateVal(translateValX, translateValY) {
                        return 'translate(' + translateValX + 'px, ' + translateValY + 'px)';
                    }

                    function makeScaleVal(scaleVal) {
                        return 'scale(' + scaleVal + ',' + scaleVal + ')';
                    }

                    for (var i = 0; i < scope.projects.length; i++) {
                        var transformValueX;
                        var transformValueY;
                        var translateValue;

                        var distWithinArray = Math.abs(i - scope.selectedProject);
                        var distLooped = scope.selectedProject > scope.projects.length / 2 ? Math.abs(scope.projects.length - scope.selectedProject + i) : Math.abs(scope.selectedProject + (scope.projects.length - i));
                        var distanceFromSelected = Math.min(distWithinArray, distLooped);

                        //console.log("dist within: " + distWithinArray + " -- dist looped: " + distLooped + " -- distanceFromSelected:" + distanceFromSelected);

                        var middlePoint = scope.selectedProject + (scope.projects.length / 2);

                        var isAfterCurrent = false;
                        if (middlePoint > scope.projects.length) {
                            isAfterCurrent = i > scope.selectedProject || i < middlePoint - scope.projects.length;
                        } else {
                            isAfterCurrent = i > scope.selectedProject && i < middlePoint;
                        }

                        var scaleValue = 0.8 / distanceFromSelected;
                        if (i == scope.selectedProject) {
                            var beforeSelected = scope.selectedProject >= i;
                            scaleValue = 1;
                            transformValueX = 0;
                            transformValueY = 0;
                            transformValue = 'scale(0,0) translate(0,0)';
                        } else if (distanceFromSelected == scope.projects.length / 2) {
                            transformValueX = 0;
                            transformValueY = -distanceFromSelected * scope.scaleBetweenElements;
                        } else if (isAfterCurrent) {
                            transformValueX = -distanceFromSelected * scope.scaleBetweenElements;
                            transformValueY = Math.abs(transformValueX);
                        } else {
                            transformValueX = distanceFromSelected * scope.scaleBetweenElements;
                            transformValueY = -transformValueX;
                        }

                        scope.projects[i].transform = makeScaleVal(scaleValue) + " " + makeTranslateVal(transformValueX, transformValueY);
                    }
                }

                function previousProject() {
                    if (scope != null) {
                        scope.selectedProject--;
                        if (scope.selectedProject < 0) {
                            scope.selectedProject = scope.projects.length - 1;
                        }
                        updateProjectPositions();
                    }
                }

                function nextProject() {
                    if (scope != null) {
                        scope.selectedProject++;
                        if (scope.selectedProject >= scope.projects.length) {
                            scope.selectedProject = 0;
                        }
                        updateProjectPositions();
                    }
                }

                element.on('$destroy', function () {
                    if (scope.timeBetweenScroll > 0) {
                        $interval.cancel(timeoutId);
                    }
                });

                if (scope.timeBetweenScroll > 0) {
                    timeoutId = $interval(function () {
                        nextProject();
                    }, 5000);
                }

                if (scope.usePreviousButton) {
                    element[0].getElementsByClassName('prevProjectButtonWrapper')[0].getElementsByTagName('button')[0].addEventListener('click', function () {
                        previousProject();
                        scope.$apply();
                    });
                }
                if (scope.useNextButton) {
                    element[0].getElementsByClassName('nextProjectButtonWrapper')[0].getElementsByTagName('button')[0].addEventListener('click', function () {
                        nextProject();
                        scope.$apply();
                    });
                }


                updateProjectPositions();

            }

            return {
                link: link,
                scope: {
                    projects: '=projects',
                    selectedProject: '=selectedproject',
                    timeBetweenScroll: '=timebetweenscroll',
                    usePreviousButton: '=usepreviousbutton',
                    useNextButton: '=usenextbutton',
                    scaleBetweenElements: '=scalebetweenelements'
                },
                templateUrl: 'project-spinner-template.html'
            };
        }]);

})();

