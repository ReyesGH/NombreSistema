var app = angular.module("silPortal");

app.service("directoriolegisladoresService", ["$q", "$timeout", "$http",
  function directoriolegisladoresService($q, $timeout, $http) {
    this.search = search = (ViewLegisladorReport) => {
      return $http({
        method: 'POST',
       
        url:"/SilPortal/REST/Legislador/getLegisladorDirectorio",
        data: ViewLegisladorReport
      });
    }
    
	  this.CatLegislatura = function CatLegislatura() {
		    return $http({
		      method: 'GET',
		       url: '/SilPortal/REST/Catalogos/CatLegislatura'
		    });
		  };
	  this.CatPartido = function CatPartido() {
		    return $http({
		      method: 'GET',
		       url: '/SilPortal/REST/Catalogos/CatPartido'
			    });
			  };
  }
]);

app.controller("directoriolegisladoresCtrl", ["$scope", "$uibModal", "directoriolegisladoresService", "DTOptionsBuilder", "DTColumnBuilder",
  function directoriolegisladoresCtrl($scope, mo, directoriolegisladoresService, DTOptionsBuilder, DTColumnBuilder) {


    $scope.sidebar = {};
    $scope.sidebar.isActive = true;
    $scope.datos = [];
    $scope.tipoEleccion = [];
    $scope.json = {};
    $scope.ViewLegisladorReport = {};   
    
    var dt = this;

    dt.message = '';

    dt.persons = {};
    
    dt.options = DTOptionsBuilder
      .fromSource(null)
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
    
    dt.columnsDirectorio = [
        DTColumnBuilder.newColumn("no").withTitle('No.'),        
        DTColumnBuilder.newColumn("nombre").withTitle("Nombre(s)")
        .renderWith(actionsHtml),
        DTColumnBuilder.newColumn("email").withTitle("Correo"),
        DTColumnBuilder.newColumn("ubicacion").withTitle("Dirección"),
        DTColumnBuilder.newColumn("telefono").withTitle("Teléfono"),
        DTColumnBuilder.newColumn("principio").withTitle("Tipo elección"),
        DTColumnBuilder.newColumn("estado").withTitle("Entidad"),
        DTColumnBuilder.newColumn("partido").withTitle("Partido"),
        DTColumnBuilder.newColumn("funciones").withTitle("En funciones"),
        DTColumnBuilder.newColumn("id").withTitle("Id Legislatura").withOption('visible', false),
      ];



    function actionsHtml(info, type, full, meta) {
      return '<a href="#!/legisladorPerfil/' + full.id + '">'+full.nombre+'</a>';
    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {    	

    	return nRow;
    }



    $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    }

    $scope.getDatos = () => {
    	directoriolegisladoresService.CatLegislatura()
        .then(function success(response) {            
            $scope.legislaturas = response.data;
          },
          function error(response) {
        
       });
    	directoriolegisladoresService.CatPartido()
        .then(function success(response) {            
            $scope.partidos = response.data;
          },
          function error(response) {
        
       });
    }

    $scope.init = () => {
      $scope.getDatos();
    }

    $scope.init();
    $scope.bndEleccion = false;
    $scope.getAllTipoEleccion = function(idInstancia){
    	legisladoresService.getAllTipoEleccion(idInstancia).then(
			function success(response){
				console.log(response.data.length);
				$scope.ViewLegisladorReport.id_principio = null;
				$scope.ViewLegisladorReport.idCircunscripcion = null;
				
				if(response.data.length !== 0){
					$scope.tipoEleccion = null;
					$scope.tipoEleccion = response.data;
					
					$scope.bndEleccion = true;
					$scope.bndCir= false;
				    $scope.bndEntidad = false;
				    $scope.bndDistrito = false;
				    $scope.bndPartido = false;
				}else{
					$scope.bndInstancia = false;
					$scope.bndEleccion = false;
					$scope.bndCir= false;
				    $scope.bndEntidad = false;
				    $scope.bndDistrito = false;
				    $scope.bndPartido = false;				    
				}				    			    					
			},
			function error(response){
				
			}
		)
	}
    
    $scope.bndInstancia = false;    
    $scope.bndEntidad = false;
    $scope.bndDistrito = false;
    $scope.bndPartido = false;
    $scope.bndCir= false;
    
    $scope.validarTipoEleccion = function(){
    	
    	if($scope.ViewLegisladorReport.idinstancia == 1){    		
    		if($scope.ViewLegisladorReport.id_principio == 1){
    			$scope.bndEntidad = true;
    		    $scope.bndDistrito = true;
    		    $scope.bndPartido = true;
    		    $scope.bndCir= false;
    		}else if($scope.ViewLegisladorReport.id_principio == 3){
    			$scope.bndEntidad = false;
    		    $scope.bndDistrito = false;
    		    $scope.bndPartido = true;
    		    $scope.bndCir= true;
    		}    		
    	}else if($scope.ViewLegisladorReport.idinstancia == 7){
    		if($scope.ViewLegisladorReport.id_principio == 1 || $scope.ViewLegisladorReport.id_principio == 2){
    			$scope.bndEntidad = true;
    			$scope.bndPartido = true;
    		    $scope.bndDistrito = false;    		    
    		    $scope.bndCir= false;
    		}else if($scope.ViewLegisladorReport.id_principio == 3){
    			$scope.bndEntidad = false;
    		    $scope.bndDistrito = false;
    		    $scope.bndPartido = true;
    		    $scope.bndCir= true;
    		}       		
    	}    	    
    }

    $scope.buscar = () => {    
      if (!$scope.isEmpty($scope.ViewLegisladorReport))
    	  $scope.search();
      else
    	  alert('En necesario ingresar por lo menos uno o dos datos');
    }
    
    $scope.borrar = () => {
    	   $scope.ViewLegisladorReport={
    	    		idlegislatura:"0",
    	    		idinstancia:"0",
    	    		idpartido:"0"
    	    }
      $scope.datos = [];
    }
    $scope.borrar ();
    $scope.search = () => {
    	directoriolegisladoresService.search($scope.ViewLegisladorReport)
        .then(function success(response) {            
            $scope.datos = response.data;
            if ($scope.datos.length == 0)
          	  alert("No existen datos!");
          },
          function error(response) {
            $scope.message = '';
            if (response.status === 404) {
              $scope.errorMessage = 'Accion not found!';
            }
            else {
              $scope.errorMessage = "Error getting Accion!";
            }
          });
    }
    
    $scope.searchByNombre = () => {    	
    	console.log($scope.ViewLegisladorReport.nombre);
    	console.log($scope.ViewLegisladorReport.apellidoPaterno);
    	console.log($scope.ViewLegisladorReport.apellidoMaterno);
    	if( ($scope.ViewLegisladorReport.nombre !== undefined && $scope.ViewLegisladorReport.nombre !== '') || 
    		($scope.ViewLegisladorReport.apellidoPaterno !== undefined && $scope.ViewLegisladorReport.apellidoPaterno !== '') ||
    		($scope.ViewLegisladorReport.apellidoMaterno !== undefined && $scope.ViewLegisladorReport.apellidoMaterno !== '')
    	)
    	{
    		directoriolegisladoresService.searchByNombre($scope.ViewLegisladorReport)
              .then(
                function success(response) {
                  console.log(response.data);
                  $scope.datos = response.data;
                  if ($scope.datos.length == 0)
                	  alert("No existen datos!");	
                },
                function error(response) {
                  $scope.message = '';
                  if (response.status === 404) {
                    $scope.errorMessage = 'Accion not found!';
                  }
                  else {
                    $scope.errorMessage = "Error getting Accion!";
                  }
                }
	        );
	    }else{
	    	alert('En necesario ingresar por lo menos un dato');
	    }
    } 
    
    $scope.isEmpty = (object) => {
    	for (var item in object)
    		 return false;    	
    	return true;
    }
  }	


]);