catSenseApp.controller('activityMasterController', function ($scope, $http, $q) {
    self = $scope;
  
    // let url = 'http://localhost:3000/api/v1/activities';
    let activityDataComboByOrgaCodeUrl = 'http://localhost:3000/api/v1/activities/dataComboByOrga';
    // let organizationDataComboUrl = 'http://localhost:3000/api/v1/organizations/dataCombo';
    // let countryDataComboUrl = 'http://localhost:3000/api/v1/countries/dataCombo';
    // let cityDataComboUrl = 'http://localhost:3000/api/v1/cities/dataCombo';
    // let areaDataComboUrl = 'http://localhost:3000/api/v1/areas/dataCombo';
    // let storeDataComboUrl = 'http://localhost:3000/api/v1/stores/dataCombo';
    // let activityStatusDataComboUrl = 'http://localhost:3000/api/v1/activityStatus/dataCombo';
  
    $scope.gridModels = {};
    $scope.formModel = {};
    $scope.activityDataCombo = [];
    $scope.activityMaster = {};
    $scope.activeCount = '';
    $scope.pendingCount = '';
    // $scope.organizationDataCombo = [];
    // $scope.countryDataCombo = [];
    // $scope.cityDataCombo = [];
    // $scope.areaDataCombo = [];
    // $scope.storeDataCombo = [];
    // $scope.activityStatusDataCombo = [];
    
    $scope.page = {};
    $scope.page.skip = 0;
    $scope.page.take = 999999;
    $scope.pageSizeOptions = [5, 10, 15, 20];
    $scope.rowFilter = false;
    $scope.columnSort = false;
    $scope.sort = {};
    $scope.sort.reverse = false;
    $scope.sort.column = '';
  
  //   $scope.loadOrgaDataCombo = function(){
  //     $http({
  //         method: 'GET',
  //         url: organizationDataComboUrl
  //     }).then(function mySuccess(response) {
  
  //         angular.forEach(response.data, function(item, index){
  //             let itemObject = {};
  //             itemObject.code = item.organizationId;
  //             itemObject.description = item.name; 
  //             $scope.organizationDataCombo.push(itemObject);
  //         });
  //         console.log(response);
  //     }, function myError(response) {
  //         console.log(response);
  //     });
  // };

    // $scope.loadCountryDataCombo = function () {
    //   $http({
    //     method: 'GET',
    //     url: countryDataComboUrl
    //   }).then(function mySuccess(response) {
  
    //     angular.forEach(response.data, function (item, index) {
    //       let itemObject = {};
    //       itemObject.code = item.countryId;
    //       itemObject.description = item.name;
    //       $scope.countryDataCombo.push(itemObject);
    //     });
    //     console.log(response);
    //   }, function myError(response) {
    //     console.log(response);
    //   });
    // };
  
    // $scope.loadCityDataCombo = function () {
    //   $http({
    //     method: 'GET',
    //     url: cityDataComboUrl
    //   }).then(function mySuccess(response) {
  
    //     angular.forEach(response.data, function (item, index) {
    //       let itemObject = {};
    //       itemObject.countryId = item.countryId;
    //       itemObject.code = item.cityId;
    //       itemObject.description = item.name;
    //       $scope.cityDataCombo.push(itemObject);
    //     });
    //     console.log(response);
    //   }, function myError(response) {
    //     console.log(response);
    //   });
    // };
  
    // $scope.loadAreaDataCombo = function () {
    //   $http({
    //     method: 'GET',
    //     url: areaDataComboUrl
    //   }).then(function mySuccess(response) {
  
    //     angular.forEach(response.data, function (item, index) {
    //       let itemObject = {};
    //       itemObject.cityId = item.cityId;
    //       itemObject.code = item.areaId;
    //       itemObject.description = item.name;
    //       $scope.areaDataCombo.push(itemObject);
    //     });
    //     console.log(response);
    //   }, function myError(response) {
    //     console.log(response);
    //   });
    // };

    // $scope.loadStoreDataCombo = function () {
    //     $http({
    //       method: 'GET',
    //       url: storeDataComboUrl
    //     }).then(function mySuccess(response) {
    
    //       angular.forEach(response.data, function (item, index) {
    //         let itemObject = {};
    //         itemObject.areaId = item.areaId;
    //         itemObject.code = item.storeId;
    //         itemObject.description = item.name;
    //         $scope.storeDataCombo.push(itemObject);
    //       });
    //       console.log(response);
    //     }, function myError(response) {
    //       console.log(response);
    //     });
    //   };
  
      // $scope.loadActivityStatusDataCombo = function () {
      //   $http({
      //     method: 'GET',
      //     url: activityStatusDataComboUrl
      //   }).then(function mySuccess(response) {
    
      //     angular.forEach(response.data, function (item, index) {
      //       let itemObject = {};
      //       itemObject.code = item.activityStatusId;
      //       itemObject.description = item.name;
      //       $scope.activityStatusDataCombo.push(itemObject);
      //     });
      //     console.log(response);
      //   }, function myError(response) {
      //     console.log(response);
      //   });
      // };

    // $scope.loadGrid = function () {
    //   $http({
    //     method: 'GET',
    //     url: url + '?skip=' + $scope.page.skip + '&take=' + $scope.page.take
    //   }).then(function mySuccess(response) {
    //     console.log(response);
    //     $scope.gridModels = response.data;
    //     $scope.activeCount = $scope.gridModels.rows.filter(function(c){return c.activityStatus.name==='ACTIVE';}).length;
    //     $scope.pendingCount = $scope.gridModels.rows.filter(function(c){return c.activityStatus.name==='PENDING';}).length;
    //     angular.forEach($scope.gridModels.rows, function (item, index) {
    //           item.startDate = new Date(item.startDate);
    //           item.endDate = new Date(item.endDate);
    //     });
        
    //   }, function myError(response) {
    //     console.log(response);
    //   });
    // };

    $scope.loadActivityDataCombo = function () {
      $http({
        method: 'GET',
        url: activityDataComboByOrgaCodeUrl
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
  
    // $scope.loadOrgaDataCombo();
    // $scope.loadCountryDataCombo();
    // $scope.loadCityDataCombo();
    // $scope.loadAreaDataCombo();
    // $scope.loadStoreDataCombo();
    // $scope.loadActivityStatusDataCombo();
    // $scope.loadGrid();
    $scope.loadActivityDataCombo();

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
      $http.put(url + '/' + model.activityId, JSON.stringify(model))
        .then(function (success) {
          console.log(success);
          $scope.loadGrid();
        }, function (error) {
          console.error(error.data);
        });
    };
  
    $scope.delete = function (model) {
      $http.delete(url + '/' + model.activityId)
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