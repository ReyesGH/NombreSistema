var app = angular.module("silPortal");

app.service("BusquedaComisionesServices", ["$q", "$timeout","$http",
  function BusquedaComisionesServices($q, $timeout,$http) {
	 this.getComisionInstancia = function getComisionInstancia() {
		    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/ComisionesConsulta/getComisionIntegrantes/0'
			    });
			  };
	 this.getCatTipoComisiones = function getCatTipoComisiones() {
		    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/ComisionesConsulta/getCatTipoComisiones'
			    });
			  };

	  this.CatPartido = function CatPartido() {
	    return $http({
	      method: 'GET',
	       url: '/SilPortal/REST/Catalogos/CatPartido'
		    });
		  };
	  this.CatPuestoComision = function CatPuestoComision() {
		    return $http({
		      method: 'GET',
		       url: '/SilPortal/REST/Catalogos/CatPuestoComision'
			    });
			  };
  }
]);

app.controller("BusquedaComisionesCtrl", ["$scope", "$uibModal", "BusquedaComisionesServices", "DTOptionsBuilder", "DTColumnBuilder" ,
  function BusquedaComisionesCtrl($scope, mo, BusquedaComisionesServices,DTOptionsBuilder, DTColumnBuilder) {
      
    $scope.currentContact;
    $scope.sidebar = {};
    $scope.sidebar.isActive = true;   
    var dt = this;
    
    BusquedaComisionesServices.getCatTipoComisiones().then(function(result) {
        $scope.CatTipoComisiones = result.data;
      });
    BusquedaComisionesServices.CatPartido().then(function(result) {
        $scope.CatPartido = result.data;
      });
    BusquedaComisionesServices.CatPuestoComision().then(function(result) {
        $scope.CatPuestoComision = result.data;
      });

    dt.formulario={}
    dt.message = '';
    dt.someClickHandler = someClickHandler;
    dt.persons = {};
    dt.llenarTabla=function(data){	  
      dt.options = DTOptionsBuilder.newOptions()
      .withOption('data',data)   
        .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
        .withBootstrap()
        .withLanguage({
          paginate: {
            previous: "&laquo;",
            next: "&raquo;",
          },
          search: "_INPUT_",
          searchPlaceholder: "Buscar…",
          sLoadingRecords: "Cargando...",
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 a 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
          sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
          sZeroRecords: "No se encontraron registros coincidentes",
        })
        .withOption("order", [
          [5, "desc"]
        ])
         .withButtons([
            {
                extend:    'print',
                text:      '<i class="glyphicon glyphicon-print fa-2x" aria-hidden="true" width="200px" height="200px" ></i>',
                titleAttr: 'Imprimir'
            },
            {
                extend:    'excelHtml5',
                 text:      '<i class="glyphicon glyphicon-export fa-2x" aria-hidden="true"></i>',
                titleAttr: 'Excel'
            },
             {
                extend:    'colvis',
                
                 text:      '<i class="glyphicon glyphicon-minus fa-2x" aria-hidden="true"></i>',
                titleAttr: 'Ocultar columnas'
            }
            
        ])
        
        
        .withOption('rowCallback', rowCallback)
        .withOption("responsive", true);
      dt.columns = [
        DTColumnBuilder.newColumn("descripcionTipoComision").withTitle("Nombre Comisión"),
        DTColumnBuilder.newColumn("comision").withTitle("Comisiones"),
        DTColumnBuilder.newColumn("descripcionInstancia").withTitle("Instancia"),
        DTColumnBuilder.newColumn("nombreIntegrante").withTitle("Integrante"),
        DTColumnBuilder.newColumn("nombrePresidente").withTitle("Presidente"),        
        DTColumnBuilder.newColumn("nombreSecretario").withTitle("Secretario"),
        DTColumnBuilder.newColumn("nombrePartido").withTitle("Partido")
        
      ];
    }


    
    BusquedaComisionesServices.getComisionInstancia().then(function(result) {
        $scope.getLegisladores = result.data;
        dt.llenarTabla($scope.getLegisladores)
      });
      
     
      
    function someClickHandler(info) {
        dt.message = info.idConfLegislatura + ' - ' + info.nombreIntegrante;
        window.location.href = '#!/legisladorPerfil/' + info.idConfLegislatura + '#';
      
    }
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function() {
            $scope.$apply(function() {
                dt.someClickHandler(aData);
            });
        });
        return nRow;
    }
    $scope.filtrar=function(){
    	var data=[];
    	for (var i = 0; i < $scope.getLegisladores.length; i++) {
    		item=$scope.getLegisladores[i];
    		countErr=0;
    		if(dt.formulario.comision && dt.formulario.comision!="" &&  !item.comision){
                countErr++;
    		}else if ( dt.formulario.comision && dt.formulario.comision!="" && !item.comision.toUpperCase().includes(dt.formulario.comision.toUpperCase())  )
            {
              countErr++;
            }
    		if(dt.formulario.nombreIntegrante && dt.formulario.nombreIntegrante!="" &&  !item.nombreIntegrante){
                countErr++;
    		}else if ( dt.formulario.nombreIntegrante && dt.formulario.nombreIntegrante!="" && !item.nombreIntegrante.toUpperCase().includes(dt.formulario.nombreIntegrante.toUpperCase())  )
            {
              countErr++;
            }
    		

    		if (dt.formulario.idTipoComision && dt.formulario.idTipoComision!="" &&   parseInt(item.idTipoComision ,10) != parseInt(dt.formulario.idTipoComision ,10))
            {
              countErr++;
            }

    		if (dt.formulario.idCatInstancia && dt.formulario.idCatInstancia!="" &&   parseInt(item.idCatInstancia ,10) != parseInt(dt.formulario.idCatInstancia ,10))
            {
              countErr++;
            }

    		if (dt.formulario.idPartido && dt.formulario.idPartido!="" &&   parseInt(item.idPartido ,10) != parseInt(dt.formulario.idPartido ,10))
            {
              countErr++;
            }

    		if (dt.formulario.idCatPuestoComision && dt.formulario.idCatPuestoComision!="" &&   parseInt(item.idCatPuestoComision ,10) != parseInt(dt.formulario.idCatPuestoComision ,10))
            {
              countErr++;
            }  		
    		
    		if(countErr==0){
    			data.push(item);
    		}
    	
    	}
    	dt.llenarTabla(data);    	
    }
  }]);