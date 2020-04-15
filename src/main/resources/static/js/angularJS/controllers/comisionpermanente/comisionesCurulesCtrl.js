var app = angular.module("silPortal");

app.service("ComisionesCurulesService", ["$q", "$timeout","$http",
  function DiputadosCurulesService($q, $timeout,$http) {
	this.get = function getLegisladores(url) {
	    return $http({
	      method: 'GET',
	      url: url
	    });
	  };
	
  }
]);

app.controller("ComisionesCurulesCtrl", ["$scope", "$uibModal", "ComisionesCurulesService", 
  function ComisionesCurulesCtrl($scope, mo, ComisionesCurulesService) {

    
	urljsonPartidos='/SilPortal/REST/partidos/getpartidos/3';
	 ComisionesCurulesService.get(urljsonPartidos).then(function(respons) {
        $scope.partidosLista = respons.data;
        $scope.partidosLista = respons.data;
        $scope.total_total=0;
        for(var i = 0; i < $scope.partidosLista.length; i++) {
        	$scope.total_total=$scope.total_total+$scope.partidosLista[i].total;                	
        }

        for(var i = 0; i < $scope.partidosLista.length; i++) {
        	$scope.partidosLista[i].porcentaje=parseFloat(($scope.partidosLista[i].total*100)/$scope.total_total).toFixed(2);                	
        }
      }).catch(function(response) {
        console.error('Error occurred:', response.status, response.data);
      });
    
  }
]);



app.controller("ComisionesCurulesCtrlCurules", ["$scope", "$uibModal", "ComisionesCurulesService", "$stateParams",
  function ComisionesCurulesCtrlCurules($scope, mo, ComisionesCurulesService,$stateParams) {

$scope.idInstancia=3;
ComisionesCurulesService.get("/SilPortal/REST/Legislador/getLegisladores/"+$scope.idInstancia).then(function(response) {
    $scope.data = response.data;
    $scope.dataCurules=[];
    var urljson='js/angularJS/json/curulesComision.json';
    ComisionesCurulesService.get(urljson).then(function(respons) {
        $scope.curules = respons.data;
        for(var i=0;i<$scope.data.length;i++){
        //	console.log($scope.data[i]);        	
            for(var i2=0;i2<$scope.curules.length;i2++){
            	if(parseInt($scope.data[i].numCurul)-628==parseInt($scope.curules[i2].numCurul)){
            		$scope.data[i].d=$scope.curules[i2].d;
    	            $scope.dataCurules.push($scope.data[i]);
            	}       	
            }
        }
        //$scope.funcionCarga();
        console.log("status:" + response.status);
        $('[data-toggle="tooltip"]').tooltip();
        
      }).catch(function(response) {
        console.error('Error occurred:', response.status, response.data);
      });
    

	console.log($scope.dataCurules); 
    console.log("status:" + response.status);
    
  }).catch(function(response) {
    console.error('Error occurred:', response.status, response.data);
  });



 $scope.funcionHover = function(e,dis) {
		$scope.nombre=dis.nombre;
		$scope.partido=dis.partido;
	 var description = $("#descripcionCom");
	 var left = e.offsetX-50;
	 var top =e.offsetY-55;
		description.css({
			marginLeft : left,
			marginRight : -40,
			marginTop : top	,
			zIndex: 123568,
			whith:200
		});
		description.addClass('active');
		description.html(dis.nombre);
 }
 $scope.funcionLeave=function(){
	 var description = $("#descripcionCom"); 
		description.removeClass('active');
		description.html("");
 }
$scope.funcionEnvia=function(id){
window.location.href = '#!/legisladorPerfil/' + id + '#'

}


}
]);
