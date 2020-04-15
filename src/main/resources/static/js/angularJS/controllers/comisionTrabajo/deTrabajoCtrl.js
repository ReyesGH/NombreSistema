var app = angular.module("silPortal");

app.service("DeTrabajoService", ["$q", "$timeout",
  function DeTrabajoService($q, $timeout) {

  }
]);

app.controller("DeTrabajoCtrl", ["$scope", "$uibModal", "DeTrabajoService", "DTOptionsBuilder", "DTColumnBuilder" ,
  function DeTrabajoCtrl($scope, mo, DeTrabajoService,DTOptionsBuilder, DTColumnBuilder) {
    $scope.obtenerComisionPermanenteComision = function(url) {
        $http.get(url)
          .then(function(response) {
            $scope.data = response.data;

          }).catch(function(response) {
            console.error('Error occurred:', response.status, response.data);
          }).finally(function() {

          });
      }
    $scope.contacts = [];
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;


    
    var dt = this;
    
    dt.message = '';
    dt.someClickHandler = someClickHandler;
    $scope.comision
      dt.options = DTOptionsBuilder
        .fromSource("/SilPortal/REST/ComisionesConsulta/getComisionInstancia/1/3")
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
          sInfoEmpty:      "Mostrar 0 de 0 de 0 registros",
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
                text:      '<i class="glyphicon glyphicon-print fa-2x"  aria-hidden="true"> </i>',
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
    	 DTColumnBuilder.newColumn("numfila").withTitle("No"),
    	 // DTColumnBuilder.newColumn("descripcionLegislatura").withTitle("Legislatura"),
         DTColumnBuilder.newColumn("descripcionInstancia").withTitle("Instancia"),
         DTColumnBuilder.newColumn("comision").withTitle("Comisi&oacute;n"),
         DTColumnBuilder.newColumn("estatusTexto").withTitle("Estatus"),
         DTColumnBuilder.newColumn("nombreIntegrante").withTitle("Presidente"),
         DTColumnBuilder.newColumn("nombrePartido").withTitle("Partido"),
         DTColumnBuilder.newColumn("ubicacion").withTitle("Ubicacion"),
         DTColumnBuilder.newColumn("nombreSecretario").withTitle("Secretario"),
         DTColumnBuilder.newColumn("telefonos").withTitle("Telefonos"),
         DTColumnBuilder.newColumn("paginaWeb").withTitle("Pagina Web")
     ];
      
   function someClickHandler(info) {
        dt.message = info.id + ' - ' + info.firstName;
        window.location.href = '#!/Comision/1/' + info.idTblComision + '#';
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