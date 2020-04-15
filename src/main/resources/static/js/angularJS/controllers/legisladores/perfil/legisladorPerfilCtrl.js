var app = angular.module("silPortal");
//var app = angular.module('silPortal', ['pascalprecht.translate']);
app.service("legisladorPerfilCtrlService", ["$q", "$timeout", "$http",
  function legisladorPerfilCtrlService($q, $timeout, $http) {
	  this.getLegislador = function getLegislador(id) {
		    return $http({
		      method: 'GET',
		     
		       url: '/SilPortal/REST/Legislador/getLegislador/'+id
		    });
		  };
		  this.getLegisladorLicencias = function getLegisladorLicencias(id) {
			    return $http({
				      method: 'GET',
				    
				       url: '/SilPortal/REST/Legislador/getLegisladorLicencias/'+id
				    });
				  };
		  this.getLegisladorTrayectoria = function getLegisladorTrayectoria(id) {
			    return $http({
			      method: 'GET',
			     
			       url: '/SilPortal/REST/Legislador/getLegisladorTrayectoria/'+id
			    });
			  };
			  this.getPartidos = function getPartidos(idPartido) {
		    return $http({
		      method: 'GET',
		     
		       url: '/SilPortal/REST/partidos/getpartido/1/'+idPartido
		    });
		  };
		  
		  this.getComisionesOrganos = function getComisionesOrganos(idoprconflegislatura) {
			    return $http({
			      method: 'GET',
			     
			       url: '/SilPortal/REST/ComisionesConsulta/getComisionesOrganos/'+idoprconflegislatura
			    });
			  };
			  this.getPosicionamientoPleno = function getPosicionamientoPleno(idLegislador) {
				    return $http({
				      method: 'GET',
				     
				       url: '/SilPortal/REST/mysql/getPosicionamientoPleno/'+idLegislador
				    });
				  };
				  this.getIniciativaProp = function getIniciativaProp(idLegislador,idAsunto) {
					    return $http({
					      method: 'GET',
					     
					       url: '/SilPortal/REST/mysql/getIniciativaProp/'+idLegislador+"/"+idAsunto
					    });
					  };

					  this.getVotacionesPorAsuntoLegislador = function getVotacionesPorAsuntoLegislador(idLegislador) {
						    return $http({
						      method: 'GET',
						     
						       url: '/SilPortal/REST/mysql/getVotacionesPorAsuntoLegislador/'+idLegislador
						    });
						  };
  }
]);

