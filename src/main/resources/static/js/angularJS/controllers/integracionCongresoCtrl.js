var app = angular.module("silPortal");

app.service("IntegracionCongresoService", ["$q", "$timeout",
  function IntegracionCongresoService($q, $timeout) {
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

app.controller("IntegracionCongresoCtrl", ["$scope", "$uibModal", "IntegracionCongresoService", 
  function IntegracionCongresoCtrl($scope, mo, IntegracionCongresoService) {
      
    $scope.contacts = [];
    $scope.groupedContacts = [];
    $scope.currentContact;

    $scope.sidebar = {};
    $scope.sidebar.isActive = true;

    IntegracionCongresoService.getContacts().then(function(contacts) {
      $scope.contacts = contacts;
    });
    
    

    $scope.show = function show(contact) {
      $scope.currentContact = contact;
      $scope.contacts.map(function(c) {
        c.isActive = (c.id === contact.id);
      });

      $scope.groupedContacts = _.groupBy(
        $scope.contacts,
        function(contact) {
          return contact.firstName.charAt(0);
        });

      $scope.setSidebarInactive().scrollTop();
    };

    $scope.setSidebarActive = function setSidebarActive() {
      $scope.sidebar.isActive = true;
      return this;
    };

    $scope.setSidebarInactive = function setSidebarInactive() {
      $scope.sidebar.isActive = false;
      return this;
    };

    $scope.scrollTop = function scrollTop() {
      window.scrollTo(0, 0);
      return this;
    };
    

  
    $scope.openSearchBasic = function openSearchBasic() {
     
      var modalInstance = mo.open({
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "myModalContent.html",
        controller: "ModalInstanceCtrl",
        controllerAs: "mo",
        size: 15
      });

      modalInstance.result.then(function(selectedItem) {
        mo.selected = selectedItem;
      }, function() {
        $log.info("Modal dismissed at: " + new Date());
      });
      
    };
    
     $scope.openSearchAvanzado = function openSearchAvanzado() {
      
      var modalInstance = mo.open({
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "myModalContent.html",
        controller: "ModalInstanceCtrl",
        controllerAs: "mo",
        size: 15
      });

      modalInstance.result.then(function(selectedItem) {
        mo.selected = selectedItem;
      }, function() {
        $log.info("Modal dismissed at: " + new Date());
      });
      
      
    };
    

    
   
    
  }
]);
