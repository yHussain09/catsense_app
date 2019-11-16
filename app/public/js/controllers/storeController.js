catSenseApp.controller('storeController', function ($scope, $http, $q) {
  self = $scope;

  let url = 'http://localhost:3000/api/v1/stores';
  let countryDataComboUrl = 'http://localhost:3000/api/v1/countries/dataCombo';
  let cityDataComboUrl = 'http://localhost:3000/api/v1/cities/dataCombo';
  let areaDataComboUrl = 'http://localhost:3000/api/v1/areas/dataCombo';

  $scope.gridModels = {};
  $scope.formModel = {};
  $scope.countryDataCombo = [];
  $scope.cityDataCombo = [];
  $scope.areaDataCombo = [];
  $scope.fixedCombo = [{
      code: "Y",
      description: "Active"
    },
    {
      code: "N",
      description: "In-active"
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

  $scope.loadCountryDataCombo = function () {
    $http({
      method: 'GET',
      url: countryDataComboUrl
    }).then(function mySuccess(response) {

      angular.forEach(response.data, function (item, index) {
        let itemObject = {};
        itemObject.code = item.countryId;
        itemObject.description = item.name;
        $scope.countryDataCombo.push(itemObject);
      });
      console.log(response);
    }, function myError(response) {
      console.log(response);
    });
  };

  $scope.loadCityDataCombo = function () {
    $http({
      method: 'GET',
      url: cityDataComboUrl
    }).then(function mySuccess(response) {

      angular.forEach(response.data, function (item, index) {
        let itemObject = {};
        itemObject.countryId = item.countryId;
        itemObject.code = item.cityId;
        itemObject.description = item.name;
        $scope.cityDataCombo.push(itemObject);
      });
      console.log(response);
    }, function myError(response) {
      console.log(response);
    });
  };

  $scope.loadAreaDataCombo = function () {
    $http({
      method: 'GET',
      url: areaDataComboUrl
    }).then(function mySuccess(response) {

      angular.forEach(response.data, function (item, index) {
        let itemObject = {};
        itemObject.cityId = item.cityId;
        itemObject.code = item.areaId;
        itemObject.description = item.name;
        $scope.areaDataCombo.push(itemObject);
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

  $scope.loadCountryDataCombo();
  $scope.loadCityDataCombo();
  $scope.loadAreaDataCombo();
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
    $http.put(url + '/' + model.storeId, JSON.stringify(model))
      .then(function (success) {
        console.log(success);
        $scope.loadGrid();
      }, function (error) {
        console.error(error.data);
      });
  };

  $scope.delete = function (model) {
    $http.delete(url + '/' + model.storeId)
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