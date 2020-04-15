var app = angular.module("silPortal");

app.service("suplentePerfilCtrlService", ["$q", "$timeout", "$http",
  function suplentePerfilCtrlService($q, $timeout, $http) {	
	  this.getLegislador = function getLegislador(id) {
		    return $http({
		      method: 'GET',
		      
		       url: '/SilPortal/REST/Legislador/getLegislador/'+id
		    });
		  };
	  this.getDatosSuplentes = function getDatosSuplentes(idConfLeg,idPersonaSuplente) {
		    return $http({
		      method: 'GET',
		       url: '/SilPortal/REST/Legislador/getDatosSuplentes/'+idPersonaSuplente
		    });
		  };	
}]);

app.controller("suplentePerfilCtrl", ["$scope", "$stateParams", "$uibModal", "suplentePerfilCtrlService", "DTOptionsBuilder", "DTColumnBuilder", 
	  function suplentePerfilCtrl($scope, $stateParams, mo, suplentePerfilCtrlService, DTOptionsBuilder, DTColumnBuilder) {

    $scope.idConfLeg = $stateParams.idConfLeg;
    $scope.idPersonaSuplente = $stateParams.idSuplente;
    
    suplentePerfilCtrlService.getLegislador($scope.idConfLeg)
    .then(function successCallback(response) {
          $scope.contact=response.data;
          suplentePerfilCtrlService.getDatosSuplentes($scope.idConfLeg,response.data.idSuplente)
          .then(function successCallback(response) {
                $scope.getDatosSuplentes=response.data[0];
               }, function errorCallback(response) {
            	  $scope.getDatosSuplentes={};
              });
        }, function errorCallback(response) {
      	  console.log(response);
      	  $scope.contact={};
        });
    

    
}]);	