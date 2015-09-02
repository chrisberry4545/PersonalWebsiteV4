﻿(function () {

    angular
         .module('home')
         .controller('HomeController', ['cutoutnameDirective', 'scrollDownButtonDirective', 'skillsSummaryDirective', 'projectPopoutDirective', 'projectsService', '$log', '$q', '$scope',
            HomeController
         ]);

    function HomeController(cutoutnameDirective, scrollDownButtonDirective, skillsSummaryDirective, projectPopoutDirective, projectsService, $log, $q, $scope) {
        var vm = this;

        vm.projects = [];
        vm.skills = [];

        projectsService
          .loadAllProjects()
          .then(function (projects) {
              vm.projects = projects//;.slice(0, 3);
              //vm.projects2 = projects.slice(3, projects.length);
              //vm.projects3 = projects.slice(6, projects.length);
          });

        projectsService.loadAllKeySkills()
            .then(function (skills) {
                vm.skills = [].concat(skills);
        });
    }

})();
