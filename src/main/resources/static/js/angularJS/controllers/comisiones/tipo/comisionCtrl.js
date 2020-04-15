var app = angular.module("silPortal");

app.controller("comisionCtrl", ["$scope", "$stateParams", "$q", "$location", "$uibModal", "DTOptionsBuilder", "DTColumnBuilder", "$http",
  function comisionCtrl($scope, $stateParams, $q, $location, mo, DTOptionsBuilder, DTColumnBuilder, $http) {

    $scope.obtenerDiputadosComision = function(url) {
      $http.get(url)
        .then(function(response) {
          $scope.data = response.data;
          console.log("status:" + response.status);
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
          console.log("Task Finished....");
          //console.log("$scope.data: " + $scope.data[1].id);
        });
    }


    $scope.comision =$stateParams.comision;


    $scope.urlComisionDiputado = "/SilPortal/REST/ComisionesConsulta/getComisionInstancia/" + $scope.comision + "/1"
    $scope.urlComisionSenador = "/SilPortal/REST/ComisionesConsulta/getComisionInstancia/" + $scope.comision + "/2"

    var dt = this;

    dt.message = '';
    dt.someClickHandler = someClickHandler;

    //    dt.options = DTOptionsBuilder
    //      .fromSource("js/angularJS/json/comision/ordinaria.json")
    dt.optionsDiputado = DTOptionsBuilder.fromFnPromise(function() {
        var defer = $q.defer();
        $http.get($scope.urlComisionDiputado).then(function(result) {
          defer.resolve(result.data);
        });
        return defer.promise;
      })
      .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
      .withBootstrap()
      .withLanguage({
        paginate: {
          previous: "&laquo;",
          next: "&raquo;",
        },
        search: "_INPUT_",
        searchPlaceholder: "Busqueda Diputados",
        sEmptyTable: "No existen datos",
        sInfo: "Mostrar _START_ de _END_ de _TOTAL_ registros",
        sInfoEmpty: "Mostrar 0 a 0 de 0 registros",
        sLengthMenu: "Mostrar _MENU_ registros",

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

    dt.columnsDiputado = [
      DTColumnBuilder.newColumn("numfila").withTitle("No"),
      //DTColumnBuilder.newColumn("descripcionLegislatura").withTitle("Legislatura"),
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

    dt.optionsSenador = DTOptionsBuilder.fromFnPromise(function() {
        var defer = $q.defer();
        $http.get($scope.urlComisionSenador).then(function(result) {
          defer.resolve(result.data);
        });
        return defer.promise;
      })
      .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
      .withBootstrap()
      .withLanguage({
        paginate: {
          previous: "&laquo;",
          next: "&raquo;",
        },
        search: "_INPUT_",
        searchPlaceholder: "Busqueda Senadores",
        sEmptyTable: "No existen datos",
        sInfo: "Mostrar _START_ de _END_ de _TOTAL_ registros",
        sInfoEmpty: "Mostrar 0 de 0 de 0 registros",
        sLengthMenu: "Mostrar _MENU_ registros",

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

    dt.columnsSenador = [
    	 DTColumnBuilder.newColumn("numfila").withTitle("No"),
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

    function someClickHandler(registro) {
      dt.message = registro.id + ' - ' + registro.comision;
      //window.location.href = '#!/comisionOrdinariaTipo/' + registro.id + '#';
      console.log("dt.message: " + dt.message);
      $location.url('/Comision/' + $scope.comision + '/' + registro.idTblComision + '#')
    }


    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
      $('td', nRow).unbind('click');
      $('td', nRow).bind('click', function() {
        $scope.$apply(function() {
          dt.someClickHandler(aData);
        });
      });
      return nRow;
    }
    
    $http.get("/SilPortal/REST/ComisionesConsulta/getCatTipoComision/"+$scope.comision)
    .then(function(response) {
      $scope.comisionCabecera = response.data;
      console.log("status:" + response.status);
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
      console.log("Task Finished....");
      //console.log("$scope.data: " + $scope.data[1].id);
    });
    
    

  }
]);