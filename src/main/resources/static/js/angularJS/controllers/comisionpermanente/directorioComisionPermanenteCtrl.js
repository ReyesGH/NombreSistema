var app = angular.module("silPortal");

app.service("integracionService", ["$q", "$timeout", "$http",
    function integracionService($q, $timeout, $http) {
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

        this.getDatos = getDatos = () => {
            return $http({
                method: 'GET',
                url: '/SilAdmin/RESTAPI/reportes/getDatosLegisladorIntegracion'
            });
        }
        this.search = search = (ViewLegisladorReport) => {
            return $http({
                method: 'POST',
                url: '/SilAdmin/RESTAPI/reportes/searchLegislador',
                data: ViewLegisladorReport
            });
        }
        this.searchO = searchO = (ViewOrganoReport) => {
            return $http({
                method: 'POST',
                url: '/SilAdmin/RESTAPI/reportes/searchOrgano',
                data: ViewOrganoReport
            });
        }
        this.getAllTipoEleccion = function getAllTipoEleccion(idInstancia) {
            return $http({
                method: 'GET',
                url: '/SilAdmin/RESTAPI/reportes/getAllTipoEleccion/' + idInstancia
            });

        }

        // catalogo tipo organo
        this.getIdCatTipoOrgano = function(id) {
            return $http({
                method: 'POST',
                url: '/SilAdmin/RESTAPI/reportes/getIdTipoOrganoGobierno/' + id
            });
        }

        // catalogo anio legislativo
        this.getAllCatAnioLegislativo = function(idLegislatura) {
            return $http({
                method: 'GET',
                url: '/SilAdmin/RESTAPI/reportes/getAllAnioLegislativoId/' + idLegislatura
            });
        }

        this.getAllOprPeriodoSesion = function(id) {
            return $http({
                method: 'POST',
                url: '/SilAdmin/RESTAPI/reportes/getPeriodoSesionId/' + id
            });
        }

        this.getAllOrganoGobierno = function(idlegislatura,idInstancia,idTipoOrgano) {
            return $http({
                method: 'POST',
                url: '/SilAdmin/RESTAPI/reportes/getOrganoGobiernoId/' + idlegislatura + '/' + idInstancia + '/' + idTipoOrgano
            });
        }

        this.getAllPartidos = function getAllPartidos() {
    	    return $http({
    	      method: 'GET',
    	      url: '/SilAdmin/RESTAPI/Comisiones/getAllPartidos'
    	    });
    	}

    }
]);

