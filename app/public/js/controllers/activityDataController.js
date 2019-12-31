catSenseApp.controller('activityDataController', function ($scope, $http, $q) {
    self = $scope;
    let customerUrl = 'http://localhost:3000/api/v1/customers';
    let activityDataUrl = 'http://localhost:3000/api/v1/activityData';
    let customerTypeComboUrl = 'http://localhost:3000/api/v1/customerTypes/dataCombo';

    $scope.gridModels = {};
    $scope.customerFormModel = {};
    $scope.activityFormModel = {};
    $scope.createdCustomer = {};
    $scope.genderFixedCombo = [{
        code: "M",
        description: "Male"
      },
      {
        code: "F",
        description: "Female"
      }
    ];
    $scope.customerTypeDataCombo = [];
    $scope.page = {};
    $scope.page.skip = 0;
    $scope.page.take = 999999;
    $scope.pageSizeOptions = [5, 10, 15, 20];
    $scope.rowFilter = false;
    $scope.columnSort = false;
    $scope.sort = {};
    $scope.sort.reverse = false;
    $scope.sort.column = '';

    $scope.loadCustomerTypeDataCombo = function () {
      $http({
        method: 'GET',
        url: customerTypeComboUrl
      }).then(function mySuccess(response) {
  
        angular.forEach(response.data, function (item, index) {
          let itemObject = {};
          itemObject.code = item.customerTypeId;
          itemObject.description = item.name;
          $scope.customerTypeDataCombo.push(itemObject);
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
        });
    };

    $scope.loadCustomerTypeDataCombo();
    // $scope.loadGrid();

    $scope.bindModel = function (model) {
        $scope.formModel = model || {};
    };

    $scope.new = function () {
        $scope.formModel = {};
    };

    $scope.saveCustomer = function (model) {
      $http.post(customerUrl, JSON.stringify(model))
          .then(function (success) {
              console.log(success);
              $scope.createdCustomer = success.data;
              // $scope.loadGrid();
          }, function (error) {
              console.error(error.data);
          });
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
        $http.put(url + '/' + model.activityStatusId, JSON.stringify(model))
            .then(function (success) {
                console.log(success);
                $scope.loadGrid();
            }, function (error) {
                console.error(error.data);
            });
    };

    $scope.delete = function (model) {
        $http.delete(url + '/' + model.activityStatusId)
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


