var app = angular.module("silPortal");

app.service("dipSenXpartidosComService", ["$q", "$timeout",'$http',
  function dipSenXpartidosComService($q, $timeout,$http) {
	 this.getPartido = function getPartido(id_partido) {
		    return $http({
		      method: 'GET',
		      url: "/SilPortal/REST/partidos/getpartido/partido/"+id_partido
		    });
		  };
		  this.get = function getLegisladores(url) {
			    return $http({
			      method: 'GET',
			      url: url
			    });
			  };
  }
]);

app.controller("dipSenXpartidosComCtrl", ["$scope", "$uibModal", "dipSenXpartidosComService", "DTOptionsBuilder", "DTColumnBuilder" ,'$stateParams',
  function dipSenXpartidosComCtrl($scope, mo, dipSenXpartidosComService,DTOptionsBuilder, DTColumnBuilder,$stateParams) {

	$scope.idPartido=$stateParams["idPartido"];
	$scope.idTblComision=$stateParams["idTblComision"];	
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;

    this.$onInit = function () {
    	dipSenXpartidosComService.getPartido($scope.idPartido)
        .then(function success(response) {
            $scope.partido = response.data;
            $scope.total_total=0;
          
          },
          function error(response) {
            console.log("Error al consultar catalogo de acciones acciones");
          });   
    	
    	$scope.url2 = "/SilPortal/REST/ComisionesConsulta/getComision/" + $scope.idTblComision + ""
    	dipSenXpartidosComService.get($scope.url2).then(function(respons) {
			$scope.comisionCabecera=respons.data;
		  }).catch(function(response) {
		    console.error('Error occurred:', response.status, response.data);
		  });
    	
    }

   var dt = this;
   
    dt.message = '';
    dt.someClickHandler = someClickHandler;
    dt.persons = {};
      dt.options = DTOptionsBuilder
        .fromSource("/SilPortal/REST/ComisionesConsulta/getComisionIntegrantesPartido/"+$scope.idTblComision+"/"+$scope.idPartido)
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
        DTColumnBuilder.newColumn("archivo").withTitle('Foto').notSortable()
            .renderWith(actionsHtml),
        DTColumnBuilder.newColumn("nombreIntegrante").withTitle("Nombre(s)"),
        DTColumnBuilder.newColumn("tipoEleccion").withTitle("Tipo de Elecci&oacute;n"),
        DTColumnBuilder.newColumn("descripcionTipoComision").withTitle("Tipo Comisi&oacute;n"),
        DTColumnBuilder.newColumn("estatus").withTitle("Estatus"),
        DTColumnBuilder.newColumn("nombreSup").withTitle("Suplente")
        
      ];
      
        function someClickHandler(info) {
        dt.message = info.id + ' - ' + info.firstName;
       window.location.href = '#!/legisladorPerfil/' + info.id + '#';        
    }
    
    function actionsHtml(info, type, full, meta) {
        return '<img style="max-width:30px;" src="'+info+'">';
    }
    
    
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Unbind first in order to avoid any duplicate handler (see
		// https://github.com/l-lin/angular-datatables/issues/87)
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