app.controller("integracionCtrl", ["$scope", "$uibModal", "integracionService", "DTOptionsBuilder", "DTColumnBuilder",
    function integracionCtrl($scope, mo, integracionService, DTOptionsBuilder, DTColumnBuilder) {

		$scope.repoImagenes=window.location.protocol+"//"+window.location.host+"/segob/sil/legisladores/";
        $scope.contacts = [];
        $scope.groupedContacts = [];
        $scope.currentContact;
        // $scope.imgNoDisponible =
		// "https://www.aurusjoyeria.cl/images/contenido-no-disponible.jpg";
        $scope.partidosTotalesIntegracion = [];
        $scope.partidos = [];
        $scope.totalTblNumeraliaPresidente = 0;
        $scope.totalTblNumeraliaSecretario = 0;
        $scope.totalTblNumeraliaTotal = 0;

        this.$onInit = function(){
        	$scope.getAllPartidosIntegracion();
        }

        $scope.getAllPartidosIntegracion = function(){
        	$scope.totalTblNumeraliaPresidente = 0;
            $scope.totalTblNumeraliaSecretario = 0;
            $scope.totalTblNumeraliaTotal = 0;
        	integracionService.getAllPartidos().then(
        		function success(response){
        			$scope.partidos = response.data;
        			$.each($scope.partidos, (k, item) => {
        				$scope.partidosTotalesIntegracion.push({partido:item.nombre, totalPresidente:0, totalSecretario:0, total:0});
    				});
        		},
        		function error(response){

        		}
        	)
        }

        $scope.sidebar = {};
        $scope.sidebar.isActive = true;

        integracionService.getContacts().then(function(contacts) {
            $scope.contacts = contacts;
        });
        $scope.datos = [];
        $scope.datosOrgano = [];
        $scope.json = {};
        $scope.ViewLegisladorReport = {};
        $scope.ViewOrganoReport = {};

        var dt = this;

        dt.message = '';
        dt.someClickHandler = someClickHandler;
        dt.persons = {};
        $scope.datos = [];
        $scope.json = {};
        $scope.ViewLegisladorReport = {};
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
                [0, "desc"]
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
        dt.columnsComision = [
            DTColumnBuilder.newColumn("foto").withTitle("Foto").renderWith(actionsHtml),
            DTColumnBuilder.newColumn("legislador").withTitle("Legislador"),
            DTColumnBuilder.newColumn("puestoComision").withTitle("Rol"),
            DTColumnBuilder.newColumn("cargo").withTitle("Puesto"),
            DTColumnBuilder.newColumn("partido").withTitle("Partido"),
            DTColumnBuilder.newColumn("foto_suplente").withTitle("Foto").renderWith(actionsHtml2),
            DTColumnBuilder.newColumn("suplente").withTitle("Sustituto"),
            DTColumnBuilder.newColumn("puestoOrgano").withTitle("Rol"),
            DTColumnBuilder.newColumn("partido").withTitle("Partido")
        ];

        function someClickHandler(info) {
            // dt.message = info.id + ' - ' + info.firstName;
            // window.location.href = '#!/home/' + info.id + '#';

            // var opcion = confirm("Deseas ver el detalle del Diputado");
            // if (opcion == true) {
            // // DOSG. Remplazar el 1 por el id del Diuputado que queremos
			// consultar
            // // DOSG. Colocar Funcionalidad de un modal para ser mas amigable
			// al usuario.
            // window.location.href = '#!/diputado/1#';
            // } else {

            // }
        }

        function actionsHtml(info, type, full, meta) {
            return '<img src="' + full.foto + '" style="width: 100px !important;height: auto !important;"' +'>';
        }

        function actionsHtml2(info, type, full, meta) {
            return '<img src="' + full.foto_suplente + '" style="width: 100px !important;height: auto !important;"' +'>';
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

        $scope.getDatos = () => {
            integracionService.getDatos()
                .then(function success(response) {
                        console.log(response.data);
                        $scope.json = response.data;
                    },
                    function error(response) {
                        $scope.message = '';
                        if (response.status === 404) {
                            $scope.errorMessage = 'Accion not found!';
                        } else {
                            $scope.errorMessage = "Error getting Accion!";
                        }
                    });
        }

        $scope.init = () => {
            $scope.getDatos();
            console.log($scope.partidosTotalesIntegracion);
        }

        $scope.init();

        $scope.buscar = () => {
        	$scope.totalTblNumeraliaPresidente = 0;
            $scope.totalTblNumeraliaSecretario = 0;
            $scope.totalTblNumeraliaTotal = 0;
        	$.each($scope.partidos, (k, i) => {
				$scope.partidosTotalesIntegracion[k].totalPresidente = 0;
				$scope.partidosTotalesIntegracion[k].totalSecretario = 0;
				$scope.partidosTotalesIntegracion[k].total = 0;
			});
            console.log($scope.ViewLegisladorReport);
            if (!$scope.isEmpty($scope.ViewLegisladorReport))
                $scope.search();
            else
                alert('En necesario ingresar por lo menos uno o dos datos');
        }
        $scope.buscarOrgano = () => {
            console.log($scope.ViewOrganoReport);
            if (!$scope.isEmpty($scope.ViewOrganoReport))
                $scope.searchOrgano();
            else
                alert('En necesario ingresar por lo menos uno o dos datos');
        }
        $scope.borrar = () => {
            $scope.ViewLegisladorReport = {};
            $scope.ViewOrganoReport = {};
            $scope.datos = [];
            $scope.datosOrgano = [];
        }

        $scope.search = () => {
            integracionService.search($scope.ViewLegisladorReport)
                .then(function success(response) {
                	console.log(response.data);
                	console.log($scope.partidos);
                        $scope.datos = response.data;
                        $.each($scope.datos,function(key, item){
                        	var  totalSecretario = 0, totalPresidente = 0, total = 0, descripcion = "";
                        	 $.each($scope.partidos,function(k, i){
                        		 if(i.id == item.idpartido){
         							
         							if(item.idCatPuestoComision == 1){ // presidente
         								totalPresidente++;
         								$scope.totalTblNumeraliaPresidente += totalPresidente;
         						        $scope.totalTblNumeraliaTotal += totalPresidente;
         								$scope.partidosTotalesIntegracion[k].totalPresidente += totalPresidente;
         							}
         							if(item.idCatPuestoComision == 4){ // secretario
         								totalSecretario++;
         						        $scope.totalTblNumeraliaSecretario += totalSecretario;
         						        $scope.totalTblNumeraliaTotal += totalSecretario;
         								$scope.partidosTotalesIntegracion[k].totalSecretario += totalSecretario;
         							}
         							$scope.partidosTotalesIntegracion[k].total = $scope.partidosTotalesIntegracion[k].totalPresidente + $scope.partidosTotalesIntegracion[k].totalSecretario ;
// data[k] = $scope.partidosTotalesIntegracion[k];
// backgroundColor[k] = item.partido_color;
         						}
                             });
                        });
// $.each($scope.datos, (key, item) => {
// var totalSecretario = 0, totalPresidente = 0, total = 0, descripcion = "";
// console.log(item.idCatPuestoComision);
// $.each($scope.partidos, (k, i) => {
// if(i.id == item.idpartido){
// console.log("contador -> "+cont++);
// if(item.idCatPuestoComision == 1){ //presidente
// totalPresidente++;
// console.log(totalPresidente);
// $scope.partidosTotalesIntegracion[k].totalPresidente += totalPresidente;
// }
// if(item.idCatPuestoComision == 4){ //secretario
// console.log(totalPresidente);
// totalSecretario++;
// $scope.partidosTotalesIntegracion[k].totalSecretario += totalSecretario;
// }
// $scope.partidosTotalesIntegracion[k].total =
// $scope.partidosTotalesIntegracion[k].totalPresidente +
// $scope.partidosTotalesIntegracion[k].totalSecretario ;
// // data[k] = $scope.partidosTotalesIntegracion[k];
// backgroundColor[k] = item.partido_color;
// }
// });
// });
                        if ($scope.datos.length == 0)
                            alert("No existen datos!");
                    },
                    function error(response) {
                        $scope.message = '';
                        if (response.status === 404) {
                            $scope.errorMessage = 'Accion not found!';
                        } else {
                            $scope.errorMessage = "Error getting Accion!";
                        }
                    });
        }

        $scope.searchOrgano = () => {
            integracionService.searchO($scope.ViewOrganoReport)
                .then(function success(response) {
                        console.log(response.data);
                        $scope.datosOrgano = response.data;
                        if ($scope.datosOrgano.length == 0)
                            alert("No existen datos!");
                    },
                    function error(response) {
                        $scope.message = '';
                        if (response.status === 404) {
                            $scope.errorMessage = 'Accion not found!';
                        } else {
                            $scope.errorMessage = "Error getting Accion!";
                        }
                    });
        }

        $scope.isEmpty = (object) => {
            for (var item in object)
                return false;
            return true;
        }

        $scope.validarTipoEleccion = function(idPrincipio) {
            // BUSQUEDA POR INSTANCIA
            /*
			 * if($scope.ViewLegisladorReport.idinstancia == 1){
			 * if($scope.ViewLegisladorReport.id_principio == 1){
			 * $scope.bndEntidad = true;
			 * 
			 * }else if($scope.ViewLegisladorReport.id_principio == 3){
			 * $scope.bndEntidad = false; } }else
			 */
            if ($scope.ViewLegisladorReport.idinstancia == 7) {
                if ($scope.ViewLegisladorReport.id_principio == 1 || $scope.ViewLegisladorReport.id_principio == 2) {
                    $scope.bndEntidad = true;

                } else if ($scope.ViewLegisladorReport.id_principio == 3) {
                    $scope.bndEntidad = false;

                }
            }
        }

        $scope.bndEleccion = false;
        $scope.bndEntidad = true;

        $scope.getAllTipoEleccion = function(idInstancia) {
        	$scope.tipoEleccion = null;
            integracionService.getAllTipoEleccion(idInstancia).then(
                function success(response) {
                    console.log(response.data.length);
                    $scope.bndEntidad = true;
                    $scope.bndEleccion = false;
                    if (response.data.length !== 0) {
                        $scope.tipoEleccion = response.data;
                        $scope.bndEleccion = true;
                    }
                    if (idInstancia == 7 && $scope.ViewLegisladorReport.id_principio == 3) {
                        $scope.bndEntidad = false;
                    }
                },
                function error(response) {

                }
            )
        }

        $scope.cattipoinstancia = [];
        $scope.funcTipoSelect = function(id) {
            integracionService.getIdCatTipoOrgano(id).then(
                function success(response) {
                    $scope.cattipoinstancia = response.data;
                },
                function error(response) {}
            )
        }


        $scope.funcAnioSelectIntegracion = function(select) {
            integracionService.getAllCatAnioLegislativo(select).then(
                function success(response) {
                    $scope.cataniolegislativoall = response.data;
                },
                function error(response) {}
            )
        }

        $scope.funcPeriodoSelectId = function(select) {
            integracionService.getAllOprPeriodoSesion(select).then(
                function success(response) {
                    $scope.oprsesionperiodoall = response.data;
                },
                function error(response) {}
            )
        }

        $scope.getByIdOrganoGobierno = function(idlegislatura,idInstancia,idTipoOrgano) {
            integracionService.getAllOrganoGobierno(idlegislatura,idInstancia,idTipoOrgano).then(
                function success(response) {
                	console.log(response.data);
                    $scope.tblOrganoGobiernoAll = response.data;
                },
                function error(response) {}
            )
        }

// $scope.getAllTipoEleccion = function(idInstancia) {
// integracionService.getAllTipoEleccion(idInstancia).then(
// function success(response) {
// console.log(response.data.length);
// $scope.bndEntidad = true;
// $scope.bndEleccion = false;
// if (response.data.length !== 0) {
// $scope.tipoEleccion = null;
// $scope.tipoEleccion = response.data;
//
// $scope.bndEleccion = true;
// }
// if (idInstancia == 7 && $scope.ViewLegisladorReport.id_principio == 3) {
// $scope.bndEntidad = false;
// }
// },
// function error(response) {
//
// }
// )
// }
    }

]);
