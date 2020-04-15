
var app = angular.module("silPortal",['pascalprecht.translate']);

app.controller("contactoCtrl",function ($scope,$rootScope, $translate) {

    $translate.use('es');
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };
  $rootScope.rootRepoImagenes=window.location.protocol+"//"+window.location.host+"/segob/sil/legisladores/";
});


