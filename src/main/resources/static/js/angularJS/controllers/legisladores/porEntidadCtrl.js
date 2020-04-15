var app = angular.module("silPortal");

app.controller("porEntidadCtrl", ["$scope","$rootScope", "$uibModal", "$http", "$location", "DTOptionsBuilder", "DTColumnBuilder",
    function porEntidadCtrl($scope,$rootScope, mo, $http, $location, DTOptionsBuilder, DTColumnBuilder) {

        $(function() {
            $('#diputados-map').vectorMap({

                map: 'mx_en',
                enableZoom: true,
                showTooltip: true,
                backgroundColor: '',
                borderColor: ' #ffffff',
                borderOpacity: 0.40,
                borderWidth: 3,
                color: '#a39e9e',
                hoverColor: '#B38E5D',
                hoverOpacity: null,
                colors: {
                    1: '#c9d1ce',
                    2: '#c9d1ce',
                    3: '#c9d1ce',
                    4: '#c9d1ce',
                    5: '#c9d1ce',
                    6: '#a0a3a2',
                    7: '#a0a3a2',
                    8: '#c9d1ce',
                    9: '#a0a3a2',
                    10: '#444746',
                    11: '#c9d1ce',
                    12: '#5c6361',
                    13: '#5c6361',
                    14: '#b0b5b3',
                    15: '#a0a3a2',
                    16: '#c9d1ce',
                    17: '#b0b5b3',
                    18: '#5c6361',
                    19: '#b0b5b3',
                    20: '#b0b5b3',
                    21: '#b0b5b3',
                    22: '#b0b5b3',
                    23: '#b0b5b3',
                    24: '#c9d1ce',
                    25: '#5c6361',
                    26: '#a0a3a2',
                    27: '#c9d1ce',
                    28: '#a0a3a2',
                    29: '#5c6361',
                    30: '#a0a3a2',
                    31: '#c9d1ce',
                    32: '#5c6361'
                },
                normalizeFunction: 'linear',
                scaleColors: ['#b6d6ff', '#005ace'],
                selectedColor: ' #B38E5D',
                regionsSelectable: true,
                regionStyle: {
                    initial: {
                        fill: '#eee',
                        "fill-opacity": 1,
                        stroke: 'black',
                        "stroke-width": 0.5,
                        "stroke-opacity": 1
                    },
                    hover: {
                        fill: '#000000',
                        "fill-opacity": 0.5,
                        cursor: ''
                    },
                    selected: {
                        fill: '#aaa'
                    },
                    selectedHover: {}
                },
                regionLabelStyle: {
                    initial: {
                        'font-family': 'Verdana',
                        'font-size': '12',
                        'font-weight': 'bold',
                        cursor: 'default',
                        fill: 'black'
                    },
                    hover: {
                        cursor: 'pointer'
                    }
                },

                onRegionClick: function(element, code, region) {


                    $scope.estado = angular.lowercase(region);
                    $(".jqvmap-label").css("display", "none");
                    $scope.url = "https://vfs.cloud9.us-east-1.amazonaws.com/vfs/51bcdeb762904f8cb92f62c2d17a39b5/preview/silv1-segob/src/main/webapp/js/angularJS/json/entidades/" + $scope.estado + ".json";
                    console.log("$scope.url: " + $scope.url)
                    $scope.obtenerEstado($scope.estado, $scope.url);
                    $location.url('/Estado/' + code);

                }

            });

           });

      
        $scope.contacts = [];
        $scope.groupedContacts = [];
        $scope.currentContact;

        $scope.sidebar = {};
        $scope.sidebar.isActive = true;


        var dt = this;


        dt.message = '';
        dt.someClickHandler = someClickHandler;
        dt.persons = {};
        dt.options = DTOptionsBuilder
            .fromSource("/SilPortal/REST/Catalogos/CatEstadoFoto")
            .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
                <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
            .withBootstrap()
            .withLanguage({
                paginate: {
                    previous: "&laquo;",
                    next: "&raquo;",
                },
                search: "_INPUT_",
                searchPlaceholder: "Buscar Entidad",
                sEmptyTable: "No existen datos",
                sInfo: "Mostrar _START_ de _END_ de _TOTAL_ registros",
                sInfoEmpty: "Mostrar 0 a 0 de 0 registros",
                sLengthMenu: "Mostrar _MENU_ registros",

            })
            .withOption("order", [
                [0, "asc"]
            ])


            .withOption('rowCallback', rowCallback)
            .withOption("responsive", true);

        dt.columns = [
            DTColumnBuilder.newColumn("id").withTitle("No"),
            DTColumnBuilder.newColumn("photo").withTitle('Imagen').renderWith(actionsHtml), 
            DTColumnBuilder.newColumn("descripcion").withTitle("Nombre")

        ];

       
        
        function actionsHtml(info, type, full, meta) {
            console.log("jdsbfdsbfjdsbvvsd>>>>>>>"+ info.photo + ' - ' + info.firstName);

             return '<img height="35" width="35"src="'+info+'">'
           


             ;
        }




        function someClickHandler(info) {
            dt.message = info.id + ' - ' + info.firstName;
            window.location.href = '#!/Estado/'+ info.id ;
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

        $scope.obtenerEstado = function(estado, url) {

            $http.get(url)
                .then(function(response) {
                    $scope.jsondata = response.data;
                    console.log("status:" + response.status);
                }).catch(function(response) {
                    console.error('Error occurred:', response.status, response.data);
                }).finally(function() {
                    console.log("Task Finished." + $scope.jsondata);
                });
        }

    }
]);
