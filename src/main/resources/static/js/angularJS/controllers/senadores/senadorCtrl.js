var app = angular.module("silPortal");

app.service("SenadorService", ["$q", "$timeout", "$http",
  function SenadorService($q, $timeout, $http) {
   
  }
]);

app.controller("SenadorCtrl", ["$scope", "$stateParams", "$uibModal", "SenadorService", "$http",
  function SenadorCtrl($scope, $stateParams, mo, SenadorService,$http) {
   
    $scope.contactId = $stateParams.contactId;

    $scope.contacts = [];
    
   
    var jsonData = [];
    $http({
        method: 'GET',
      
        
       
        url: '/SilPortal/REST/Legislador/getLegislador/' + $scope.contactId
        
        
      }).then(function successCallback(response) {
          console.log(response.data);
          $scope.contacts.push(response.data);
      
        }, function errorCallback(response) {
      	  console.log(response);
        
        });
    
    return jsonData;
    
    
  
    
  }
]);