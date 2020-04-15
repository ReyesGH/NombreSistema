var app = angular.module("silPortal");

app.service("CamarasService", ["$q", "$timeout",
  function CamarasService($q, $timeout) {
    this.getContacts = function getContacts() {
      var defer = $q.defer();

      
      $timeout(function() {
        defer.resolve(
          [
           
          ]
        );
      }, 500);

      return defer.promise;
    };
  }
]);

app.controller("CamarasCtrl", ["$scope", "$stateParams", "$uibModal", "CamarasService", 
  function CamarasCtrl($scope, $stateParams, mo, CamarasService) {

    
    $scope.contactId = $stateParams.contactId;
   
    $scope.contacts = [];
    
   
    CamarasService.getContacts().then(function(contacts) {
      $scope.contacts = contacts;
    });
    
  }
]);
