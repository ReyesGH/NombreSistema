var app = angular.module("silPortal");

app.service("ComisionService", ["$q", "$timeout", "$http",
  function ComisionService($q, $timeout, $http) {
    this.getContacts = function getContacts(id) {
      var defer = $q.defer();

      // Datos simulados de obtension de Diputado, esto se remplazara por la invocacion de los servicios de consulta.
      $timeout(function() {
        defer.resolve(
          [
            {
              "id": 1,
              "photo": "demos/fotos/dip-aleida.jpg",
              "grupoParlamentario": "images/partidosPol/morena3.png",
              "nombre": "Aleida Alavez Ruiz",
              "integracionCongreso": "Diputada Federal",
              "paterno": "Alavez",
              "materno": "Ruiz",
              "estatus": "Activo",
              "periodoLeg": "Del 29/08/2018 al 31/08/2021",
              "partido": "Morena",
              "fecNacimiento": "10/01/1974",
              "princEleccion": "Mayoría Relativa",
              "zona": "CDMX Iztapalapa",
              "tomaProtesta": "29/08/2018",
              "ubicacionCamara": "Edificio B, Planta Baja.",
              "email": "aruiz@diputados.gob.mx",
              "telefono": "50-36-00-00 Ext: 61795.",
              "suplente": "Franco Rodríguez, María Concepción ",
              "gradoEstudios": "Licenciatura",
              "prepAcademica": "Derecho",
              "experienciaLegislativa": "NA"
            }
          ]
        );
      }, 500);
      var jsonData = [];
      $http({
          method: 'GET',
          url: '/catalog/legisladores-'+ id
        }).then(function successCallback(response) {
            console.log(response.data);
            jsonData = response.data;
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
        	  console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      

      return jsonData;
    };
  }
]);

app.controller("ComisionCtrl", ["$scope", "$stateParams", "$uibModal", "ComisionService", "$http",
  function ComisionCtrl($scope, $stateParams, mo, ComisionService,$http) {
   

    $scope.contactId = $stateParams.contactId;

    $scope.contacts = [];
    
   
    var jsonData = [];
    $http({
        method: 'GET',
      
        //url: '/REST/Legislador/getLegislador/' + $scope.contactId 
       url: '/SilPortal/REST/Legislador/getLegislador/' + $scope.contactId
        
        
      }).then(function successCallback(response) {
          console.log(response.data);
          $scope.contacts.push(response.data);
          
        }, function errorCallback(response) {
      	  console.log(response);
          
        });
    
    return jsonData;
    
    
  }
]);