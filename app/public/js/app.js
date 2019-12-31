'use strict';

var catSenseApp = angular.module("cat-sense-app", [
    'ui.router'
    //, 'dx'
    // 'dataGrid'
    // 'ngRoute'
    // 'RestDataService',
    // 'cent_angularcomps',
    // 'cent_angulareditablegrid',
    // 'cent_angulardropdowngrid',
    // 'cent_angularavailallow',
    // 'cent_angularrecordbuttons',
    // 'ui.bootstrap',
    // 'dx',
    // 'cent.tabset',
    // 'angular-bind-html-compile'
]);

catSenseApp.config(
    function ($httpProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $stateProvider, $urlRouterProvider) {

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $httpProvider.defaults.headers.common[header] = token;

    catSenseApp.register = {
            component: $compileProvider.component,
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

        $stateProvider
            .state('organization', {
                url: "/organization",
                templateUrl: "../partials/organization-view.html",
                // controller: '../js/controllers/organizationController.js'
            })
            .state('role', {
                url: "/role",
                templateUrl: "../partials/role-view.html",
                // controller: '../js/controllers/organizationController.js'
            })
            .state('user', {
                url: "/user",
                templateUrl: "../partials/user-view.html",
                // controller: '../js/controllers/organizationController.js'
            })
            .state('productType', {
                url: "/productType",
                templateUrl: "../partials/product-type-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('measurementUnit', {
                url: "/measurementUnit",
                templateUrl: "../partials/measurement-unit-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('product', {
                url: "/product",
                templateUrl: "../partials/product-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('country', {
                url: "/country",
                templateUrl: "../partials/country-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('city', {
                url: "/city",
                templateUrl: "../partials/city-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('area', {
                url: "/area",
                templateUrl: "../partials/area-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('store', {
                url: "/store",
                templateUrl: "../partials/store-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityStatus', {
                url: "/activityStatus",
                templateUrl: "../partials/activity-status-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('customerType', {
                url: "/customerType",
                templateUrl: "../partials/customer-type-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activity', {
                url: "/activity",
                templateUrl: "../partials/activity-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityStore', {
                url: "/activityStore",
                templateUrl: "../partials/activity-store-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityUser', {
                url: "/activityUser",
                templateUrl: "../partials/activity-user-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('userStore', {
                url: "/userStore",
                templateUrl: "../partials/user-store-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityProduct', {
                url: "/activityProduct",
                templateUrl: "../partials/activity-product-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityData', {
                url: "/activityData",
                templateUrl: "../partials/activity-data-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityMaster', {
                url: "/activityMaster",
                templateUrl: "../partials/activity-master-view.html",
                // controller: 'YourOtherCtrl'
            })
            .state('activityDetail', {
                url: "/activityDetail",
                templateUrl: "../partials/activity-detail-view.html",
                // controller: 'YourOtherCtrl'
            });
        $urlRouterProvider.otherwise("/home");

    // $urlRouterProvider.otherwise("/");
    // $stateProvider
    //     .state('master', {
    //         url: "",
    //         views: {
    //             "@": {
    //                 templateUrl: "content-master"
    //             },
    //             "nav-view": {
    //                 templateUrl: "nav-content"
    //             }
    //         }
    //     })
    //     .state('master.content', {
    //         url: "/content/:pageId",
    //         views: {
    //             "content-view": {
    //                 templateUrl: function ($stateParams) {
    //                     return 'content?pageId=' + $stateParams.pageId;
    //                 }
    //             }
    //         },
    //         params: {extra: null}
    //     })
    //     .state('master.error', {
    //         url: "/content/ERROR",
    //         views: {
    //             "content-view": {
    //                 templateUrl: function (params){
    //                     return "error-page?message=" + params.message + "&appendLogin=" + params.appendLogin
    //                 }
    //             }
    //         },
    //         params: {
    //             message: { // <-- ParamDeclaration for 'nonUrlParam'
    //                 type: "string",
    //                 value: ""
    //             },
    //             appendLogin: false
    //         }
    //     });
    /*$rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            event.preventDefault();
            window.location = "/";
        });*/
});

catSenseApp.run(function ($transitions, $http, $templateCache ) {
    $transitions.onError({ }, function(transition) {
        //window.location = "/";
    });
    // $transitions.onBefore({to:"master.content"}, function(transition) {
    //     var stateService = transition.router.stateService;
    //     return $http.get("isauthenticated").then(function(response){
    //         if(response.data !== "true")
    //         {
    //             $templateCache.removeAll();
    //             //$templateCache.put("error-page", response.data);
    //             return stateService.target('master.error', {message: response.data, appendLogin: true});
    //         }
    //     });
    //     //transition.router.stateService.target('master.content.error');
    //     //return false;
    //     //$templateCache.remove("content-master");
    // });

});