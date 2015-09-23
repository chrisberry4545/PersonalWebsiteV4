(function () {

    angular.module('projects')
        .controller('ProjectDetailController', ['$scope', '$routeParams',
      function ($scope, $routeParams) {
          var vm = this;
          vm.test = "hello";
          vm.phoneId = $routeParams.projectId;
      }]);

})();
