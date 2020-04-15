

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
  $urlRouterProvider.otherwise("/home");

  $ocLazyLoadProvider.config({
    debug: false,
    modules: [{
      name: "angular-peity",
      serie: true,
      files: [
        "js/vendor/peity/jquery.peity.min.js",
        "js/vendor/angular-peity/angular-peity.min.js"
      ]
    }, {
      name: "Chart",
      serie: true,
      files: [
        "js/Highcharts/highcharts.js",
        "js/Highcharts/highcharts-3d.js",
       
       
       
      ]
    }, {
      name: "ui.select",
      serie: true,
      files: [
        "css/vendor/angular-ui/angular-ui-select.min.css",
        "js/vendor/angular-ui/angular-ui-select.min.js"
      ]
    }, {
      name: "toast",
      serie: true,
      files: [
        "css/vendor/toast/toast.min.css",
        "js/vendor/toast/toast.min.js"
      ]
    }, {
      name: "ngCropper",
      serie: true,
      files: [
        "css/vendor/ngCropper/ngCropper.min.css",
        "js/vendor/ngCropper/ngCropper.min.js"
      ]
    }, {
      name: "ngSlider",
      serie: true,
      files: [
        "css/vendor/ngSlider/ngSlider.min.css",
        "js/vendor/ngSlider/ngSlider.min.js"
      ]
    }, {
      name: "blueimp.fileupload",
      serie: true,
      files: [
        "js/vendor/jquery-ui/jquery-ui.min.js",
        "js/vendor/load-image/load-image.all.min.js",
        "js/vendor/fileupload/jquery.iframe-transport.js",
        "js/vendor/fileupload/jquery.fileupload.js",
        "js/vendor/fileupload/jquery.fileupload-process.js",
        "js/vendor/fileupload/jquery.fileupload-image.js",
        "js/vendor/fileupload/jquery.fileupload-validate.js",
        "js/vendor/fileupload/jquery.fileupload-angular.js"
      ]
    }, {
      name: "datatables",
      serie: true,
      files: [
        "css/vendor/datatables/datatables.min.css",
        "css/vendor/datatables/datatables-responsive.min.css",
        "css/vendor/datatables/datatables-colreorder.min.css",
        "css/vendor/datatables/buttons.dataTables.min.css",
     // "js/vendor/datatables/dataTables.bootstrap.min.js",
        "js/vendor/datatables/jquery.dataTables.min.js",
        "js/vendor/datatables/dataTables.responsive.min.js",
        "js/vendor/datatables/responsive.bootstrap.min.js",
        "js/vendor/datatables/dataTables.colReorder.min.js",
        //"js/vendor/datatables/dataTables.scroller.min.js",
        "js/vendor/angular-datatables/angular-datatables.min.js",
        "js/vendor/angular-datatables/angular-datatables.bootstrap.min.js",
        "js/vendor/angular-datatables/angular-datatables.colreorder.min.js",
        //"js/vendor/angular-datatables/angular-datatables.scroller.min.js",
        "js/vendor/datatables/dataTables.lightColumnFilter.js",
        "js/vendor/angular-datatables/angular-datatables.light-columnfilter.min.js",
        "js/datatables-buttons/jszip.min.js",
        "js/datatables-buttons/dataTables.buttons.min.js",
        "js/datatables-buttons/buttons.colVis.min.js",
        "js/datatables-buttons/buttons.flash.min.js",
        "js/datatables-buttons/buttons.html5.min.js",
        "js/datatables-buttons/buttons.print.min.js",
        "js/datatables-buttons/angular-datatables.buttons.min.js"
      ]
    }, {
      name: "uiGmapgoogle-maps",
      serie: true,
      files: [
        "js/vendor/angular-google-maps/angular-google-maps.min.js",
        "js/vendor/angular-simple-logger/angular-simple-logger.js"
      ]
    }, {
      name: "textAngular",
      serie: true,
      files: [
        "css/vendor/textAngular/textAngular.min.css",
        "js/vendor/textAngular/textAngular-sanitize.min.js",
        "js/vendor/textAngular/textAngular-rangy.min.js",
        "js/vendor/textAngular/textAngular.js",
        "js/vendor/textAngular/textAngularSetup.js",
      ]
    }, {
      name: "wu.masonry",
      serie: true,
      files: [
        "js/vendor/masonry/masonry.pkgd.min.js",
        "js/vendor/imagesloaded/imagesloaded.pkgd.min.js",
        "js/vendor/angular-masonry/angular-masonry.min.js"
      ]
    
      
        
      
    },{
      name: "angular-flexslider",
      serie: true,
      files: [
        "css/vendor/flexslider/flexslider.min.css",
        "js/vendor/flexslider/flexslider.min.js",
        "js/vendor/angular-flexslider/angular-flexslider.min.js"
      ]
    },{
        name: "translate",
        serie: true,
        files: [
        	
        	 "js/vendor/translate/angular-translate.js",
            
        	 "js/angularJS/controllers/contactoCtrl.js",
        	 "js/angularJS/controllers/translateProviderCtrl.js",
            
          
        ]
      
        
          
        
      },{
     
      
  
    }]
  });

  $stateProvider
    .state("root", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
      resolve: {
          loadtraslate: function($ocLazyLoad) {
            return $ocLazyLoad.load("translate");
          },
         
        }
      
     
    
    })
    
    
    .state("main", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
      resolve: {
          loadtraslate: function($ocLazyLoad) {
            return $ocLazyLoad.load("translate");
          },
         
        }
      
     
       
     
    })

    .state("main.begin", {
      url: "/home",
      controller: "MinutoAMinutoCtrl as dt",
        templateUrl: "views/home.tpl.html",
        resolve: {
            loadtraslate: function($ocLazyLoad) {
              return $ocLazyLoad.load("translate");
            },
            loadDatatables: function($ocLazyLoad) {
                return $ocLazyLoad.load("datatables");
              },
            loadFiles: function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "js/angularJS/controllers/MinutoAMinutoCtrl.js"
                ])
                }
           
          }
        
       
    
      
    })
    
     /////////////////////////////////////////////////////////////////////
    //Bloque de Codigo para Integracion Congreso

    .state("main.integracionCongreso", {
      url: "/integracionCongreso",
      controller: "IntegracionCongresoCtrl as dt",
      templateUrl: "views/Integracion/congresoUnion.tpl.html",
      resolve: {
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/integracionCongresoCtrl.js"
          ]);
        }
      }
    })
    /////////////////////////////////////////////////////////////////////
        .state("main.legisladorPerfil", {
      url: "/legisladorPerfil/:contactId",
      controller: "legisladorPerfilCtrl",
      templateUrl: "views/legisladores/perfil/legisladorPerfil.tpl.html",
      resolve: {
          loadDatatables: function($ocLazyLoad) {
              return $ocLazyLoad.load("datatables");
            },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/perfil/legisladorPerfilCtrl.js"
          ]);
        }
      }
    })
            .state("main.suplentePerfil", {
      url: "/suplentePerfil/:idConfLeg",
      controller: "suplentePerfilCtrl",
      templateUrl: "views/legisladores/perfil/suplentePerfil.tpl.html",
      resolve: {
          loadDatatables: function($ocLazyLoad) {
              return $ocLazyLoad.load("datatables");
            },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/perfil/suplentePerfilCtrl.js"
          ]);
        }
      }
    })

    /////////////////////////////////////////////////////////////////////
    //DOSG Codigo del Bloque de Diputados

   
    
    
    .state("main.diputados", {
      url: "/diputados",
      controller: "DiputadosCtrl as dt",
      templateUrl: "views/diputados/diputados.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/diputados/diputadosCtrl.js"
          ]);
        }
      }
    })

   
     .state("main.diputadosCurules2", {
      url: "/diputadosCurules",
      controller: "DiputadosCurulesCtrl2 as dt",
      templateUrl: "views/diputados/diputadosCurules2.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/diputados/diputadosCurulesCtrl2.js"
          ]);
        }
      }
    })


   


    /////////////////////////////////////////////////////////////////////
    //DOSG Codigo del Bloque de Senadores

   

   

    .state("main.senadores", {
      url: "/senadores",
      controller: "Senadores1Ctrl as dt",
      templateUrl: "views/senadores/senadores.tpl.html",
      resolve: {
        datatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/senadores/senadores1Ctrl.js"
          ]);
        }
      }
    })


    .state("main.senadoresCurules", {
      url: "/senadoresCurules",
      controller: "SenadoresCurulesCtrl as dt",
      templateUrl: "views/senadores/senadoresCurules.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/senadores/senadoresCurulesCtrl.js"
          ]);
        }
      }
    })


   

    /////////////////////////////////////////////////////////////////////
    //Bloque de Codigo para Comision Permanente
   

   

    .state("main.comisiones ", {
      url: "/comisiones",
      controller: "ComisionesPermanentesCtrl as dt",
      templateUrl: "views/comisionpermanente/comisionesPermanentes.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisionpermanente/comisionesPermanentesCtrl.js"
          ]);
        }
      }
    })

    .state("main.comisionesCurules", {
      url: "/comisionesCurules",
      controller: "ComisionesCurulesCtrl as dt",
      templateUrl: "views/comisionpermanente/comisionesCurules.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisionpermanente/comisionesCurulesCtrl.js"
          ]);
        }
      }
    })
    
    .state("main.integracionComisionPermanente", {
		url: "/integracionComisionPermanente",
		controller: "integracionCtrl as dt",
		templateUrl: "views/comisionpermanente/directorioComisionPermanente.tpl.html",
		resolve: {
			loadDatatables: function($ocLazyLoad) {
				return $ocLazyLoad.load("datatables");
			},
			loadFiles: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					"js/angularJS/controllers/comisionpermanente/directorioComisionPermanenteCtrl.js"
					]);
			}
		}
	})

   
    

    /////////////////////////////////////////////////////////////////////
    //Bloque de Codigo para Partidos  y Numeralia
    .state("main.dipSenXpartidos", {
      url: "/legisladores/partido/:idInstancia/:idPartido",
      controller: "dipSenXpartidosCtrl as dt",
      templateUrl: "views/partidos/dipSenXpartidos.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/partidos/dipSenXpartidos.js"
          ]);
        }
      }
    })
    .state("main.numeraliaPartidos", {
        url: "/numeraliaPartidos/:idInstancia",
        controller: "numeraliaCtrl as dt",
        templateUrl: "views/partidos/numeralia.tpl.html",
        resolve: {
            loadChart: function($ocLazyLoad) {
                return $ocLazyLoad.load("Chart");
              },
          loadDatatables: function($ocLazyLoad) {
            return $ocLazyLoad.load("datatables");
          },
          loadFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load([
              "js/angularJS/controllers/partidos/numeraliaCtrl.js"
            ]);
          }
        }
      })
   
    
 

   


    /////////////////////////////////////////////////////////////////////
    //Bloque de Codigo para Menu Legisladores

    .state("main.Camaras", {
      url: "/Camaras",
      controller: "CamarasCtrl as dt",
      templateUrl: "views/legisladores/porCamara.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/camarasCtrl.js"
          ]);
        }
      }
    })


    .state("main.PartidosLegisladores", {
      url: "/PartidosLegisladores",
      controller: "PartidosLegisladoresCtrl as dt",
      templateUrl: "views/legisladores/porPartido.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/partidosLegisladoresCtrl.js"
          ]);
        }
      }
    })
    .state("main.busquedaPorNombres", {
      url: "/porNombres",
      controller: "porNombreCtrl as dt",
      templateUrl: "views/legisladores/porNombre.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/porNombreCtrl.js"
          ]);
        }
      }
    })

    .state("main.legisladorBusqueda", {
      url: "/legisladores/:contactId",
      controller: "legisladoresBusquedaCtrl as dt",
      templateUrl: "views/legisladores/legisladores.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/legisladoresBusquedaCtrl.js"
          ]);
        }
      }
    })


    .state("main.Genero", {
      url: "/Genero",
      controller: "GeneroCtrl as dt",
      templateUrl: "views/legisladores/porGenero.tpl.html",
      resolve: {
        loadChart: function($ocLazyLoad) {
          return $ocLazyLoad.load("Chart");
        },
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
              "js/angularJS/controllers/legisladores/generoCtrl.js",
              "js/angularJS/controllers/legisladores/numeraliaGeneroCtrl.js"
          ]);
        }
      }
    })
    
    

    .state("main.legisladorCurules", {
      url: "/legisladorCurules",
      controller: "legisladorCurulesCtrl as dt",
      templateUrl: "views/legisladores/legisladorCurules.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/legisladorCurulesCtrl.js",
            "js/angularJS/controllers/diputados/diputadosCurulesCtrl2.js",
              "js/angularJS/controllers/senadores/senadoresCurulesCtrl.js"
              
          ]);
        }
      }
    })

  

    .state("main.Estado", {
      url: "/Estado/:entidad",
      controller: "estadoCtrl as dt",
      templateUrl: "views/legisladores/estado.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/estadoCtrl.js"
          ]);
        }
      }
    })

    .state("main.porEntidad", {
      url: "/porEntidad",
      controller: "porEntidadCtrl as dt",
      templateUrl: "views/legisladores/porEntidad.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },

        loadPlugins: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            
             "js/vendor/jqvmap/jquery.vmap.min.js",
             "js/vendor/jqvmap/maps/jquery.vmap.mexico.js",
               "css/vendor/jqvmap/jqvmap.min.css"
           
          ]);
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/porEntidadCtrl.js"
          ]);
        }
      }
    })
    
    
      .state("main.busquedaAvanzada", {
      url: "/busquedaAvanzada",
      controller: "BusquedaAvanzadaCtrl as dt",
      templateUrl: "views/legisladores/busquedaAvanzada.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/legisladores/busquedaAvanzadaCtrl.js"
          ]);
        }
      }
    })
    
    .state("main.directorioLegisladores", {
		url: "/directorioLegisladores",
		controller: "directoriolegisladoresCtrl as dt",
		templateUrl: "views/legisladores/directorioLegislador.tpl.html",
		resolve: {
			loadDatatables: function($ocLazyLoad) {
				return $ocLazyLoad.load("datatables");
			},
			loadFiles: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					"js/angularJS/controllers/legisladores/directorioLegisladorCtrl.js"
					]);
			}
		}
	})   	

    
   


   
 
    /////////////////////////////////////////////////////////////////////
    
    //Menu Comisiones BJSG

    .state("main.comisionGeneral", {
      url: "/Comision/:comision",
      controller: "comisionCtrl as dt",
      templateUrl: "views/comision/tipo/comision.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/tipo/comisionCtrl.js"
          ]);
        }
      }
    })

    .state("main.ComisionTipo", {
      url: "/Comision/:comision/:tipo",
      controller: "ComisionTipoCtrl as dt",
      templateUrl: "views/comision/tipo/comisionTipo.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/tipo/comisionTipoCtrl.js"
          ]);
        }
      }
    })

 
   

    .state("main.integracion", {
      url: "/integracion/:idTblComision",
      controller: "IntegracionCtrl as dt",
      templateUrl: "views/comision/tipo/integracionComision.tpl.html",
      resolve: {
        loadChart: function($ocLazyLoad) {
          return $ocLazyLoad.load("Chart");
        },
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/integracionCtrl.js"
           
          ]);
        }
      }
    })

   
  

    .state("main.Iniciativa", {
      url: "/comisioniniciativas/:comision",
      controller: "ComisionIniciativasCtrl as dt",
      templateUrl: "views/comision/tipo/iniciativas.tpl.html",
      resolve: {
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/iniciativasCtrl.js"
          ]);
        }
      }
    })


  
    
     .state("main.deTrabajo", {
      url: "/deTrabajo",
      controller: "DeTrabajoCtrl as dt",
      templateUrl: "views/comisionTrabajo/deTrabajo.tpl.html",
      resolve: {
        loadPlugins: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisionTrabajo/deTrabajoCtrl.js"
          ]);
        }
      }
    })
    
    
     .state("main.Minutas", {
      url: "/Minutas/:comision",
      controller: "MinutasCtrl as dt",
      templateUrl: "views/comision/tipo/minutas.tpl.html",
      resolve: {
        loadPlugins: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/minutas/minutasCtrl.js"
          ]);
        }
      }
    })
    
     .state("main.Proposiciones", {
      url: "/Proposiciones/:comision",
      controller: "ProposicionesCtrl as dt",
      templateUrl: "views/comision/tipo/proposiciones.tpl.html",
      resolve: {
        loadPlugins: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/proposiciones/proposicionesCtrl.js"
          ]);
        }
      }
    })
    
   
    /////////////////////////////////////////////////////////////////////
    //Bloque de Codigo para Busqueda Comisiones BJSG
      
      .state("main.busquedaComisiones", {
      url: "/busquedaComisiones",
      controller: "BusquedaComisionesCtrl as dt",
      templateUrl: "views/comision/tipo/busquedaComisiones.tpl.html",
      resolve: {
        loadPlugins: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/busquedaComisiones/busquedaComisionesCtrl.js"
          ]);
        }
      }
    })
    
    

    /////////////////////////////////////////////////////////////////////
    //Bloque de Codigo para Organos de Gobierno BJSG
    //Perfil Curricular

    .state("main.organos", {
      url: "/organo/:tipoOrgano",
      controller: "OrganoGenericCtrl as dt",
      templateUrl: "views/organosGobierno/organo.tpl.html",
      resolve: {
         loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
          loadChart: function($ocLazyLoad) {
          return $ocLazyLoad.load("Chart");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/organosGobierno/organo.js"
          ]);
        }
      }
    })
   
  

 

  .state("main.comisiondipSenXpartidos", {
      url: "/comisionNumeraliaPartido/:idTblComision/:idPartido",
      controller: "dipSenXpartidosComCtrl as dt",
      templateUrl: "views/comision/dipSenXpartidos.tpl.html",
      resolve: {
        loadChart: function($ocLazyLoad) {
          return $ocLazyLoad.load("Chart");
        },
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/comisiones/dipSenXpartidos.js"
          ]);
        }
      }
    })
      .state("main.OrganoIntegranteXpartidos", {
      url: "/organoPartido/:idInstancia/:idTorgano/:idPartido",
      controller: "OrganoIntegranteXpartidosCtrl as dt",
      templateUrl: "views/organosGobierno/dipSenXpartidos.tpl.html",
      resolve: {
        loadChart: function($ocLazyLoad) {
          return $ocLazyLoad.load("Chart");
        },
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/organosGobierno/OrganoIntegranteXpartidos.js"
          ]);
        }
      }
    })
 .state("main.dipSenXpartidosGeneroCtrl", {
      url: "/dipSenXpartidosGenero/:idInstancia/:idPartido/:genero",
      controller: "dipSenXpartidosGeneroCtrl as dt",
      templateUrl: "views/partidos/dipSenXpartidosGenero.tpl.html",
      resolve: {
        loadChart: function($ocLazyLoad) {
          return $ocLazyLoad.load("Chart");
        },
        loadDatatables: function($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        },
        loadFiles: function($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/angularJS/controllers/partidos/dipSenXpartidosGenero.js"
          ]);
        }
      }
      })

    .state("main.contacto", {
      url: "/contacto",
      //controller: "contactoCtrl as dt",
      templateUrl: "views/utils/contacto.tpl.html",
       resolve: {
       
      }
     
    })


   
}

angular
  .module("silPortal")
  .config(config)
  .run(["$rootScope", "$state", "$stateParams",
    function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]);
