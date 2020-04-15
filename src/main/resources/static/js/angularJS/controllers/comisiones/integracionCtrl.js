var app = angular.module("silPortal");

app.service("IntegracionService", ["$q", "$timeout","$http",
  function IntegracionService($q, $timeout,$http) {
	  this.getComisionIntegrantes = function getComisionIntegrantes(idTblComision) {
		    return $http({
		      method: 'GET',
		      // url: '/REST/partidos/getpartidos/2'
		       url: '/SilPortal/REST/ComisionesConsulta/getComisionIntegrantes/'+idTblComision
		    });
		  };
		  this.getNumeraliaComision = function getNumeraliaComision(idTblComision) {
			    return $http({
			      method: 'GET',
			      // url: '/REST/partidos/getpartidos/2'
			       url: '/SilPortal/REST/ComisionesConsulta/getNumeraliaComision/'+idTblComision
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

app.controller("IntegracionCtrl", ["$scope", "$uibModal", "IntegracionService", "DTOptionsBuilder", "DTColumnBuilder" ,"$stateParams",
  function IntegracionCtrl($scope, mo, IntegracionService,DTOptionsBuilder, DTColumnBuilder,$stateParams) {
      
    $scope.contacts = [];
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;

    var dt = this;
	
    dt.idTblComision =$stateParams.idTblComision;
    dt.message = '';
    dt.someClickHandler = someClickHandler;

	$scope.url2 = "/SilPortal/REST/ComisionesConsulta/getComision/" + dt.idTblComision + ""
	IntegracionService.get($scope.url2).then(function(respons) {
		$scope.comisionCabecera=respons.data;
	  }).catch(function(response) {
	    console.error('Error occurred:', response.status, response.data);
	  });   
    
    IntegracionService.getComisionIntegrantes(dt.idTblComision).then(function(response) {
        $scope.integrantes = response.data;
      });
    IntegracionService.getNumeraliaComision(dt.idTblComision).then(function(response) {
        $scope.NumeraliaComision = response.data;
        $scope.total_total=0;
        var dataf=[];
        var partidoColores=[];
        for(var i = 0; i < $scope.NumeraliaComision.length; i++) {
        	$scope.NumeraliaComision[i].numero=i+1;  
        	partidoColores.push($scope.NumeraliaComision[i].partidoColor);
        	$scope.total_total=$scope.total_total+$scope.NumeraliaComision[i].total; 
        }
        var tot_porc=0.0;
        for(var i = 0; i < $scope.NumeraliaComision.length; i++) {
        	$scope.NumeraliaComision[i].porcentaje=parseFloat(($scope.NumeraliaComision[i].total*100)/$scope.total_total);         	
        	tot_porc=tot_porc+parseFloat(parseFloat($scope.NumeraliaComision[i].porcentaje).toFixed(2));
        	dataf.push({
        			"name":$scope.NumeraliaComision[i].nombre,
        			y:parseFloat(parseFloat($scope.NumeraliaComision[i].porcentaje).toFixed(2))
        	});
        }
        Highcharts.chart("container", {
            chart: {
                type: 'pie',
                backgroundColor: '#ffffff',
                width: 550,
                height: 530,
                options3d: {
                    enabled: true,
                    alpha: 30
                }
            },
             colors: partidoColores,
                     
            title: {
                text: 'Numeralia '
            },
            subtitle: {
                text: ' LXIV Legislatura '
            },
            
            plotOptions: {
                pie: {
                    innerSize: 130,
                    depth: 90
                }
            },
            series: [{
                name: 'Porcentaje',
                data:dataf,
                
            }]
        }); 
      });
    
      dt.options = DTOptionsBuilder
        .fromSource("/SilPortal/REST/ComisionesConsulta/getComisionIntegrantes/"+dt.idTblComision)
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
          [3, "desc"]
        ])
         .withButtons([{
            extend: 'print',
            text: '<i class="glyphicon glyphicon-print fa-2x"  aria-hidden="true"> </i>',
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
        DTColumnBuilder.newColumn("nombreIntegrante").withTitle("Legislador"),
        DTColumnBuilder.newColumn("descripcionLegislatura").withTitle("Legislatura"),
        DTColumnBuilder.newColumn("descripcionInstancia").withTitle("Instancia"),
        DTColumnBuilder.newColumn("estatusTexto").withTitle("Estatus"),
        DTColumnBuilder.newColumn("descripcionPuestoComision").withTitle("Cargo"),
        DTColumnBuilder.newColumn("nombrePartido").withTitle("Grupo Parlamentario")
     ];
      
   function someClickHandler(info) {
        dt.message = info.id + ' - ' + info.firstName;
        window.location.href = '#!/legisladorPerfil/' + info.idConfLegislatura +  '#';  
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
   
$scope.printDiv = function(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var popupWin = window.open('', '_blank', 'width=300,height=300');
  popupWin.document.open();
  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
  popupWin.document.close();
} 
    
  }
]);
