(function () {

    angular.module('skillsSummaryDirective', [])
        .directive('skillsSummary', [function () {

            function link(scope, element, attrs) {
            }

            return {
                link: link,
                scope: {
                    skills: '=skills'
                },
                templateUrl: 'skills-summary-template.html'
            };
        }]);

})();

