var app = angular.module("silPortal");

app.service("LegisldoresBusquedaServices", ["$q", "$timeout", "$http",
  function LegisldoresBusquedaServices($q, $timeout, $http) {
   
  }
]);

app.controller("legisladoresBusquedaCtrl", ["$scope", "$stateParams", "$uibModal", "LegisldoresBusquedaServices", "$http",
  function legisladoresBusquedaCtrl($scope, $stateParams, mo, LegisladoresBusquedaServices,$http) {
   
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