(function () {

    angular.module('skillsSummaryDirective', [])
        .directive('skillsSummary',  [function () {

            function link(scope, element, attrs) {


                angular.element(document).ready(function () {
                    var skillCanvases = document.getElementsByClassName('skillCanvas');

                    for (var i = 0; i < skillCanvases.length; i++) {
                        var currentCanvas = skillCanvases[i];

                        var ctx = currentCanvas.getContext('2d');

                        var currentSkill = scope.skills[i];
                        var numberOfSides = currentSkill.skillbreakdown.length,
                            size = 100,
                            Xcenter = currentCanvas.width / 2,
                            Ycenter = currentCanvas.height / 2;

                        ctx.textAlign = "center";
                        ctx.font = "14px 'Roboto', sans-serif";
                        ctx.beginPath();
                        ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

                        var adjustmentValue = 20;

                        for (var k = 0; k < numberOfSides; k++) {
                            var leftVal = Xcenter + size * Math.cos(k * 2 * Math.PI / numberOfSides);
                            var rightVal = Ycenter + size * Math.sin(k * 2 * Math.PI / numberOfSides);
                            ctx.fillText(currentSkill.skillbreakdown[k], leftVal, rightVal);
                            if (leftVal != Xcenter) {
                                leftVal = leftVal < Xcenter ? leftVal + adjustmentValue : leftVal - adjustmentValue;
                            }
                            if (rightVal != Ycenter) {
                                rightVal = rightVal < Ycenter ? rightVal + adjustmentValue : rightVal - adjustmentValue;
                            }

                            ctx.lineTo(leftVal, rightVal);
                            ctx.lineTo(Xcenter, Ycenter);
                        }

                        ctx.strokeStyle = "rgba(0,0,0,0.6)";
                        ctx.lineWidth = 1;
                        ctx.stroke();


                    }
                });

            }

            function compile(tElement, tAttr) {

                return {
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        var test = 1;
                        //var skillCanvases = document.getElementsByClassName('skillCanvas');

                        //$timeout(function () {
                        //    //DOM has finished rendering
                        //    var test = 1;
                        //});
                        //for (var i = 0; i < skillCanvases.length; i++) {
                        //    var currentCanvas = skillCanvases[i];

                        //    var ctx = currentCanvas.getContext('2d');
                        //    var numberOfSides = 6,
                        //        size = 150,
                        //        Xcenter = 150,
                        //        Ycenter = 150;

                        //    ctx.textAlign = "center";
                        //    ctx.font = "20px Georgia";
                        //    ctx.beginPath();
                        //    ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

                        //    for (var i = 0; i < numberOfSides; i++) {
                        //        var leftVal = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
                        //        var rightVal = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
                        //        ctx.lineTo(leftVal, rightVal);
                        //        ctx.fillText("Hello World!", leftVal, rightVal);
                        //        ctx.lineTo(Xcenter, Ycenter);
                        //    }

                        //    ctx.strokeStyle = "#000000";
                        //    ctx.lineWidth = 1;
                        //    ctx.stroke();

                        //}
                    }
                };
            }

            return {
                link: link,
                //compile: compile,
                scope: {
                    skills: '=skills'
                },
                templateUrl: 'skills-summary-template.html'
            };
        }]);

})();

