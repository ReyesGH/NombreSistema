var app = angular.module("silPortal");

app.service("DiputadoService", ["$q", "$timeout", "$http",
  function DiputadoService($q, $timeout, $http) {
   
  }
]);

app.controller("DiputadoCtrl", ["$scope", "$stateParams", "$uibModal", "DiputadoService", "$http",
  function DiputadoCtrl($scope, $stateParams, mo, DiputadoService,$http) {
   
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
