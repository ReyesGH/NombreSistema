var app = angular.module("silPortal");

app.controller("estadoCtrl", ["$scope","$rootScope", "$uibModal", "$http", "$q", "$location", "$stateParams", "DTOptionsBuilder", "DTColumnBuilder",
  function estadoCtrl($scope,$rootScope, mo, $http, $q, $location, $stateParams, DTOptionsBuilder, DTColumnBuilder) {

    $scope.estado = angular.lowercase($stateParams.entidad);
    $scope.path = $location.host();



    $scope.obtenerEstado = function() {
      $http.get("/SilPortal/REST/Catalogos/CatEstadoFoto/" + $scope.estado)
        .then(function(response) {
          $scope.EstadoInformacion = response.data;

        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
          console.log("Task Finished....");
       
        });
    }


    $scope.url = "/SilPortal/REST/Legislador/getLegisladores/partido/" + $scope.estado + ""

  
    $scope.obtenerEstado($scope.url);

    var dt = this;

    dt.message = '';

   
    dt.options1 = DTOptionsBuilder
    .fromSource("/SilPortal/REST/Legislador/getLegisladores/1/estado/" + $scope.estado)
    
      .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>> <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
      .withBootstrap()
      .withLanguage({
        paginate: {
          previous: "&laquo;",
          next: "&raquo;",
        },
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
        sEmptyTable: "No existen datos",
        sInfo: "Mostrar _START_ de _END_ de _TOTAL_ registros",
        sInfoEmpty: "Mostrar 0 a 0 de 0 registros",
        sLengthMenu: "Mostrar _MENU_ registros",
        sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
        sLoadingRecords: "Cargando...",
        sZeroRecords: "No se encontraron registros coincidentes"
      })
      .withOption("order", [
        [0, "asc"]
      ])
      .withButtons([{
          extend: 'print',
          text: '<i class="glyphicon glyphicon-print fa-2x" aria-hidden="true" width="200px" height="200px" ></i>',
          titleAttr: 'Imprimir'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="glyphicon glyphicon-export fa-2x" aria-hidden="true"></i>',
          titleAttr: 'Excel'
        },
        {
          extend: 'colvis',

          text: '<i class="glyphicon glyphicon-minus fa-2x" aria-hidden="true"></i>',
          titleAttr: 'Ocultar columnas'
        }
      ])
      .withOption('rowCallback', rowCallback)
      .withOption("responsive", true);
    dt.options2 = DTOptionsBuilder
    .fromSource("/SilPortal/REST/Legislador/getLegisladores/2/estado/" + $scope.estado)
     
      .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>> <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
      .withBootstrap()
      .withLanguage({
        paginate: {
          previous: "&laquo;",
          next: "&raquo;",
        },
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
        sEmptyTable: "No existen datos",
        sInfo: "Mostrar _START_ de _END_ de _TOTAL_ registros",
        sInfoEmpty: "Mostrar 0 de 0 de 0 registros",
        sLengthMenu: "Mostrar _MENU_ registros",
        sInfoFiltered:   "(Filtrado de _MAX_ entradas totales)",
        sLoadingRecords: "Cargando...",
        sZeroRecords: "No se encontraron registros coincidentes"
      })
      .withOption("order", [
        [0, "asc"]
      ])
      .withButtons([{
          extend: 'print',
          text: '<i class="glyphicon glyphicon-print fa-2x" aria-hidden="true" width="200px" height="200px" ></i>',
          titleAttr: 'Imprimir'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="glyphicon glyphicon-export fa-2x" aria-hidden="true"></i>',
          titleAttr: 'Excel'
        },
        {
          extend: 'colvis',

          text: '<i class="glyphicon glyphicon-minus fa-2x" aria-hidden="true"></i>',
          titleAttr: 'Ocultar columnas'
        }
      ])
      .withOption('rowCallback', rowCallback)
      .withOption("responsive", true);

    dt.columns = [
        DTColumnBuilder.newColumn("numfila").withTitle("No"),
      DTColumnBuilder.newColumn("photo").withTitle('Foto').notSortable().renderWith(actionsHtml), 
      DTColumnBuilder.newColumn("nombre").withTitle("Nombre(s)").renderWith(actionsHtml1), 
      DTColumnBuilder.newColumn("princEleccion").withTitle("Tipo de Elecci&oacute;n"),
      DTColumnBuilder.newColumn("distrito").withTitle("Distrito"),
      DTColumnBuilder.newColumn("partido").withTitle("Partido"),
      DTColumnBuilder.newColumn("estadoDistrito").withTitle("Entidad").renderWith(concatenaEntidades),
      DTColumnBuilder.newColumn("tomaProtesta").withTitle("Protesta"),
      DTColumnBuilder.newColumn("instancia").withTitle("Tipo")

    ];

    function actionsHtml(info, type, full, meta) {
        return '<img style="max-width:30px;" src="'+$rootScope.rootRepoImagenes+info+'">';
    }
    
    function concatenaEntidades(info, type, full, meta) {
    	   return (full.estadosCircunscripcion!=null?full.estadosCircunscripcion:'')+(full.estadosCircunscripcion!=null && full.estadoDistrito!=null?',':'' )+(full.estadoDistrito!=null?full.estadoDistrito:'');
    }
    
    function actionsHtml1(info, type, full, meta) {
	      return '<a href="#!/legisladorPerfil/' + full.id + '">'+full.nombre+'</a>';
	    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
     
      return nRow;
    }

  }
]);
