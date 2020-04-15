var app = angular.module("silPortal");
app.service("ComisionTipoService", ["$q", "$timeout","$http",
	  function ComisionTipoService($q, $timeout,$http) {
		this.get = function getLegisladores(url) {
		    return $http({
		      method: 'GET',
		      url: url
		    });
		  };
	  }
	]);
app.controller("ComisionTipoCtrl", ["$scope","ComisionTipoService", "$stateParams", "$uibModal", "$http",
  function ComisionTipoCtrl($scope,ComisionTipoService, $stateParams, mo, $http) {
    // Almacena el Id del Diputado que deseamsos consultar y viene en la URL  Ejemplo: index.html#!/legisladorPerfil/1   .
    $scope.comisionId = $stateParams.tipo;

    $scope.obtenerComision = function(url) {
      $http.get(url)
      
        .then(function(response) {
          $scope.data = response.data;
          console.log("status:" + response.status);
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        });
    }
    $scope.url = "/SilPortal/REST/ComisionesConsulta/getComision/" + $scope.comisionId + ""
//    $scope.url = "https://vfs.cloud9.us-east-1.amazonaws.com/vfs/51bcdeb762904f8cb92f62c2d17a39b5/preview/silv1-segob/src/main/webapp/js/angularJS/json/comision/ordinaria-" + $scope.comisionId + ".json"
    $scope.obtenerComision($scope.url);

    $scope.totalIniciativas=0;
    $scope.totalMinutas=0;
    $scope.totalPorposiciones=0;
    
    ComisionTipoService.get('/SilPortal/REST/mysql/getIniciativaPropByComision/'+$scope.comisionId+"/11").then(function(respons) {
	    $scope.totalIniciativas=respons.data.length;
      }).catch(function(response) {
  	    $scope.totalIniciativas=0;
        console.error('Error occurred:', response.status, response.data);
      });
    
    ComisionTipoService.get('/SilPortal/REST/mysql/getIniciativaPropByComision/'+$scope.comisionId+"/17").then(function(respons) {
	    $scope.totalMinutas=respons.data.length;
      }).catch(function(response) {
        console.error('Error occurred:', response.status, response.data);
      });
    
    ComisionTipoService.get('/SilPortal/REST/mysql/getIniciativaPropByComision/'+$scope.comisionId+"/19").then(function(respons) {
	    $scope.totalPorposiciones=respons.data.length;
      }).catch(function(response) {
        console.error('Error occurred:', response.status, response.data);
      });
    
    
    
    
  }
]);