
var app = angular.module("silPortal");

app.service("numeraliaGeneroService", ["$q", "$timeout",'$http',
    function numeraliaGeneroService($q, $timeout,$http) {
	  this.getPartidos = function getPartidos(idInstancia) {
		    return $http({
		      method: 'GET',
		      url: '/SilPortal/REST/partidos/getpartidos/'+idInstancia
		    });
		  };
    }
]);




app.controller("numeraliaGeneroCtrl", ["$scope","$uibModal", "numeraliaGeneroService", "DTOptionsBuilder", "DTColumnBuilder","$stateParams",
    function numeraliaCtrl($scope,  mo, numeraliaGeneroService, DTOptionsBuilder, DTColumnBuilder,$stateParams) {
	$scope.idInstancia=$stateParams["idInstancia"];	
	$scope.numContainer="";
	
	$scope.init = function(id)
	  {
	     if(!$scope.idInstancia || $scope.idInstancia==""){
	    	 $scope.idInstancia= id;
	    		$scope.numContainer=""+id;
	     }
    	 $scope.onInit();
		
	  }
  
         $scope.contacts = [];
        $scope.groupedContacts = [];
        $scope.currentContact;

        $scope.sidebar = {};
        $scope.sidebar.isActive = true;

        var dt = this;

        dt.message = '';

        $scope.onInit = function () {
        	numeraliaGeneroService.getPartidos($scope.idInstancia)
            .then(function success(response) {
                $scope.partidosLista = response.data;
                $scope.total_total=0;
                var dataf=[];
                
                $scope.totalMujeres=0;
                $scope.totalHombres=0;
                
                $scope.porcentajeMujeres=0;
                $scope.porcentajeHombres=0;
                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.partidosLista[i].numero=i+1;  
                	
                	$scope.total_total=$scope.total_total+$scope.partidosLista[i].total; 

                	$scope.totalMujeres=$scope.totalMujeres+$scope.partidosLista[i].femenino; 
                	$scope.totalHombres=$scope.totalHombres+$scope.partidosLista[i].masculino; 
                }

            	
                $scope.porcentajeHombres=parseFloat(($scope.totalHombres*100)/$scope.total_total).toFixed(2);
            	dataf.push({
            			"name":"Hombres",
            			y:parseFloat($scope.porcentajeHombres)
            	});

                $scope.porcentajeMujeres=parseFloat(($scope.totalMujeres*100)/$scope.total_total).toFixed(2);
            	dataf.push({
            			"name":"Mujeres",
            			y:parseFloat($scope.porcentajeMujeres)
            	});

                var nombreGrafica="";
                if($scope.idInstancia==1){
                	nombreGrafica="Diputados"
                }else if ($scope.idInstancia==2) {
                	nombreGrafica="Senadores"
                } else {
                	nombreGrafica="Comisiones"
                }
                
                var chartt='container'+$scope.numContainer;
                Highcharts.chart(chartt, {
                    chart: {
                        type: 'pie',
                        backgroundColor: '#ffffff',
                        width: 550,
                        height: 530,
                        options3d: {
                            enabled: true,
                            alpha: 30
                        }
                        
                        
                    },
                     colors:["#9D2449","#B38E5D"],
                    
                    
                    title: {
                        text: 'Porcentaje Numeralia '+nombreGrafica
                    },
                    subtitle: {
                        text: ' LXIV Legislatura '
                    },
                    
                    plotOptions: {
                        pie: {
                            innerSize: 130,
                            depth: 90
                        }
                    },
                    
                   
                    series: [{
                        name: 'Porcentaje',
                        data:dataf,
                        
                    }]
                }); 
                
              },
              function error(response) {
                console.log("Error al consultar catalogo de acciones acciones");
              });   
        	
        }
        if($scope.idInstancia){
       	 $scope.onInit();
        }
      
        
        
        $scope.printDiv = function(divName) {
       var printContents = document.getElementById(divName).innerHTML;
       var popupWin = window.open('', '_blank', 'width=300,height=300');
       popupWin.document.open();
       popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
       popupWin.document.close();
     } 
       
       

}

]);