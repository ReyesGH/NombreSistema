var app = angular.module("silPortal");

app.service("SenadoresCurulesService", ["$q", "$timeout","$http",
  function SenadoresCurulesService($q, $timeout,$http) {
  	  this.get = function getLegisladores(url) {
		    return $http({
		      method: 'GET',
		      url: url
		    });
		  };

  }
]);

app.controller("SenadoresCurulesCtrl", ["$scope", "$uibModal", "SenadoresCurulesService", "$stateParams",
  function SenadoresCurulesCtrl($scope, mo, SenadoresCurulesService,$stateParams) {

	urljsonPartidos='/SilPortal/REST/partidos/getpartidos/2';
	 SenadoresCurulesService.get(urljsonPartidos).then(function(respons) {
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

	app.controller("SenadoresCurulesCtrlCurules", ["$scope", "$uibModal", "SenadoresCurulesService", "$stateParams",
	  function SenadoresCurulesCtrl($scope, mo, SenadoresCurulesService,$stateParams) {

	$scope.idInstancia=2;
	SenadoresCurulesService.get("/SilPortal/REST/Legislador/getLegisladores/"+$scope.idInstancia).then(function(response) {
        $scope.data = response.data;
        $scope.dataCurules=[];
        var urljson='js/angularJS/json/curulesSenadores.json';
        SenadoresCurulesService.get(urljson).then(function(respons) {
            $scope.curules = respons.data;
            for(var i=0;i<$scope.data.length;i++){
            //	console.log($scope.data[i]);        	
	            for(var i2=0;i2<$scope.curules.length;i2++){
            		var numeroCurulJson=parseInt($scope.curules[i2].numCurul, 10);
            		numeroCurulJson=numeroCurulJson-2;
	            	if($scope.data[i].numCurul && parseInt($scope.data[i].numCurul)==numeroCurulJson){
	            		$scope.data[i].d=$scope.curules[i2].d;
	    	            $scope.dataCurules.push($scope.data[i]);
	            	}       	
	            }
            }
            $scope.funcionCarga();
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
		 var description = $("#descripcionSen");
		 var elemento =$(".groupCurulSenador path#"+dis.numCurul)
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
		 var description = $("#descripcionSen"); 
			description.removeClass('active');
			description.html("");
	 }
     
$scope.funcionCarga=function(id,nombre,partido){
	console.log("id "+id+"  nombre "+nombre)
	$scope.nombre=nombre;
	$scope.partido=partido;
}
$scope.funcionEnvia=function(id){
	window.location.href = '#!/legisladorPerfil/' + id + '#'
	
}
  
    
  }
]);
