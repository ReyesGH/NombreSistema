var app = angular.module("silPortal");

app.service("BusquedaAvanzadaServices", ["$q", "$timeout","$http",
  function BusquedaAvanzadaServices($q, $timeout,$http) { 
	 this.getLegisladores = function getLegisladores() {
	    return $http({
		      method: 'GET',
		       url: '/SilPortal/REST/Legislador/getLegisladores'
		    });
		  };
		  this.getPartidos = function getPartidos() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/partidos/getpartidos'
			    });
			  };
		  this.CatGradoEstudios = function CatGradoEstudios() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatGradoEstudios'
			    });
			  };
		  this.CatPreparacionAcademica = function CatPreparacionAcademica() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatPreparacionAcademica'
			    });
			  };
		  this.CatEstado = function CatEstado() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatEstado'
			    });
			  };
//		  this.CatMunicipio = function CatMunicipio() {
//			    return $http({
//			      method: 'GET',
//			       url: '/SilPortal/REST/Catalogos/CatMunicipio'
//			    });
//			  };
		  this.CatLegislatura = function CatLegislatura() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatLegislatura'
			    });
			  };
		  this.CatCircunscripcion = function CatCircunscripcion() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatCircunscripcion'
			    });
			  };
		  this.CatDistrito = function CatDistrito() {
			    return $http({
			      method: 'GET',
			       url: '/SilPortal/REST/Catalogos/CatDistrito'
			    });
			  };
			  this.CatPartido = function CatPartido() {
				    return $http({
				      method: 'GET',
				       url: '/SilPortal/REST/Catalogos/CatPartido'
					    });
					  };
		  this.getLegisladoresAvanzada = function getLegisladoresAvanzada(datos) {
			    return $http({
			      method: 'POST',
			       url: '/SilPortal/REST/Legislador/getLegisladoresAvanzada',
			       headers: {
			    	   'Content-Type': "application/json"
			    	 },
			    	data: datos   
				    });
				  };
		  this.getCiudadByIdEstado = function getCiudadByIdEstado(idEstado) {
			    return $http({
			      method: 'GET',
		   url: '/SilPortal/REST/Catalogos/CatCiudadByIdEstado/'+idEstado
		    });
		  };
		  
		  this.getInstanciasByEstatus = function getInstanciasByEstatus(estatus){
			  return $http({
				  method:'GET',
				  url:'/SilPortal/REST/Catalogos/CatInstanciaByEstatus/'+estatus
			  });
		  }
  }
]);



