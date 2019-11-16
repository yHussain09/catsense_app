catSenseApp.controller('organizationController', function ($scope, $http, $q) {
  self = $scope;
  let url = 'http://localhost:3000/api/v1/organizations';

  $scope.gridModels = {};
  $scope.formModel = {};
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

  $scope.loadGrid = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/organizations?skip=' + $scope.page.skip + '&take=' + $scope.page.take
    }).then(function mySuccess(response) {
      console.log(response);
      $scope.gridModels = response.data;
    }, function myError(response) {
      console.log(response);
      // $scope.myWelcome = response.statusText;
    });
  };

  $scope.loadGrid();

  $scope.bindModel = function (model) {
    $scope.formModel = model || {};
    // angular.element('.pointer').removeClass('active-row');
    // angular.element('#'+ model.id).addClass('active-row');
  };

  $scope.new = function () {
    $scope.formModel = {};
  };

  $scope.save = function (model) {
    $http.post('http://localhost:3000/api/v1/organizations', JSON.stringify(model))
      .then(function (success) {
        console.log(success);
        $scope.loadGrid();
      }, function (error) {
        console.error(error.data);
      });
  };

  $scope.update = function (model) {
    $http.put('http://localhost:3000/api/v1/organizations/' + model.organizationId, JSON.stringify(model))
      .then(function (success) {
        console.log(success);
        $scope.loadGrid();
      }, function (error) {
        console.error(error.data);
      });
  };

  $scope.delete = function (model) {
    $http.delete('http://localhost:3000/api/v1/organizations/' + model.organizationId)
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


  /*
  let gridDataSource = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var parameters = {};           

        if (loadOptions.sort) {
            parameters.orderby = loadOptions.sort[0].selector;
            if (loadOptions.sort[0].desc)
              parameters.orderby += '~desc';
        }

        if (loadOptions.filter){
          parameters.filter = loadOptions.filter[0] + '~' + loadOptions.filter[1] + '~' + loadOptions.filter[2];
        }
        
        parameters.skip = loadOptions.skip;
        parameters.take = loadOptions.take;
        
        let config = {
            params: parameters
        };
        
        return $http.get(url, (config))
        .then(function (response) {
            return { data: response.data.rows, totalCount: response.data.count };
        }, function (error) {
          console.error(error);
            return $q.reject("Data Loading Error");
        });
    },
    insert: function(values){
      return $http.post(url, JSON.stringify(values))
      .then(function (response) {
        console.log(response);
        // $scope.reloadGrid();
        return { data: response.data, totalCount: response.data.length };
      }, function (error) {
        console.error(error.data);
        return $q.reject("Data Insert Error");
      });
    },
    update: function(key, values){
      return $http.put(url + '/' + encodeURIComponent(key.organizationId), JSON.stringify(values))
      .then(function (response) {
        console.log(response);
        // $scope.reloadGrid();
        return { data: response.data.rows, totalCount: response.data.count };
      }, function (error) {
        console.error(error);
        return $q.reject("Data Update Error");
      });
    },
    remove: function(key){
      return $http.delete(url + '/' + encodeURIComponent(key.organizationId))
      .then(function (response) {
        console.log(response);
        return $q.defer().resolve(response);
      }, function (error) {
        console.error(error);
        return $q.reject("Data Delete Error");
      });
    },
  });
  */
  /*
  $scope.dataGridOptions = {
    dataSource: gridDataSource,
    columns: [{caption: 'Name', dataField:'name'}, {caption: 'Description', dataField:'description'}, 
    {
      caption: 'Status',
      dataField: 'active',
      lookup: {
        dataSource: [{'code': 'Y', 'description': 'Active'}, {'code': 'N', 'description': 'In-Active'}],
        valueExpr: 'code',
        displayExpr: 'description'
      }
    }],
    showBorders:true,
    showColumnHeaders:true,
    showColumnLines:true,
    showRowLines:true,
    editing: {
      allowAdding: true,
      allowDeleting: true,
      allowUpdating: true,
      mode: 'row'
    },
    pager: {
      allowedPageSizes: [5, 10, 15, 20],
      infoText:"Page {0} of {1} ({2} items)",
      showInfo:true,
      showNavigationButtons: true,
      showPageSizeSelector: true,
      visible:true
    },
    paging: {
      enabled:true,
      // pageIndex:0,
      pageSize:5
    },
    headerFilter: { visible: false },
    filterRow: { visible: true },
    twoWayBindingEnabled: true,
    remoteOperations: { groupPaging: true }	
  };
  */





});
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
// function organizationController($scope, $http) {
//     self=$scope;
//     $scope.grid = {};
//     $scope.grid.title = 'Organizations';

//     $http({
//         method : 'GET',
//         url : 'http://localhost:3000/api/v1/organizations'
//       }).then(function mySuccess(response) {
//         console.log(response);
//         $scope.grid.data = response.data;
//       }, function myError(response) {
//         console.log(response);
//         $scope.myWelcome = response.statusText;
//     });
// }
// // catSenseApp.register.controller('organizationController', organizationController);
// angular.module('cat-sense-app').controller('organizationController', ['$scope', '$http', organizationController]);