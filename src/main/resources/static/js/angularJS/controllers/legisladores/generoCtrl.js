var app = angular.module("silPortal");

app.service("GeneroService", ["$q", "$timeout",
  function GeneroService($q, $timeout) {
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



app.controller("GeneroCtrl", ["$scope", "$stateParams", "$uibModal", "GeneroService", 
  function GeneroCtrl($scope, $stateParams, mo, GeneroService) {
    
   
   


   $scope.printDiv = function(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var popupWin = window.open('', '_blank', 'width=300,height=300');
  popupWin.document.open();
  popupWin.document.write('<html><head><style>.saltopagina{ page-break-after: always; }</style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
  popupWin.document.close();
} 
 
   
  }
]);