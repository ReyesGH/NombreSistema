var app = angular.module("silPortal");

app.service("porNombreServices", ["$q", "$timeout","$http",
  function porNombreServices($q, $timeout,$http) {
      
      

	  this.getPartidos = function getPartidos() {
		    return $http({
		      method: 'GET',
		    
		       url: '/SilPortal/REST/partidos/getpartidos'
		    });
		  };
		  this.getLegisladores = function getLegisladores(idPartido) {
			    return $http({
			      method: 'GET',
			    
			       url: '/SilPortal/REST/Legislador/getLegisladores/partido/'+idPartido
			    });
			  };
    this.getContacts = function getContacts() {
      var defer = $q.defer();

      $timeout(function() {
        defer.resolve(
          [
           
          ]
        );
      }, 500);

      return defer.promise;
    };
  }
]);

app.controller("porNombreCtrl", ["$scope","$rootScope", "$uibModal", "porNombreServices", "DTOptionsBuilder", "DTColumnBuilder" ,
  function porNombreCtrl($scope,$rootScope, mo, porNombreServices,DTOptionsBuilder, DTColumnBuilder) {

    $scope.contacts = [];
    $scope.partidos = [];
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;

    porNombreServices.getContacts().then(function(contacts) {
        $scope.contacts = contacts;
      });
      

    var dt = this;
    porNombreServices.getPartidos().then(function(respuesta) {    	
        dt.partidos = respuesta.data;
      });
    dt.instance={}
    dt.filtraDatos=function(idPartido){   
    	if(idPartido=='todos'){
    		dt.instance.changeData("/SilPortal/REST/Legislador/getLegisladores");
    	}else{
        	dt.instance.changeData('/SilPortal/REST/Legislador/getLegisladores/partido/'+idPartido);    		
    	}
      
    	
    }
    dt.message = '';
   
    dt.persons = {};
      dt.options = DTOptionsBuilder
         .fromSource("/SilPortal/REST/Legislador/getLegisladores"  )
        .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
        .withBootstrap()
        .withLanguage({
          paginate: {
            previous: "&laquo;",
            next: "&raquo;",
          },
          search: "_INPUT_",
          searchPlaceholder: "Buscar Legisladores",
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
                exportOptions: {columns : "2,3,4,5,6,7,8,9" },
            },
            {
                extend:    'excelHtml5',
                 text:      '<i class="glyphicon glyphicon-export fa-2x" aria-hidden="true"></i>',
                titleAttr: 'Excel',
                exportOptions: {columns : "2,3,4,5,6,7,8,9" },
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
        DTColumnBuilder.newColumn("princEleccion").withTitle("Tipo de Elecci&oacute;n"),
        DTColumnBuilder.newColumn("estadoDistrito").withTitle("Entidad").renderWith(concatenaEntidades),
        DTColumnBuilder.newColumn("partido").withTitle("Partido"),
        DTColumnBuilder.newColumn("estatus").withTitle("Estatus"),
        DTColumnBuilder.newColumn("instancia").withTitle("C&aacute;mara"),
        DTColumnBuilder.newColumn("suplente").withTitle("Suplente"),
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
