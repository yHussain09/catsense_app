catSenseApp.controller('roleController', function($scope, $http, $q) {
    self=$scope;
    let url = 'http://localhost:3000/api/v1/roles';
    let orgaDataComboUrl = 'http://localhost:3000/api/v1/organizations/dataCombo';
    let gridDataSource = new DevExpress.data.CustomStore({
      load: function (loadOptions) {
          var parameters = {};           
          debugger;
          if (loadOptions.sort) {
              parameters.orderby = loadOptions.sort[0].selector;
              if (loadOptions.sort[0].desc)
                parameters.orderby += '~desc';
          }
  
          if (loadOptions.filter){
            parameters.filter = encodeURI(loadOptions.filter);
            // parameters.filter = loadOptions.filter[0] + '~' + loadOptions.filter[1] + '~' + loadOptions.filter[2];
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
        return $http.put(url + '/' +  encodeURIComponent(key.roleId), JSON.stringify(values))
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
        return $http.delete(url + '/' + encodeURIComponent(key.roleId))
        .then(function (response) {
          console.log(response);
          return $q.defer().resolve(response);
        }, function (error) {
          console.error(error);
          return $q.reject("Data Delete Error");
        });
      },
  });
    
    $scope.dataGridOptions = {
      dataSource: gridDataSource,
      columns: [
        {
          caption: 'Organization', 
          dataField:'organizationId',
          lookup: {
            dataSource: orgaDataComboUrl,
            key: 'organizationId',
            valueExpr: 'organizationId',
            displayExpr: 'name'
          }
        }, 
        {caption: 'Role', dataField:'name'}, {caption: 'Description', dataField:'description'}
      ],
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
  });