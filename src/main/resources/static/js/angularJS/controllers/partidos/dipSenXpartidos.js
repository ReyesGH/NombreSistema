var app = angular.module("silPortal");

app.service("dipSenXpartidosService", ["$q", "$timeout",'$http',
  function dipSenXpartidosService($q, $timeout,$http) {
	 this.getPartido = function getPartido(id_instancia,id_partido) {
		    return $http({
		      method: 'GET',
		      url: '/SilPortal/REST/partidos/getpartido/'+id_instancia+"/"+id_partido
		    });
		  };
  }
]);

app.controller("dipSenXpartidosCtrl", ["$scope","$rootScope", "$uibModal", "dipSenXpartidosService", "DTOptionsBuilder", "DTColumnBuilder" ,'$stateParams',
  function dipSenXpartidosCtrl($scope,$rootScope, mo, dipSenXpartidosService,DTOptionsBuilder, DTColumnBuilder,$stateParams) {

	$scope.idPartido=$stateParams["idPartido"];
	$scope.idInstancia=$stateParams["idInstancia"];	
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;

    this.$onInit = function () {
    	dipSenXpartidosService.getPartido($scope.idInstancia,$scope.idPartido)
        .then(function success(response) {
            $scope.partido = response.data;
            $scope.total_total=0;
          
          },
          function error(response) {
            console.log("Error al consultar catalogo de acciones acciones");
          });   
    	
    }

   var dt = this;
   
    dt.message = '';
    // dt.someClickHandler = someClickHandler;
    dt.persons = {};
      dt.options = DTOptionsBuilder
        .fromSource("/SilPortal/REST/Legislador/getLegisladores/"+$scope.idInstancia+"/partido/"+$scope.idPartido)
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
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 a 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
          sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
          sLoadingRecords: "Cargando...",
          sZeroRecords: "No se encontraron registros coincidentes"
        })
        .withOption("order", [
          [0, "asc"]
        ])
        .withButtons([
            {
                extend:    'print',
                text:      '<i class="glyphicon glyphicon-print fa-2x" aria-hidden="true" width="200px" height="200px" ></i>',
                titleAttr: 'Imprimir',
                exportOptions: {columns : "1,2,3,4,5,6" },
            },
            {
                extend:    'excelHtml5',
                 text:      '<i class="glyphicon glyphicon-export fa-2x" aria-hidden="true"></i>',
                titleAttr: 'Excel',
                exportOptions: {columns : "1,2,3,4,5,6" },
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
          DTColumnBuilder.newColumn("numfila").withTitle("No"),
        DTColumnBuilder.newColumn("photo").withTitle('Foto').renderWith(actionsHtml),
        DTColumnBuilder.newColumn("nombre").withTitle("Nombre(s)").renderWith(actionsHtml1),
        DTColumnBuilder.newColumn("legislatura").withTitle("Legislatura"),
        DTColumnBuilder.newColumn("instancia").withTitle("Instancia"),
        DTColumnBuilder.newColumn("partido").withTitle("Partido"),
        DTColumnBuilder.newColumn("princEleccion").withTitle("Tipo de Elecci&oacute;n"),
        DTColumnBuilder.newColumn("estadoDistrito").withTitle("Entidad").renderWith(concatenaEntidades),
        DTColumnBuilder.newColumn("tomaProtesta").withTitle("Protesta"),
        DTColumnBuilder.newColumn("tipo").withTitle("Tipo"),
        DTColumnBuilder.newColumn("estatus").withTitle("Estatus"),
        DTColumnBuilder.newColumn("suplente").withTitle("Suplente")
        
      ];
      function concatenaEntidades(info, type, full, meta) {
     	   return (full.estadosCircunscripcion!=null?full.estadosCircunscripcion:'')+(full.estadosCircunscripcion!=null && full.estadoDistrito!=null?',':'' )+(full.estadoDistrito!=null?full.estadoDistrito:'');
        }
      
      function actionsHtml(info, type, full, meta) {
          return '<img style="max-width:30px;" src="'+$rootScope.rootRepoImagenes+info+'">';
      }
      
    
      
     function actionsHtml1(info, type, full, meta) {
  	      return '<a href="#!/legisladorPerfil/' + full.id + '">'+full.nombre+'</a>';
  	    }
      
     
      
      function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      
          return nRow;
      }
      
    }
  ]);
