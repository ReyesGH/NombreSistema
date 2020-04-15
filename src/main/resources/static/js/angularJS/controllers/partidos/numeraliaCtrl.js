
var app = angular.module("silPortal");

app.service("numeraliaService", ["$q", "$timeout",'$http',
    function numeraliaService($q, $timeout,$http) {



	  this.getPartidos = function getPartidos(idInstancia) {
		    return $http({
		      method: 'GET',
		      url: '/SilPortal/REST/partidos/getpartidos/'+idInstancia
		    });
		  };
    }
]);




app.controller("numeraliaCtrl", ["$scope","$uibModal", "numeraliaService", "DTOptionsBuilder", "DTColumnBuilder","$stateParams",
    function numeraliaCtrl($scope,  mo, numeraliaService, DTOptionsBuilder, DTColumnBuilder,$stateParams) {
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
        	numeraliaService.getPartidos($scope.idInstancia)
            .then(function success(response) {
                $scope.partidosLista = response.data;
                $scope.total_total=0;
                var dataf=[];
                var partidoColores=[];
                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.partidosLista[i].numero=i+1;  
                	$scope.total_total=$scope.total_total+$scope.partidosLista[i].total; 
                }
                var tot_porc=0.0;
                $scope.partidosLista.sort(function (a, b) {
              	  if (String(a.nombre).length < String(b.nombre).length) {
              	    return -1;
              	  }
              	  return 1;
              	});
                
                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.partidosLista[i].porcentaje=parseFloat(($scope.partidosLista[i].total*100)/$scope.total_total);                	
                	tot_porc=tot_porc+parseFloat(parseFloat($scope.partidosLista[i].porcentaje).toFixed(2));

                	dataf.push({
            			"name":$scope.partidosLista[i].nombre,
            			y:parseFloat(parseFloat($scope.partidosLista[i].porcentaje).toFixed(2))
                	});
                	partidoColores.push($scope.partidosLista[i].partidoColor);

                }
                
               console.log(dataf);

                

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
                     colors:partidoColores,
                    
                    
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