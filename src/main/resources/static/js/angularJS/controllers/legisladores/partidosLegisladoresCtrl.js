var app = angular.module("silPortal");

app.service("PartidosLegisladoresService", ["$q", "$timeout",'$http',
    function PartidosLegisladoresService($q, $timeout,$http) {
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


    	  	  this.getPartidos = function getPartidos() {
    	  		    return $http({
    	  		      method: 'GET',
    	  		      url: '/SilPortal/REST/partidos/getpartidos/1' 
    	  		    
    	  		     
    	  		    });
    	  		  };
    }
]);


app.service("PartidosSenadoresService", ["$q", "$timeout",'$http',
    function PartidosSenadoresService($q, $timeout,$http) {
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


    	  	  this.getPartidos = function getPartidos() {
    	  		    return $http({
    	  		      method: 'GET',
    	  		      url: '/SilPortal/REST/partidos/getpartidos/2'
    	  		      //url: '/REST/partidos/getpartidos/2'
    	  		     
    	  		    });
    	  		  };
    }
]);




app.controller("PartidosLegisladoresCtrl", ["$scope","$uibModal", "PartidosLegisladoresService",  "DTOptionsBuilder", "DTColumnBuilder",
    function PartidosLegisladoresCtrl($scope,  mo, PartidosLegisladoresService, DTOptionsBuilder, DTColumnBuilder) {
     
  
         $scope.contacts = [];
        $scope.groupedContacts = [];
        $scope.currentContact;

        $scope.sidebar = {};
        $scope.sidebar.isActive = true;

        PartidosLegisladoresService.getContacts().then(function(contacts) {
            $scope.contacts = contacts;
        });
        
       
        var dt = this;
        

        dt.message = '';

        this.$onInit = function () {
        	PartidosLegisladoresService.getPartidos()
            .then(function success(response) {
                $scope.partidosLista = response.data;
                $scope.total_total=0;
                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.total_total=$scope.total_total+$scope.partidosLista[i].total;                	
                }

                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.partidosLista[i].porcentaje=parseFloat(($scope.partidosLista[i].total*100)/$scope.total_total).toFixed(2);                	
                }
                console.log($scope.total_total);
              },
              function error(response) {
                console.log("Error al consultar catalogo de acciones acciones");
              });   
        	
        }
        this.porcentajefuncion=function (total,total_total){      

            console.log(total+"   "+total_total);
        	return 	parseFloat(item.total/total_total).toFixed(2);
        }
      
       




}

]);



app.controller("PartidosSenadoresCtrl", ["$scope","$uibModal", "PartidosSenadoresService",  "DTOptionsBuilder", "DTColumnBuilder",
    function PartidosSenadoresCtrl($scope,  mo, PartidosSenadoresService, DTOptionsBuilder, DTColumnBuilder) {
     
  
         $scope.contacts = [];
        $scope.groupedContacts = [];
        $scope.currentContact;

        $scope.sidebar = {};
        $scope.sidebar.isActive = true;

        PartidosSenadoresService.getContacts().then(function(contacts) {
            $scope.contacts = contacts;
        });
        
         
        var dt = this;
     

        dt.message = '';

        this.$onInit = function () {
        	PartidosSenadoresService.getPartidos()
            .then(function success(response) {
                $scope.partidosLista = response.data;
                $scope.total_total=0;
                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.total_total=$scope.total_total+$scope.partidosLista[i].total;                	
                }

                for(var i = 0; i < $scope.partidosLista.length; i++) {
                	$scope.partidosLista[i].porcentaje=parseFloat(($scope.partidosLista[i].total*100)/$scope.total_total).toFixed(2);                	
                }
                console.log($scope.total_total);
              },
              function error(response) {
                console.log("Error al consultar catalogo de acciones acciones");
              });   
        	
        }
        this.porcentajefuncion=function (total,total_total){      

            console.log(total+"   "+total_total);
        	return 	parseFloat(item.total/total_total).toFixed(2);
        }
      
       





}

]);