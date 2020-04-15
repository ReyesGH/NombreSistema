var app = angular.module("silPortal");

app.service("OrganoIntegranteXpartidosService", ["$q", "$timeout",'$http',
  function OrganoIntegranteXpartidosService($q, $timeout,$http) {
	 this.getPartido = function getPartido(id_instancia,id_partido) {
		    return $http({
		      method: 'GET',
		      url: '/SilPortal/REST/Catalogos/getCatPartidoOnly/'+id_partido
		    });
		  };
			 this.CatTipoOrgano = function CatTipoOrgano(tipoOrgano) {
				    return $http({
					      method: 'GET',
					       url: '/SilPortal/REST/Catalogos/CatTipoOrgano/'+tipoOrgano
					    });
					  };    
  }
]); 

app.controller("OrganoIntegranteXpartidosCtrl", ["$scope", "$uibModal", "OrganoIntegranteXpartidosService", "DTOptionsBuilder", "DTColumnBuilder" ,'$stateParams',
  function dipSenXpartidosCtrl($scope, mo, OrganoIntegranteXpartidosService,DTOptionsBuilder, DTColumnBuilder,$stateParams) {

	$scope.idPartido=$stateParams["idPartido"];
	$scope.idInstancia=$stateParams["idInstancia"];	
	$scope.idTorgano=$stateParams["idTorgano"];	
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;

    this.$onInit = function () {
    	OrganoIntegranteXpartidosService.getPartido($scope.idInstancia,$scope.idPartido)
        .then(function success(response) {
            $scope.partido = response.data;
            $scope.total_total=0;
          
          },
          function error(response) {
            console.log("Error al consultar catalogo de acciones acciones");
          });   
    	OrganoIntegranteXpartidosService.CatTipoOrgano($scope.idTorgano).then(function(result) {
    	        $scope.CatTipoOrgano = result.data;
    	      });
    	
    }

   var dt = this;
   
   
   
   
    
    dt.message = '';
    dt.someClickHandler = someClickHandler;
    dt.persons = {};
      dt.options = DTOptionsBuilder
        .fromSource("/SilPortal/REST/OrganosConsulta/getOrganosIntegrantesPartido/"+$scope.idInstancia+'/'+$scope.idTorgano+'/'+$scope.idPartido)
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
        DTColumnBuilder.newColumn("photo").withTitle('Foto').notSortable()
            .renderWith(actionsHtml),
        DTColumnBuilder.newColumn("nombre").withTitle("Nombre(s)"),
        DTColumnBuilder.newColumn("princEleccion").withTitle("Tipo de Elecci&oacute;n"),
        DTColumnBuilder.newColumn("zona").withTitle("Entidad"),
        DTColumnBuilder.newColumn("tipoOrgano").withTitle("Tipo"),
        DTColumnBuilder.newColumn("estatus").withTitle("Estatus"),
        DTColumnBuilder.newColumn("nombreSuplente").withTitle("Suplente")
        
      ];
      
        function someClickHandler(info) {
        dt.message = info.id + ' - ' + info.firstName;
       window.location.href = '#!/legisladorPerfil/' + info.id + '#';
    }
    
    function actionsHtml(info, type, full, meta) {
        return '<img style="max-width:30px;" src="'+info+'">';
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
    
  }
]);