app.controller("BusquedaAvanzadaCtrl", ["$scope", "$uibModal", "BusquedaAvanzadaServices", "DTOptionsBuilder", "DTColumnBuilder",
    function BusquedaAvanzadaCtrl($scope, mo, BusquedaAvanzadaServices, DTOptionsBuilder, DTColumnBuilder) {

    var dt = this;
    $scope.contacts = [];
    $scope.repoImagenes=window.location.protocol+"//"+window.location.host+"/segob/sil/legisladores/";
    $scope.groupedContacts = [];
    $scope.currentContact;
    $scope.ciudades=[];
    $scope.CatInstancias=[];

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;
    

    BusquedaAvanzadaServices.CatGradoEstudios().then(function(result) {
      $scope.CatGradoEstudios = result.data;
    });

    BusquedaAvanzadaServices.CatPreparacionAcademica().then(function(result) {
        $scope.CatPreparacionAcademica = result.data;
      });
    
    BusquedaAvanzadaServices.CatEstado().then(function(result) {
        $scope.CatEstado = result.data;
      });
    

    
    
    BusquedaAvanzadaServices.CatLegislatura().then(function(result) {
        $scope.CatLegislatura = result.data;
      });

  BusquedaAvanzadaServices.CatCircunscripcion().then(function(result) {
      $scope.CatCircunscripcion = result.data;
    });
    BusquedaAvanzadaServices.CatDistrito().then(function(result) {
        $scope.CatDistrito = result.data;
      });
    
    BusquedaAvanzadaServices.CatPartido().then(function(result) {
        $scope.CatPartido = result.data;
      });
    
    BusquedaAvanzadaServices.getLegisladores().then(function(result) {
        $scope.getLegisladores = result.data;
        dt.llenarTabla($scope.getLegisladores)
      });
    
    BusquedaAvanzadaServices.getInstanciasByEstatus(1).then(function(result) {
        $scope.CatInstancias = result.data;
      });
    
    dt.formulario={
    		experienciaDipLocal:false,
    		experienciaDipFederal:false,
    		experienciaSenador:false
    		
    }
    
    dt.message = '';
 
    dt.llenarTabla=function(data){	    	
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
          searchPlaceholder: "Buscar…",
          sEmptyTable:     "No existen datos",
          sInfo:           "Mostrar _START_ de _END_ de _TOTAL_ registros",
          sInfoEmpty:      "Mostrar 0 a 0 de 0 registros",
          sLengthMenu:     "Mostrar _MENU_ registros",
            
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

      dt.columns = [
          DTColumnBuilder.newColumn("numfila").withTitle("No"),
          DTColumnBuilder.newColumn("photo").withTitle('Foto').notSortable()
          .renderWith(actionsHtml),
          DTColumnBuilder.newColumn("instancia").withTitle("Instancia"),
    	  DTColumnBuilder.newColumn("legislatura").withTitle('Legislatura'),
        DTColumnBuilder.newColumn("nombre").withTitle("Nombre(s)") .renderWith(actionsHtml1),
        DTColumnBuilder.newColumn("generoDesc").withTitle("G&eacute;nero"),
        DTColumnBuilder.newColumn("partido").withTitle("Partido"),
        DTColumnBuilder.newColumn("princEleccion").withTitle("Principio de Elecci&oacute;n"),
        DTColumnBuilder.newColumn("estadoDistrito").withTitle("Entidad").renderWith(concatenaEntidades),
  	  DTColumnBuilder.newColumn("tomaProtesta").withTitle("Protesta"),
        DTColumnBuilder.newColumn("estadoDistrito").withTitle(" Distrito"),
        DTColumnBuilder.newColumn("municipioNacimiento").withTitle(" Municipio/Alcaldía")
      ];

      function concatenaEntidades(info, type, full, meta) {
     	   return (full.estadosCircunscripcion!=null?full.estadosCircunscripcion:'')+(full.estadosCircunscripcion!=null && full.estadoDistrito!=null?',':'' )+(full.estadoDistrito!=null?full.estadoDistrito:'');
        }
      function actionsHtml(info, type, full, meta) {

          return '<img style="max-width:30px;" src="'+$scope.repoImagenes+info+'">' 
              
              
              ;
              
      }

    }
    dt.llenarTabla([]);
   
  
    dt.dtInstance={};
    dt.searchOptions={};
    dt.panelconf={};
		
       
        
        function actionsHtml1(info, type, full, meta) {
    	      return '<a href="#!/legisladorPerfil/' + full.id + '">'+full.nombre+'</a>';
    	    }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
           
            return nRow;
        }

        $scope.filtrar=function(){
        	var data=[];
        	
    		if(!dt.formulario.experienciaDipLocal){
    			dt.formulario.experienciaDipLocal=false;
    		}

    		if(!dt.formulario.experienciaDipFederal){
    			dt.formulario.experienciaDipFederal=false;
    		}

    		if(!dt.formulario.experienciaSenador){
    			dt.formulario.experienciaSenador=false;
    		}
        		if(!dt.formulario.propietarioNombre || dt.formulario.propietarioNombre==""){
        			dt.formulario.propietarioNombre="";
        		}

        		if(!dt.formulario.propietarioApellidop || dt.formulario.propietarioApellidop==""){
        			dt.formulario.propietarioApellidop="";
        		}
        		if(!dt.formulario.propietarioApellidom || dt.formulario.propietarioApellidom==""){
        			dt.formulario.propietarioApellidom="";
        		}
        		if(!dt.formulario.genero || dt.formulario.genero==""){
        			dt.formulario.genero="";
        		}
        		if(!dt.formulario.idGradoEstudios || dt.formulario.idGradoEstudios==""){
        			dt.formulario.idGradoEstudios=0;
        		}
        		if(!dt.formulario.idCatPreparacionAcademica || dt.formulario.idCatPreparacionAcademica==""){
        			dt.formulario.idCatPreparacionAcademica=0;
        		}
        		if(!dt.formulario.idInstacia || dt.formulario.idInstacia==""){
        			dt.formulario.idInstacia=0;
        		}

        		if(!dt.formulario.idEstadoNacimiento || dt.formulario.idEstadoNacimiento==""){
        			dt.formulario.idEstadoNacimiento=0;
        		}

        		if(!dt.formulario.idMunicipioNacimiento || dt.formulario.idMunicipioNacimiento==""){
        			dt.formulario.idMunicipioNacimiento=0;
        		}

        		if(!dt.formulario.idLegislatura || dt.formulario.idLegislatura==""){
        			dt.formulario.idLegislatura=0;
        		}

        		if(!dt.formulario.idInstacia2 || dt.formulario.idInstacia2==""){
        			dt.formulario.idInstacia2=0;
        		}

        		if(!dt.formulario.idCircunscripcion || dt.formulario.idCircunscripcion==""){
        			dt.formulario.idCircunscripcion=0;
        		}

        		if(!dt.formulario.idEstadoDistrito || dt.formulario.idEstadoDistrito==""){
        			dt.formulario.idEstadoDistrito=0;
        		}
        		if(!dt.formulario.idDistrito || dt.formulario.idDistrito==""){
        			dt.formulario.idDistrito=0;
        		}
        		if(!dt.formulario.idPartido || dt.formulario.idPartido==""){
        			dt.formulario.idPartido=0;
        		}
        		if(!dt.formulario.idPrincipio || dt.formulario.idPrincipio==""){
        			dt.formulario.idPrincipio=0;
        		}
            BusquedaAvanzadaServices.getLegisladoresAvanzada(dt.formulario).then(function(response) {
            	dt.llenarTabla(response.data);
              });
        	
        }
        
        $scope.getCiudadByIdEstado=function(){
        	$scope.ciudades=[];
        	BusquedaAvanzadaServices.getCiudadByIdEstado(parseInt(dt.formulario.idEstadoNacimiento)).then(function(response) {
            	$scope.ciudades = response.data;
              });
        }
    
}]);