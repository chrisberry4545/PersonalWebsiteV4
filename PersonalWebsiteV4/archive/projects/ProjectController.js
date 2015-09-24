(function(){

  angular
       .module('projects')
       .controller('ProjectController', ['projectSpinnerDirective', 'projectsService', '$log', '$q', '$scope',
          ProjectController
       ]);

  function ProjectController(projectSpinnerDirective, projectsService, $log, $q, $scope) {
    var vm = this;
    vm.projects = [];

    projectsService
          .loadAllProjects()
          .then( function( projects ) {
              vm.projects = [].concat(projects);
          });


  }

})();
