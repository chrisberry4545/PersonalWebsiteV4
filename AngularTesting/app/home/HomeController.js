(function () {

    angular.module('home', []);

    angular
         .module('home')
         .controller('HomeController',
         ['cutoutnameDirective',
             'projectPopoutDirective', 'projectsService',
             '$log', '$q', '$scope',
            HomeController
         ]);

    function HomeController(cutoutnameDirective, projectPopoutDirective, projectsService, $log, $q, $scope) {
        var vm = this;

        vm.projects = [];

        projectsService
          .loadAllProjects()
          .then(function (projects) {
              vm.projects = projects
          });
    }

})();
