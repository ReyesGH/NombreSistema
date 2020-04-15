var app = angular.module("silPortal");

app.service("MinutasService", ["$q", "$timeout","$http",
  function MinutasService($q, $timeout,$http) {
	this.get = function getLegisladores(url) {
	    return $http({
	      method: 'GET',
	      url: url
	    });
	  };
  }
]);

app.controller("MinutasCtrl", ["$scope", "$uibModal", "MinutasService", "DTOptionsBuilder", "DTColumnBuilder" ,"$stateParams",
  function MinutasCtrl($scope, mo, MinutasService,DTOptionsBuilder, DTColumnBuilder,$stateParams) {

    $scope.comisionId =$stateParams.comision;
    
    $scope.url1='/SilPortal/REST/mysql/getIniciativaPropByComision/'+$scope.comisionId+"/17";
    MinutasService.get($scope.url1).then(function(respons) {
    	llenarTabla(respons.data);
      }).catch(function(response) {
        console.error('Error occurred:', response.status, response.data);
      });
	
	$scope.url2 = "/SilPortal/REST/ComisionesConsulta/getComision/" + $scope.comisionId + ""
	MinutasService.get($scope.url2).then(function(respons) {
			$scope.comisionCabecera=respons.data;
		  }).catch(function(response) {
		    console.error('Error occurred:', response.status, response.data);
		  });
    var dt = this;
    
    dt.message = '';
    dt.someClickHandler = someClickHandler;
    function llenarTabla(data){
    	
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
          [0, "desc"]
        ])
          .withButtons([
            {
                extend:    'print',
                text:      '<i class="glyphicon glyphicon-print" aria-hidden="true" width="200px" height="200px" ></i>',
                titleAttr: 'Imprimir'
            },
            {
                extend:    'excelHtml5',
                 text:      '<i class="glyphicon glyphicon-export" aria-hidden="true"></i>',
                titleAttr: 'Excel'
            },
             {
                extend:    'colvis',
                
                 text:      '<i class="glyphicon glyphicon-minus" aria-hidden="true"></i>',
                titleAttr: 'Ocultar columnas'
            }  
        ])
        .withOption('rowCallback', rowCallback)
        .withOption("responsive", true);
    }

      dt.columns = [
        DTColumnBuilder.newColumn("CVE_ASUNTO").withTitle("No"),
        DTColumnBuilder.newColumn("DENOMINACION").withTitle("Denominación del Asunto"),
        DTColumnBuilder.newColumn("SUBCLASE").withTitle("Sub Clasificación"),
        DTColumnBuilder.newColumn("PRESENTADA_EN").withTitle("Presentada en"),
        DTColumnBuilder.newColumn("FECHA_PRESENTACION").withTitle("Fecha de Presentación"),
        DTColumnBuilder.newColumn("TASUNTO").withTitle("Turnado a"),
        DTColumnBuilder.newColumn("ESTATUS").withTitle("Estatus"),
        DTColumnBuilder.newColumn("TEMA").withTitle("Tema")
        
      ];
      
   function someClickHandler(info) {

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