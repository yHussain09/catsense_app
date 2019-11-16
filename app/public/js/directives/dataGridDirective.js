catSenseApp.directive('datagrid', function ($compile, $http) {
    return {
        scope: {
            gridTitle: '@',
            formTitle: '@',
            pkColumn: '@',
            gridData: '=?',
            gridColumns: '=?',
            showBorder: '=?',
            showHeader: '=?',
            showFooter: '=?',
            endpoint: '@'
        },
        restrict: 'E',
        replace: true,
        link: function (scope, elem, attrs) {
            debugger;
            elem.html(scope.getTemplate());
            $compile(elem.contents())(scope);
        },
        controller: function ($scope) {
            debugger;
            $scope.page = {};
            $scope.page.skip = 0;
            $scope.page.take = 999999;
            $scope.page.totalCount = 0;
            $scope.rowFilter = false;
            $scope.columnSort = false;
            $scope.sort = {};
            $scope.sort.reverse = false;
            $scope.sort.column = [];
            $scope.setSortColumn = function (sort) {
                $scope.sort.column = sort;
                $scope.sort.reverse = !$scope.sort.reverse;
                console.log($scope.sort);
            }
            $scope.bindModel = function (model, isRowEdit) {
                debugger;
                $scope.formModel = model || {};
            };
            $scope.new = function () {
                $scope.formModel = {};
            };
            
            $scope.loadGrid = function(){
                if ($scope.endpoint) {
                    $http({
                        method: 'GET',
                        url: $scope.endpoint + '?skip=' + $scope.page.skip + '&take=' + $scope.page.take
                    }).then(function mySuccess(response) {
                        console.log(response);
                        // $scope.gridModels = response.data;
    
                        $scope.page.totalCount = response.data.count;
                        $scope.gridData = response.data.rows;
                    }, function myError(response) {
                        console.log(response);
                        // $scope.myWelcome = response.statusText;
                    });
                }
            };
            $scope.loadGrid();
              $scope.save = function (model) {
                $http.post($scope.endpoint, JSON.stringify(model))
                  .then(function (success) {
                    console.log(success);
                    $scope.loadGrid();
                  }, function (error) {
                    console.error(error.data);
                  });
              };
            
              $scope.update = function (model) {
                $http.put($scope.endpoint + '/' + model[$scope.pkColumn], JSON.stringify(model))
                  .then(function (success) {
                    console.log(success);
                    $scope.loadGrid();
                  }, function (error) {
                    console.error(error.data);
                  });
              };
            
              $scope.delete = function (model) {
                $http.delete($scope.endpoint + '/' + model[$scope.pkColumn])
                  .then(function (success) {
                    console.log(success);
                    $scope.loadGrid();
                  }, function (error) {
                    console.error(error.data);
                  });
            
              };
            if(!$scope.gridData)$scope.gridData = {};
            if (!$scope.showBorder) $scope.showBorder = true;
            if (!$scope.showHeader) $scope.showHeader = true;
            if (!$scope.showFooter) $scope.showFooter = false;
            
            $scope.setSortColumn = function (sort) {
                if ($scope.columnSort) {
                    $scope.sort.column = sort;
                    $scope.sort.reverse = !$scope.sort.reverse;
                } else {
                    $scope.sort = {};
                }
            };

            $scope.toggleRowFilter = function () {
                if ($scope.rowFilter) $scope.filter = undefined;
                $scope.rowFilter = !$scope.rowFilter;
            };

            $scope.toggleRowEdit = function (isRowEdit) {
                // if ($scope.rowFilter) $scope.filter = undefined;
                // $scope.rowFilter = !$scope.rowFilter;
                debugger;
                isRowEdit = !isRowEdit;
                console.log(isRowEdit);
            };

            $scope.toggleColumnSort = function () {
                $scope.columnSort = !$scope.columnSort;
            };

            $scope.setPageSize = function (pageSize) {
                $scope.page.take = pageSize;
                $scope.loadGrid();
            };
            
            $scope.getTemplate = function () {
                debugger;
                console.log($scope);
                let template = '';

                template = 
                    '<div class="card table-responsive-md">' +
                    '   <div ng-if="showHeader" class="card-header" style="background-color: #4e73df;color: white;font-weight: bold;">{{gridTitle}}</div>' +
                    '   <table ng-class="(showBorder === true) ? \'table table-sm table-hover table-bordered\' : \'table table-sm table-hover\'">' +
                    '      <thead class="thead-light">' +
                    '         <tr>' +
                    '            <th scope="col" ng-repeat="column in gridColumns" ng-click="setSortColumn(column.key)">{{column.caption}}</th>' +
                    '            <th>' +
                    '               <span class="mdi mdi-18px mdi-plus-box" data-toggle="modal" data-target="#updateModel" ng-click="bindModel(gridModel)"></span>' +
                    '               &nbsp;&nbsp;' +
                    '               <span ng-class="rowFilter ? \'mdi mdi-18px mdi-magnify btn-link\' : \'mdi mdi-18px mdi-magnify\'" ng-click="toggleRowFilter()"></span>' +
                    '               &nbsp;&nbsp;' +
                    '               <span ng-class="columnSort ? \'mdi mdi-18px mdi-sort btn-link\' : \'mdi mdi-18px mdi-sort\'" ng-click="toggleColumnSort()"></span>'+
                    '            </th>' +
                    '         </tr>' +
                    '         <tr role="row" ng-show="rowFilter">' +
                    '            <th scope="col" ng-repeat="column in gridColumns">' +
                    '               <input class="form-control form-control-sm" type="text" ng-model="filter.column.key">' +
                    '            </th>' +
                    '         </tr>' +
                    '      </thead>' +
                    '   <tbody>' +
                    '      <tr ng-repeat="gridModel in gridData | filter : filter | orderBy : sort.column : sort.reverse" ng-init="isRowEdit = false">' +
                    '         <td ng-repeat="column in gridColumns">' +
                    '           <span ng-show="isRowEdit === false">{{gridModel[column.key]}}</span>' +
                    '           <input ng-show="isRowEdit === true" class="form-control form-control-sm" ng-if="column.dataType === \'string\'" type="text" ng-model="gridModel[column.key]">' +
                    '           <input ng-show="isRowEdit === true" class="form-control form-control-sm" ng-if="column.dataType === \'number\'" type="number" ng-model="gridModel[column.key]">' +
                    '           <select ng-show="isRowEdit === true" class="form-control form-control-sm" ng-if="column.dataType === \'fixedCombo\'" ng-model="gridModel[column.key]" ng-options="opt.code as opt.desc for opt in column.comboData">' +
                    '         </td>' +
                    '         <td ng-repeat-end>' +
                    '            <span class="mdi mdi-18px mdi-table-edit" data-toggle="modal" data-target="#updateModel" ng-click="isRowEdit = !isRowEdit"></span>' +
                    '            &nbsp;&nbsp;' +
                    '            <span class="mdi mdi-18px mdi-delete" data-toggle="modal" data-target="#deleteModel" ng-click="isRowEdit = !isRowEdit"></span>' +
                    '         </td>' +
                    '      </tr>' +
                    '   </tbody>' +
                    '   </table>' +
                    '   <div ng-if="showFooter" class="card-footer">' +
                    '      <nav aria-label="Page navigation example">' +
                    '         <ul class="pagination">' +
                    '            <li class="page-item">' +
                    '               <a class="page-link" href="#" aria-label="Previous">' +
                    '                  <span aria-hidden="true">&laquo;</span>' +
                    '               </a>' +
                    '            </li>' +
                    '            <li class="page-item"><a class="page-link" href="#">1</a></li>' +
                    '            <li class="page-item"><a class="page-link" href="#">2</a></li>' +
                    '            <li class="page-item"><a class="page-link" href="#">3</a></li>' +
                    '            <li class="page-item">' +
                    '               <a class="page-link" href="#" aria-label="Next">' +
                    '                   <span aria-hidden="true">&raquo;</span>' +
                    '               </a>' +
                    '            </li>' +
                    '         </ul>' +
                    '      </nav>' +
                    '   </div>' +
                    '</div>';
                    
                // template += '<div id="updateModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                //             '   <div class="modal-dialog modal-lg">' +
                //             '       <div class="modal-content">' +
                //             '           <div class="modal-header">' +
                //             '               <h5 class="modal-title" id="exampleModalLabel">{{formTitle}} - {{formModel.pkColumn}}</h5>' +
                //             '               <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                //             '                   <span aria-hidden="true">&times;</span>' +
                //             '               </button>' +
                //             '           </div>' +
                //             '           <div class="modal-body">' +
                //             '               <form>' +
                //             '                   <div class="form-group" ng-repeat="column in gridColumns">' +
                //             '                       <label for="recipient-name" class="col-form-label">{{column.caption}}</label>' +
                //             '                       <input type="text" class="form-control form-control-sm" ng-model="formModel[column.key]">' +
                //             '                   </div>' +
                //             '               </form>' +
                //             '           </div>' +
                //             '           <div class="modal-footer">' +
                //             '               <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>' +
                //             '               <button ng-if="!formModel.pkColumn" type="button" class="btn btn-sm btn-primary" data-dismiss="modal" ng-click="save(formModel)">Save</button>' +
                //             '               <button ng-if="formModel.pkColumn" type="button" class="btn btn-sm btn-primary" data-dismiss="modal" ng-click="update(formModel)">Update</button>' +
                //             '           </div>' +
                //             '       </div>' +
                //             '   </div>' +
                //             '</div>';

                // template += '<div id="deleteModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                //             '   <div class="modal-dialog modal-lg">' +
                //             '       <div class="modal-content">' +
                //             '           <div class="modal-header">' +
                //             '               <h5 class="modal-title" id="exampleModalLabel">role - {{formModel.pkColumn}}</h5>' +
                //             '               <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                //             '                   <span aria-hidden="true">&times;</span>' +
                //             '               </button>' +
                //             '           </div>' +
                //             '           <div class="modal-body">' +
                //             '               <h5>Are you sure you want to delete this record ?</h5>' +
                //             '           </div>' +
                //             '           <div class="modal-footer">' +
                //             '               <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>' +
                //             '               <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal" ng-click="delete(formModel)">Delete</button>' +
                //             '           </div>' +
                //             '       </div>' +
                //             '   </div>' +
                //             '</div>';
                return template;
            }
        }
    };
});