catSenseApp.controller('adminDashboardController', function ($scope, $http, $q) {
    self = $scope;
    $scope.optionsList = [
        { url: '/organization', description: 'Organization' },
        { url: '/role', description: 'Role' },
        { url: '/user', description: 'User' },
    ];
    
});