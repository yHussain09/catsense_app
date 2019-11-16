catSenseApp.controller('activityUserController', function ($scope, $http, $q) {
    self = $scope;
  
    let url = 'http://localhost:3000/api/v1/activityUsers';
    let activityDataComboUrl = 'http://localhost:3000/api/v1/activities/dataCombo';
    let userDataComboUrl = 'http://localhost:3000/api/v1/users/dataCombo';
  
    $scope.gridModels = {};
    $scope.formModel = {};
    $scope.userDataCombo = [];
    $scope.activityDataCombo = [];
    $scope.page = {};
    $scope.page.skip = 0;
    $scope.page.take = 999999;
    $scope.pageSizeOptions = [5, 10, 15, 20];
    $scope.rowFilter = false;
    $scope.columnSort = false;
    $scope.sort = {};
    $scope.sort.reverse = false;
    $scope.sort.column = '';
  
    $scope.loadUserDataCombo = function () {
        $http({
          method: 'GET',
          url: userDataComboUrl
        }).then(function mySuccess(response) {
    
          angular.forEach(response.data, function (item, index) {
            let itemObject = {};
            // itemObject.areaId = item.areaId;
            itemObject.code = item.userId;
            itemObject.description = item.username;
            $scope.userDataCombo.push(itemObject);
          });
          console.log(response);
        }, function myError(response) {
          console.log(response);
        });
      };
  
      $scope.loadActivityDataCombo = function () {
        $http({
          method: 'GET',
          url: activityDataComboUrl
        }).then(function mySuccess(response) {
    
          angular.forEach(response.data, function (item, index) {
            let itemObject = {};
            itemObject.code = item.activityId;
            itemObject.description = item.name;
            $scope.activityDataCombo.push(itemObject);
          });
          console.log(response);
        }, function myError(response) {
          console.log(response);
        });
      };

    $scope.loadGrid = function () {
      $http({
        method: 'GET',
        url: url + '?skip=' + $scope.page.skip + '&take=' + $scope.page.take
      }).then(function mySuccess(response) {
        console.log(response);
        $scope.gridModels = response.data;
      }, function myError(response) {
        console.log(response);
        // $scope.myWelcome = response.statusText;
      });
    };
  
    $scope.loadUserDataCombo();
    $scope.loadActivityDataCombo();
    $scope.loadGrid();
  
    $scope.bindModel = function (model) {
      $scope.formModel = model || {};
    };
  
    $scope.new = function () {
      $scope.formModel = {};
    };
  
    $scope.save = function (model) {
      $http.post(url, JSON.stringify(model))
        .then(function (success) {
          console.log(success);
          $scope.loadGrid();
        }, function (error) {
          console.error(error.data);
        });
    };
  
    $scope.update = function (model) {
      $http.put(url + '/' + model.activityUserId, JSON.stringify(model))
        .then(function (success) {
          console.log(success);
          $scope.loadGrid();
        }, function (error) {
          console.error(error.data);
        });
    };
  
    $scope.delete = function (model) {
      $http.delete(url + '/' + model.activityUserId)
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
      } else {
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