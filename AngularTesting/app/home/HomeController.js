﻿(function () {

    angular
         .module('home')
         .controller('HomeController',
         ['smoothScroll', 'cutoutnameDirective', 'skillsSummaryDirective',
             'projectPopoutDirective', 'projectsService',
             '$log', '$q', '$scope',
            HomeController
         ]);

    function HomeController(smoothScroll, cutoutnameDirective, skillsSummaryDirective, projectPopoutDirective, projectsService, $log, $q, $scope) {
        var vm = this;

        vm.projects = [];
        vm.skills = [];

        vm.animateElementIn = function ($el) {
            $el.removeClass('hidden');
            $el.addClass('animated fadeInUp'); // this example leverages animate.css classes 
        };

        vm.animateElementOut = function ($el) {
        }


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
