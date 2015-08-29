(function () {

    angular.module('cutoutnameDirective', [])
        .directive('cutoutname', ['$interval', function ($interval) {

            function link(scope, element, attrs) {

            }
            
            function compile() {
                window.requestAnimFrame = (function (callback) {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
                })();

                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');

                var cShape = [[0, 150], [150, 150], [150, 150]];

                var bShape = {
                    x: 250,
                    y: 150,
                    width: 100,
                    height: 0
                }

                function drawShape(ctx, shape) {
                    var path = new Path2D();
                    path.moveTo(shape[0][0], shape[0][1])
                    for (var i = 1; i < shape.length; i++) {
                        path.lineTo(shape[i][0], shape[i][1]);
                    }
                    path.closePath();
                    ctx.fill(path);
                }

                function drawCanvasShapes() {
                    if (canvas.getContext) {
                        //coverCanvas();
                        ctx.fillStyle = '#ffffff';
                        drawShape(ctx, cShape);
                        ctx.fillRect(bShape.x, bShape.y, bShape.width, bShape.height);
                    }
                }
                setTimeout(function () {
                    animate(canvas.getContext('2d'), new Date().getTime());
                }, 500);


                var forwardAnimation = true;
                function animate(context, startTime) {
                    // update
                    var time = (new Date()).getTime() - startTime;

                    var linearSpeed = 100;
                    // pixels / second
                    var amountToMove = linearSpeed * time / 10000;

                    var targetHeight = 300;
                    bShape.height = bShape.height < targetHeight ? bShape.height + 2 * amountToMove : targetHeight;

                    var targetYB = 0;
                    bShape.y = bShape.y > targetYB ? bShape.y - amountToMove : targetYB;

                    var targetY = 300;
                    cShape[1][1] += amountToMove;
                    cShape[1][1] = cShape[1][1] < targetY ? cShape[1][1] : targetY;

                    var targetYSecond = 0;
                    cShape[2][1] -= amountToMove;
                    cShape[2][1] = cShape[2][1] > targetYSecond ? cShape[2][1] : targetYSecond;


                    // clear
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    drawCanvasShapes();

                    // request new frame
                    requestAnimFrame(function () {
                        animate(context, startTime);
                    });
                }
            }

            return {
                link: link,
                compile: compile,
                scope: {
                },
                templateUrl: 'cutoutname-template.html'
            };
        }]);

})();

