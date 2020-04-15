var app = angular.module("silPortal");

app.service("SenadoresService", ["$q", "$timeout","$http",
  function SenadoresService($q, $timeout,$http) {

	  this.getPartidos = function getPartidos() {
		    return $http({
		      method: 'GET',
		     // url: '/SilPortal/REST/partidos/getpartidos/2'
		       url: '/SilPortal/REST/partidos/getpartidos/2'
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

app.controller("Senadores1Ctrl", ["$scope","$rootScope", "$uibModal", "SenadoresService", "DTOptionsBuilder", "DTColumnBuilder" ,
  function Senadores1Ctrl($scope,$rootScope, mo, SenadoresService,DTOptionsBuilder, DTColumnBuilder) {
      
    $scope.contacts = [];
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;
    this.$onInit = function () {
    	SenadoresService.getPartidos()
        .then(function success(response) {
            $scope.partidosLista = response.data;
            $scope.total_total=0;
            for(var i = 0; i < $scope.partidosLista.length; i++) {
            	$scope.total_total=$scope.total_total+$scope.partidosLista[i].total;                	
            }

            for(var i = 0; i < $scope.partidosLista.length; i++) {
            	$scope.partidosLista[i].porcentaje=parseFloat(($scope.partidosLista[i].total*100)/$scope.total_total).toFixed(2);                	
            }
            console.log($scope.total_total);
          },
          function error(response) {
            console.log("Error al consultar catalogo de acciones acciones");
          });   
    	
    }
    this.porcentajefuncion=function (total,total_total){      

        console.log(total+"   "+total_total);
    	return 	parseFloat(item.total/total_total).toFixed(2);
    }
    
    var dt = this;
    
    dt.message = '';
    //dt.someClickHandler = someClickHandler;
     dt.persons = {};
      dt.options = DTOptionsBuilder
       // .fromSource("/SilPortal/REST/Legislador/getLegisladores/2")
         .fromSource("/SilPortal/REST/Legislador/getLegisladores/2")
        .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
        <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
        .withBootstrap()
        .withLanguage({
          paginate: {
            previous: "&laquo;",
            next: "&raquo;",
          },
          search: "_INPUT_",
          searchPlaceholder: "Buscar Senadores",
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
                exportOptions: {columns : "2,3,4,5,6,7,8" },
            },
            {
                extend:    'excelHtml5',
                 text:      '<i class="glyphicon glyphicon-export fa-2x" aria-hidden="true"></i>',
                titleAttr: 'Excel',
                exportOptions: {columns : "2,3,4,5,6,7,8" },
            },
             {
                extend:    'colvis',
                
                 text:      '<i class="glyphicon glyphicon-minus fa-2x" aria-hidden="true"></i>',
                titleAttr: 'Ocultar columnas'
            }
            
        ])
        .withOption('rowCallback', rowCallback)
        .withOption("responsive", true)
        .withDisplayLength(999)
        .withOption('aLengthMenu',[10, 25, 50, 100,999]);

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
//        DTColumnBuilder.newColumn("nombre").withTitle("Nombre(s)").renderWith(actionsHtml1),
//        DTColumnBuilder.newColumn("estadoDistrito").withTitle("Entidad").renderWith(concatenaEntidades),
//        DTColumnBuilder.newColumn("tipo").withTitle("Tipo"),
      ];

      function concatenaEntidades(info, type, full, meta) {
   	   return (full.estadosCircunscripcion!=null?full.estadosCircunscripcion:'')+(full.estadosCircunscripcion!=null && full.estadoDistrito!=null?',':'' )+(full.estadoDistrito!=null?full.estadoDistrito:'');
      }

      function actionsHtml(info, type, full, meta) {
          return '<img style="max-width:30px;" src="'+$rootScope.rootRepoImagenes+info+'">';              
      }
        
     //function someClickHandler(info) {
       //   dt.message = info.id + ' - ' + info.firstName;
         // window.location.href = '#!/legisladorPerfil/' + info.id + '#';
      //}
      
     function actionsHtml1(info, type, full, meta) {
  	      return '<a href="#!/legisladorPerfil/' + full.id + '">'+full.nombre+'</a>';
  	    }
      
       //function actionsHtml(info, type, full, meta) {
         // dt.persons[info.id] = info;
          //return '<img src="images/diputados/AnaLaura.jpg" alt=" " ng-click="showCase.edit(showCase.persons[' + info.id + '])">' ;
      //}
     
      function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
          //$('td', nRow).unbind('click');
          //$('td', nRow).bind('click', function() {
            //  $scope.$apply(function() {
              //    dt.someClickHandler(aData);
              //});
          //});
          return nRow;
      }
      
    }
  ]);
