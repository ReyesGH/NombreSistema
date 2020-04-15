var app = angular.module("silPortal");

app.service("OrganoGenericService", ["$q", "$timeout","$http",
  function OrganoGenericService($q, $timeout,$http) {
	 this.getOrganosIntegrantes = function getOrganosIntegrantes(idCatInstancia,tipoOrgano) {
		    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/OrganosConsulta/getOrganosIntegrantes/'+idCatInstancia+'/'+tipoOrgano
			    });
	  };    
	 this.getNumeralia = function getNumeralia(idCatInstancia,tipoOrgano) {
		    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/OrganosConsulta/getNumeralia/'+idCatInstancia+'/'+tipoOrgano
			    });
			  };   
	 this.CatTipoOrgano = function CatTipoOrgano(tipoOrgano) {
		    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatTipoOrgano/'+tipoOrgano
			    });
			  };    
  }]);

app.controller("OrganoGenericCtrl", ["$scope","$rootScope", "$uibModal", "OrganoGenericService", "DTOptionsBuilder", "DTColumnBuilder","$stateParams",
  function OrganoGenericCtrl($scope,$rootScope, mo, OrganoGenericService, DTOptionsBuilder, DTColumnBuilder,$stateParams) {

    $scope.tipoOrgano =$stateParams.tipoOrgano;
    $scope.sidebar = {};
    $scope.sidebar.isActive = true;
    var dt = this;
    $scope.message = '';
   
    $scope.persons = {};
    $scope.columns = [
        DTColumnBuilder.newColumn("numfila").withTitle("No"),
      DTColumnBuilder.newColumn("photo").withTitle('Foto')
      .notSortable() .renderWith(actionsHtml),
      DTColumnBuilder.newColumn("nombre").withTitle("Nombre").renderWith(actionsHtml1),
      DTColumnBuilder.newColumn("descripcionPuestoOrgano").withTitle("Cargo"),
      DTColumnBuilder.newColumn("nombrePartido").withTitle("Partido"),
      DTColumnBuilder.newColumn("fechaInicio").withTitle("Inicio de Funciones"),
      DTColumnBuilder.newColumn("fechaFin").withTitle("Fin de Funciones"),
      DTColumnBuilder.newColumn("zona").withTitle("Entidad")
    ];

    $scope.llenarTablaDiputados=function(data){	
	    $scope.options = DTOptionsBuilder.newOptions()
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
	        searchPlaceholder: "Buscar..",
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
    }

    $scope.llenarTablaSenadores=function(data){	
	    $scope.options1 = DTOptionsBuilder.newOptions()
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
	        searchPlaceholder: "Buscar..",
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
    }



    $scope.llenarTablaComision=function(data){	
	    $scope.options2 = DTOptionsBuilder.newOptions()
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
	        searchPlaceholder: "Buscar..",
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
    }
    
    OrganoGenericService.CatTipoOrgano($scope.tipoOrgano).then(function(result) {
        $scope.CatTipoOrgano = result.data;
      });

    if($scope.tipoOrgano=="5"){
 	   OrganoGenericService.getOrganosIntegrantes("1",$scope.tipoOrgano).then(function(result) {
 		   $scope.IntegrantesDiputados=result.data;
 		  $scope.llenarTablaDiputados($scope.IntegrantesDiputados);
	      });
	   OrganoGenericService.getNumeralia("1",$scope.tipoOrgano).then(function(result) {
		   $scope.NumeraliaDiputados=result.data;
		   creaGrafico(1,result.data);
	      });

 	   OrganoGenericService.getOrganosIntegrantes("2",$scope.tipoOrgano).then(function(result) {
 		   $scope.IntegrantesSenadores=result.data;
 		  $scope.llenarTablaSenadores($scope.IntegrantesSenadores);
	      });
	   OrganoGenericService.getNumeralia("2",$scope.tipoOrgano).then(function(result) {
		   $scope.NumeraliaSenadores=result.data;
		   creaGrafico(2,result.data);
	      });

 	   OrganoGenericService.getOrganosIntegrantes("5","6").then(function(result) {
 		   $scope.IntegrantesComisionP=result.data;
 		  $scope.llenarTablaComision($scope.IntegrantesComisionP);
	      });
	   OrganoGenericService.getNumeralia("5","6").then(function(result) {
		   $scope.NumeraliaComisionP=result.data;
		   creaGrafico(3,result.data);
	      });
    }else if($scope.tipoOrgano=="1" || $scope.tipoOrgano=="7"){
 	   OrganoGenericService.getOrganosIntegrantes("1",$scope.tipoOrgano).then(function(result) {
 		   $scope.IntegrantesDiputados=result.data;
 		  $scope.llenarTablaDiputados($scope.IntegrantesDiputados);
	      });
	   OrganoGenericService.getNumeralia("1",$scope.tipoOrgano).then(function(result) {
		   $scope.NumeraliaDiputados=result.data;
		   creaGrafico(1,result.data);
	      });

 	   OrganoGenericService.getOrganosIntegrantes("2",$scope.tipoOrgano).then(function(result) {
 		   $scope.IntegrantesSenadores=result.data;
 		  $scope.llenarTablaSenadores($scope.IntegrantesSenadores);
	      });
	   OrganoGenericService.getNumeralia("2",$scope.tipoOrgano).then(function(result) {
		   $scope.NumeraliaSenadores=result.data;
		   creaGrafico(2,result.data);
	       
	      });
    }else if($scope.tipoOrgano=="3"){
 	   OrganoGenericService.getOrganosIntegrantes("1",$scope.tipoOrgano).then(function(result) {
 		   $scope.IntegrantesDiputados=result.data;
 		  $scope.llenarTablaDiputados($scope.IntegrantesDiputados);
	      });
	   OrganoGenericService.getNumeralia("1",$scope.tipoOrgano).then(function(result) {
		   $scope.NumeraliaDiputados=result.data;
		   creaGrafico(1,result.data);
	      });
    }
    $scope.totales={diputados:0,senadores:0,comisiop:0};
    function creaGrafico(idCatInstancia,data){
    	 var dataNumeralia = data;
         var total_total=0;
         var dataf=[];
         var partidoColores=[];
       
         for(var i = 0; i < dataNumeralia.length; i++) {
         	dataNumeralia[i].numero=i+1;  
         	partidoColores.push(dataNumeralia[i].partidoColor);
         	total_total=total_total+dataNumeralia[i].total; 
         }
         var tot_porc=0.0;
       
         for(var i = 0; i < dataNumeralia.length; i++) {
         	dataNumeralia[i].porcentaje=parseFloat((dataNumeralia[i].total*100)/total_total);         	
         	tot_porc=tot_porc+parseFloat(parseFloat(dataNumeralia[i].porcentaje).toFixed(2));
         	dataf.push({
         			"name":dataNumeralia[i].nombre,
         			y:parseFloat(parseFloat(dataNumeralia[i].porcentaje).toFixed(2))
         	});
         }
         var titulo="";
         if(idCatInstancia==1){
        	 titulo="Camara de Diputados";
        	 $scope.totales.diputados=total_total;
         }else if(idCatInstancia==2){
        	 titulo="Camara de Senadores"; 
        	 $scope.totales.senadores=total_total;
         }else{
        	 titulo="Comisión Permanente"   
            	 $scope.totales.comisiop=total_total;  	 
         }
         idCatInstancia=idCatInstancia+5;
        Highcharts.chart('container'+idCatInstancia, {
            chart: {
                type: 'pie',
                backgroundColor: '#ffffff',
                width: 550,
                height: 400,
                options3d: {
                    enabled: true,
                    alpha: 30
                }
            },
            colors: partidoColores,

            title: {
                text: 'Porcentaje Numeralia '+titulo
            },
            subtitle: {
                text: 'LXIV Legislatura'
            },
            plotOptions: {
                pie: {
                    innerSize: 130,
                    depth: 90
                }
            },
            series: [{
                name: 'Porcentaje',
                data: dataf,
            }]
        });
    }
    
  
    
  function actionsHtml1(info, type, full, meta) {
	  return '<a href="#!/legisladorPerfil/' + info.idOprConfLegislatura + '#'  + full.id + ' ">'+ full.nombre+'</a>';
    
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

    var self = this;
    self.buttonClicked = function(index) {
      self.show_tabs = true;
      self.active = index;
    };

    self.closeTab = function() {
      self.show_tabs = false;
    }
     
    function actionsHtml(info, type, full, meta) {
        return '<img style="max-width:30px;" src="'+$rootScope.rootRepoImagenes+info+'">';
    }
  
  }

]);
