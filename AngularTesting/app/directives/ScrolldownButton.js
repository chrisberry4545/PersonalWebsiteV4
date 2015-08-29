(function () {

    angular.module('scrollDownButtonDirective', [])
        .directive('scrollDownButton', [function () {

            function link(scope, element, attrs) {
            }

            function compile(tElement, tAttr) {

                return function (scope, iElement, iAttr) {


                    function findPos(obj) {
                        var curtop = 0;
                        if (obj.offsetParent) {
                            do {
                                curtop += obj.offsetTop;
                            } while (obj = obj.offsetParent);
                            return [curtop];
                        }
                    }



                    scope.scrollToLocation = function () {

                        var target = document.getElementById(scope.targetid);
                        window.scroll(0, findPos(target));
                    }
                };
            }

            return {
                link: link,
                scope: {
                    targetid: '=targetid'
                },
                compile: compile,
                templateUrl: 'scrolldownbutton-template.html'
            };
        }]);

})();

