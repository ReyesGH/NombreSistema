var app = angular.module("silPortal");

app.service("NumeraliaIntegracionService", ["$q", "$timeout",
  function NumeraliaIntegracionService($q, $timeout) {
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

 app.controller("numeraliaIntegracionCtrl", ["$scope", "$stateParams", "$uibModal", "NumeraliaIntegracionService", 
  function numeraliaDiputadosCtrl($scope, $stateParams, mo, NumeraliaIntegracionService) {
    
   

   
  }
]);