app.controller("legisladorPerfilCtrl", ["$scope","$rootScope", "$stateParams", "$uibModal", "legisladorPerfilCtrlService", "DTOptionsBuilder", "DTColumnBuilder", 
  function legisladorPerfilCtrl($scope,$rootScope, $stateParams, mo, legisladorPerfilCtrlService, DTOptionsBuilder, DTColumnBuilder) {
	var dt = this;
	  $scope.dtInstance={};
	  $scope.instancePosicionamientoPleno={};
	    $scope.searchOptions={};
	    $scope.panelconf={};
    $scope.contactId = $stateParams.contactId;

    $scope.contact = [];
   
    $scope.perfil_curricular_Lista=[];
    $scope.comision_organos_Lista=[];
    $scope.iniciativas_Lista=[];
    $scope.propocisiones_org_Lista=[];
    $scope.votaciones_nom_Lista=[];
    $scope.posicionamiento_pleno_Lista=[];
    $scope.licencias_lista=[];
    $scope.mostrar_pestana=1;
    $scope.cont_iniciativas=0;
    $scope.cont_propocisiones_org=0;
    $scope.cont_votaciones_nom=0;
    $scope.cont_posicionamiento_pleno=0;
    $scope.cont_licencias=0;
   
    var jsonData = [];
    legisladorPerfilCtrlService.getLegislador($scope.contactId)
    .then(function successCallback(response) {

          $scope.contact=response.data;
          cargaDetallesPerfil($scope.contact.idLegislador,$scope.contact.idLegislatura,$scope.contact.idPartido,$scope.contact.id);
        }, function errorCallback(response) {
      	  console.log(response);
      	  $scope.contact={};
        });


    
    function cargaDetallesPerfil(idLegislador,idLegislatura,idPartido,idConfLegislatora){ 
    	
        legisladorPerfilCtrlService.getLegisladorTrayectoria(idLegislador)
        .then(function success(response) {
        	var id_tipo_trayectoria="";
        	$scope.perfil_curricular_Lista=response.data;
        	$scope.perfil_curricular_Lista_tipo=[];
        	if($scope.perfil_curricular_Lista.length>0){
                for(var i = 0; i < $scope.perfil_curricular_Lista.length; i++) {
                	if(id_tipo_trayectoria!=$scope.perfil_curricular_Lista[i].id_tipo_trayectoria){
                		id_tipo_trayectoria=$scope.perfil_curricular_Lista[i].id_tipo_trayectoria;
                    	$scope.perfil_curricular_Lista_tipo.push($scope.perfil_curricular_Lista[i]);                		
                	}
        		}
        	}
        	
        },
        function error(response) {
          console.log("Error al consultar perfil curricular");
        });

        legisladorPerfilCtrlService.getPartidos(idPartido)
        .then(function success(response) {
        	$scope.partidoDetalle=response.data;
          },
          function error(response) {
            console.log("Error al consultar partidos ");
          });
        

        legisladorPerfilCtrlService.getLegisladorLicencias(idLegislador)
        .then(function success(response) {

        	$scope.licencias_lista=response.data;
        	$scope.cont_licencias=$scope.licencias_lista.length;
        	cargarLicencias($scope.licencias_lista);
          },
          function error(response) {
            console.log("Error al consultar Comisiones organos");
          });

        
        legisladorPerfilCtrlService.getComisionesOrganos(idConfLegislatora)
        .then(function success(response) {
        	$scope.comision_organos_Lista=response.data;
        	$scope.contact.comisiones=$scope.comision_organos_Lista.length;
        	cargarOrganosComisiones($scope.comision_organos_Lista);
          },
          function error(response) {
            console.log("Error al consultar Comisiones organos");
          });
/////////////////////////////carga votaciones_nom_Lista
        legisladorPerfilCtrlService.getVotacionesPorAsuntoLegislador(idLegislador)
        .then(function success(response) {
	        $scope.votaciones_nom_Lista=response.data;
	        $scope.cont_votaciones_nom=$scope.votaciones_nom_Lista.length;
	        cargarVotaciones($scope.votaciones_nom_Lista);
        },
        function error(response) {
        console.log("Error al consultar proposiciones");
        });
/////////////////////////////carga iniciativas
        legisladorPerfilCtrlService.getIniciativaProp(idLegislador,11)
        .then(function success(response) {

        	$scope.iniciativas_Lista=response.data;
        	$scope.cont_iniciativas=$scope.iniciativas_Lista.length;
        	cargarIniciativas($scope.iniciativas_Lista);
          },
          function error(response) {
            console.log("Error al consultar Iniciativa");
          });

/////////////////////////////carga propocisiones_org_Lista
        legisladorPerfilCtrlService.getIniciativaProp(idLegislador,19)
        .then(function success(response) {

        	$scope.propocisiones_org_Lista=response.data;
        	$scope.cont_propocisiones_org=$scope.propocisiones_org_Lista.length;
        	cargarProposiciones($scope.propocisiones_org_Lista);
          },
          function error(response) {
            console.log("Error al consultar proposiciones");
          });
        
        legisladorPerfilCtrlService.getPosicionamientoPleno(idLegislador)
        .then(function success(response) {
        	$scope.posicionamiento_pleno_Lista=response.data;
        	$scope.cont_posicionamiento_pleno=$scope.posicionamiento_pleno_Lista.length;
        	cargarPosicionamientoPleno($scope.posicionamiento_pleno_Lista);
          },
          function error(response) {
            console.log("Error al consultar posicionamiento ");
          });
    	
    }
    $scope.columnsOrganosComision = [
        DTColumnBuilder.newColumn("numfila").withTitle("No"),
        DTColumnBuilder.newColumn("comision").withTitle("Comisión/Organo"),
        DTColumnBuilder.newColumn("nombre").withTitle("Nombre"),
        DTColumnBuilder.newColumn("puesto").withTitle("Puesto"),
        DTColumnBuilder.newColumn("fechainicial").withTitle("Fecha Inicial"),
        DTColumnBuilder.newColumn("fechafinal").withTitle("Fecha Final"),
        DTColumnBuilder.newColumn("estatus").withTitle("Estatus")
        
      ];

    $scope.columnsIniciativas = [
        DTColumnBuilder.newColumn("DENOMINACION").withTitle("Denominación del Asunto"),
        DTColumnBuilder.newColumn("SUBCLASE").withTitle("Sub-Clasificación"),
        DTColumnBuilder.newColumn("PRESENTADA_EN").withTitle("Presentada en"),
        DTColumnBuilder.newColumn("FECHA_PRESENTACION").withTitle("Fecha de Presentación"),
        DTColumnBuilder.newColumn("ESTATUS").withTitle("Estatus"),
        DTColumnBuilder.newColumn("TEMA").withTitle("Tema")
      ];
    $scope.columnsProposiciones = [
        DTColumnBuilder.newColumn("DENOMINACION").withTitle("Denominación del Asunto"),
        DTColumnBuilder.newColumn("SUBCLASE").withTitle("Sub-Clasificación"),
        DTColumnBuilder.newColumn("PRESENTADA_EN").withTitle("Presentada en"),
        DTColumnBuilder.newColumn("FECHA_PRESENTACION").withTitle("Fecha de Presentación"),
        DTColumnBuilder.newColumn("ESTATUS").withTitle("Estatus"),
        DTColumnBuilder.newColumn("TEMA").withTitle("Tema")
      ];
    

    $scope.columnsPosicionamientoPleno = [
        DTColumnBuilder.newColumn("FECHA").withTitle("Fecha"),
        DTColumnBuilder.newColumn("ASUNTO").withTitle("Asunto"),
        DTColumnBuilder.newColumn("DESC_INTERVENCION").withTitle("Tipo de intervención"),
        DTColumnBuilder.newColumn("POSICION").withTitle("Postura"),
        DTColumnBuilder.newColumn("COMENTARIO").withTitle("Intervención")
      ];
    
    $scope.columnsVotaciones = [
        DTColumnBuilder.newColumn("DENOMINACION").withTitle("Tipo de Asuntos"),
        DTColumnBuilder.newColumn("AFAVOR").withTitle("A Favor"),
        DTColumnBuilder.newColumn("CONTRA").withTitle("En Contra"),
        DTColumnBuilder.newColumn("ABSTENCION").withTitle("Abstención"),
        DTColumnBuilder.newColumn("AUSENTE").withTitle("Ausente"),
        DTColumnBuilder.newColumn("TOTAL").withTitle("Total")
      ];
    $scope.columnsLicencias = [
        DTColumnBuilder.newColumn("numfila").withTitle("No"),
        DTColumnBuilder.newColumn("tipo").withTitle("Tipo Licencia"),
        DTColumnBuilder.newColumn("periodo_inicio").withTitle("Periodo Inicio"),
        DTColumnBuilder.newColumn("periodo_fin").withTitle("Periodo Fin"),
        DTColumnBuilder.newColumn("observaciones").withTitle("Observaciones")
      ];
      
    function cargarOrganosComisiones(data){
        
        $scope.optionsrganosComision = DTOptionsBuilder.newOptions()
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
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
          sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
          sLoadingRecords: "Cargando...",
          sZeroRecords: "No se encontraron registros coincidentes"
        })
        .withOption("order", [
          [1, "desc"]
        ])
         .withButtons([
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
        .withOption("responsive", true);
    }
    function cargarIniciativas(data){
        $scope.optionsIniciativas = DTOptionsBuilder.newOptions()
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
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
            
        })
        .withOption("order", [
          [1, "desc"]
        ])
         .withButtons([
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
        .withOption("responsive", true);
    }

    function cargarProposiciones(data){
        
        $scope.optionsProposiciones = DTOptionsBuilder.newOptions()
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
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
            
        })
        .withOption("order", [
          [1, "desc"]
        ])
         .withButtons([
//            {
//                extend:    'print',
//                text:      '<i class="glyphicon glyphicon-print fa-2x" aria-hidden="true" width="200px" height="200px" ></i>',
//                titleAttr: 'Imprimir'
//            },
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
        .withOption("responsive", true);
    }

    function cargarPosicionamientoPleno(data){
        $scope.optionsPosicionamientoPleno = DTOptionsBuilder.newOptions()
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
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
            
        })
        .withOption("order", [
          [1, "desc"]
        ])
         .withButtons([
//            {
//                extend:    'print',
//                text:      '<i class="glyphicon glyphicon-print fa-2x" aria-hidden="true" width="200px" height="200px" ></i>',
//                titleAttr: 'Imprimir'
//            },
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
        .withOption("responsive", true);
    }
    
  function cargarVotaciones(data){
        $scope.optionsVotaciones = DTOptionsBuilder.newOptions()
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
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
            
        })
        .withOption("order", [
          [1, "desc"]
        ])
         .withButtons([
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
        .withOption("responsive", true);
    }
  
  function cargarLicencias(data){
      $scope.optionsLicencias = DTOptionsBuilder.newOptions()
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
        sEmptyTable:     "No existen datos",
        sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
        sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
        sLengthMenu:     "Mostrar _MENU_ registros",

      })
      .withOption("order", [
        [0, "desc"]
      ])
       .withButtons([
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
      .withOption("responsive", true);
  }
  
  $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=200,height=200');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    } 
  }
]);
