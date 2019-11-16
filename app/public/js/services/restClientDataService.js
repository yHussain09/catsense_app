var RestClientDataService = angular.module('RestClientDataService', []);
RestClientDataService.factory('RestDataService', function($http, $q) {
    var REST_SERVICE_URI = '';
    var factory = {
        callRest : callRest,
        callRestWithoutPage : callRestWithoutPage,
        callPost : callPost,
        callPut : callPut,
        callDelete : callDelete
    };
    return factory;
    function callRest(restEndPoint, page, size,extra) {
        var deferred = $q.defer();
        var url = REST_SERVICE_URI + restEndPoint;
        if (restEndPoint.toString().indexOf("?")>-1)
        {
            url = url + "&"
        }
        else
        {
            url = url + "?"
        }
        url = url + 'page='+page+'&size='+size;
        if (extra)
        {
            url = url +extra;
        }
        //console.log("url----->"+url)
        $http.get(url).then(
            function(response) {
//                console.log(response.data);
                deferred.resolve(response.data);
            }, function(errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function callRestWithoutPage(restEndPoint,extra) {
        //console.log("####callRest()#########");
        var deferred = $q.defer();
        var url = REST_SERVICE_URI + restEndPoint;
        if (restEndPoint.toString().indexOf("?")>-1)
        {
            url = url + "&"
        }
        else
        {
            url = url + "?"
        }
        //url = url + 'page='+page+'&size='+size;
        if (extra)
        {
            url = url +extra;
        }
        //console.log("url----->"+url)
        $http.get(url).then(
            function(response) {
//                console.log(response.data);
                deferred.resolve(response.data);
            }, function(errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function callPost(restEndPoint, values) {
        console.log("####callPost()#########");
        var deferred = $q.defer();
        var url = REST_SERVICE_URI + restEndPoint;
        $http.post(url, values).then(
            function(response) {
                console.log(response.data);
                deferred.resolve(response.data);
            }, function(errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function callPut(restEndPoint, model) {
        console.log("####callPut()#########");
        var deferred = $q.defer();
        var url = REST_SERVICE_URI + restEndPoint;
        $http.put(url, model).then(
            function(response) {
                console.log(response.data);
                deferred.resolve(response.data);
            }, function(errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function callDelete(restEndPoint, key) {
        console.log("####callDelete()#########");
                var deferred = $q.defer();
        var restUrl = REST_SERVICE_URI + restEndPoint;

        /*$http.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
        $http.delete(url, key).then(
            function(response) {
                console.log(response.data);
                deferred.resolve(response.data);
            }, function(errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
        */
        $http({
		            method: 'DELETE',
		            url: restUrl,
		            data: key,
		            headers: {
		                'Content-type': 'application/json;charset=utf-8'
					}
            }).then(
            function(response) {
                console.log(response.data);
                deferred.resolve(response.data);
            }, function(errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
});