catSenseApp.controller('roleController', function ($scope, $http) {
  self = $scope;

  $scope.gridModels = {};
  $scope.formModel = {};
  $scope.organizationDataCombo = [];
  $scope.fixedCombo = [{
          code: "Y",
          description: "Yes"
      },
      {
          code: "N",
          description: "No"
      }
  ];
  $scope.page = {};
  $scope.page.skip = 0;
  $scope.page.take = 999999;
  $scope.pageSizeOptions = [5, 10, 15, 20];
  $scope.rowFilter = false;
  $scope.columnSort = false;
  $scope.sort = {};
  $scope.sort.reverse = false;
  $scope.sort.column = '';

  $scope.loadOrgaDataCombo = function(){
      $http({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/organizations/dataCombo'
      }).then(function mySuccess(response) {
  
          angular.forEach(response.data, function(item, index){
              let itemObject = {};
              itemObject.code = item.organizationId;
              itemObject.description = item.name; 
              $scope.organizationDataCombo.push(itemObject);
          });
          // $scope.organizationDataCombo = response;
          console.log(response);
          // $scope.gridModels = response.data;
      }, function myError(response) {
          console.log(response);
          // $scope.myWelcome = response.statusText;
      });
  };

  $scope.loadGrid = function(){
      $http({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/roles?skip=' + $scope.page.skip + '&take=' + $scope.page.take
      }).then(function mySuccess(response) {
          console.log(response);
          $scope.gridModels = response.data;
      }, function myError(response) {
          console.log(response);
          // $scope.myWelcome = response.statusText;
      });
  };

  $scope.loadOrgaDataCombo();
  $scope.loadGrid();


  // $scope.reloadGrid = function () {
  //     $http({
  //         method: 'GET',
  //         url: 'http://localhost:3000/api/v1/roles'
  //     }).then(function mySuccess(response) {
  //         console.log(response);
  //         $scope.gridModels = response.data;
  //     }, function myError(response) {
  //         console.log(response);
  //         // $scope.myWelcome = response.statusText;
  //     });
  // };

  $scope.bindModel = function (model) {
      $scope.formModel = model || {};
      // angular.element('.pointer').removeClass('active-row');
      // angular.element('#' + model.id).addClass('active-row');
  };

  $scope.new = function () {
      $scope.formModel = {};
  };

  $scope.save = function (model) {
      $http.post('http://localhost:3000/api/v1/roles', JSON.stringify(model))
          .then(function (success) {
              console.log(success);
              $scope.loadGrid();
          }, function (error) {
              console.error(error.data);
          });
  };

  $scope.update = function (model) {
      $http.put('http://localhost:3000/api/v1/roles/' + model.roleId, JSON.stringify(model))
          .then(function (success) {
              console.log(success);
              $scope.loadGrid();
          }, function (error) {
              console.error(error.data);
          });
  };

  $scope.delete = function (model) {
      $http.delete('http://localhost:3000/api/v1/roles/' + model.roleId)
          .then(function (success) {
              console.log(success);
              $scope.loadGrid();
          }, function (error) {
              console.error(error.data);
          });

  };

  $scope.setSortColumn = function (sort) {
      if ($scope.columnSort) {
          $scope.sort.column = sort;
          $scope.sort.reverse = !$scope.sort.reverse;
      }else{
          $scope.sort = {};
      }
  }

  $scope.toggleRowFilter = function () {
      if ($scope.rowFilter) $scope.filter = undefined;
      $scope.rowFilter = !$scope.rowFilter;
  };

  $scope.toggleColumnSort = function () {
      $scope.columnSort = !$scope.columnSort;
  };

  $scope.setPageSize = function (pageSize) {
      $scope.page.take = pageSize;
      $scope.loadGrid();
  };
});

// function roleController($scope, $http) {
//     self=$scope;
//     $scope.grid = {};
//     $scope.grid.title = 'roles';

//     $http({
//         method : 'GET',
//         url : 'http://localhost:3000/api/v1/roles'
//       }).then(function mySuccess(response) {
//         console.log(response);
//         $scope.grid.data = response.data;
//       }, function myError(response) {
//         console.log(response);
//         $scope.myWelcome = response.statusText;
//     });
// }
// // catSenseApp.register.controller('roleController', roleController);
// angular.module('cat-sense-app').controller('roleController', ['$scope', '$http', roleController]);