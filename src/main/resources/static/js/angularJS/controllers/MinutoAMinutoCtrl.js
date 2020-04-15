 var app = angular.module("silPortal");
            app.service("MinutoAMinutoServices", ["$q", "$timeout","$http",
            	  function MinutoAMinutoServices($q, $timeout,$http) {
       
         		 this.getMinutoMinuto = function getMinutoMinuto(idPoder) {
     			    return $http({
     				      method: 'GET',
     				       url: '/SilPortal/REST/mysql/getMinutoMinuto/'+idPoder
     				    });
     				  };

            	  }
            	]);

            app.controller("MinutoAMinutoCtrl", ["$scope", "$uibModal", "MinutoAMinutoServices", "DTOptionsBuilder", "DTColumnBuilder",
            	  function MinutoAMinutoCtrl($scope, mo, MinutoAMinutoServices,DTOptionsBuilder, DTColumnBuilder) {
            	var dt = this;
            	dt.ListaMinuto=[];
            	dt.ListaOrdenDia=[];
            	dt.ListaMinutoDia=[];
            	
                dt.ListaOrdenDiaTot=0;
                dt.poder=1;

            dt.poderSelecciona= function (cvePoder){
                dt.poder=cvePoder;
                dt.getDatos(dt.poder);
            }
            dt.minutoOrdenSelecciona=function(indice,minutoOrden){
                dt.minutoPrincipal[indice].minutoOrden=minutoOrden;                             
            }


            
            dt.optionsMinuto = DTOptionsBuilder  
            .newOptions()
     	      .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
     	        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
     	      .withBootstrap()
     	      .withLanguage({
     	        paginate: {
     	          previous: "&laquo;",
     	          next: "&raquo;",
     	        },
	 	          search: "_INPUT_",
	 	          searchPlaceholder: "Buscar",
     	        sEmptyTable: "No existen datos",
     	        sInfo: "Mostrar _START_ a _END_ de _TOTAL_ registros",
     	        sInfoEmpty: "Mostrar 0 a 0 de 0 registros",
     	        sLengthMenu: "Mostrar _MENU_ registros",
     	       sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
               sLoadingRecords: "Cargando...",
               sZeroRecords: "No se encontraron registros coincidentes"
     	      })    
    	      .withOption('aaSorting', false)
     	      .withOption('bFilter', false)
     	      .withOption("responsive", false);
            
            dt.optionsOrden = DTOptionsBuilder.newOptions()
    	      .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
    	        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
    	      .withBootstrap()
    	      .withLanguage({
    	        paginate: {
    	          previous: "&laquo;",
    	          next: "&raquo;",
    	        },
	 	          search: "_INPUT_",
	 	          searchPlaceholder: "Buscar",
    	        sEmptyTable: "No existen datos",
    	        sInfo: "Mostrar _START_ a _END_ de _TOTAL_ registros",
    	        sInfoEmpty: "Mostrar 0 a 0 de 0 registros",
    	        sLengthMenu: "Mostrar _MENU_ registros",
    	        sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
    	          sLoadingRecords: "Cargando...",
    	          sZeroRecords: "No se encontraron registros coincidentes"
    	      })
    	      .withOption('aaSorting', false)
    	      .withOption('bFilter', false)
    	      .withOption("responsive", false);
            
            dt.getDatos= function (cvePoder){
            	MinutoAMinutoServices.getMinutoMinuto(cvePoder).then(function(result) {
            		dt.minutoPrincipal = result.data;
                    for(var i = 0; i < dt.minutoPrincipal.length; i++) {
                    	dt.minutoPrincipal[i].indice=i;
                    	dt.minutoPrincipal[i].minutoOrden=1;
                        for(var j = 0; j < dt.minutoPrincipal[i].ordendia.length; j++) {
                        	dt.minutoPrincipal[i].ordendia[j].numero=j+1;  
                        }
                     }    
                  });    
              	
            }
            dt.getDatos(dt.poder);

            }]);