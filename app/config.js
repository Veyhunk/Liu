(function(angular) {
    'use strict';

    angular
        .module('app.configs', [])
        .config(['RestangularProvider', function(RestangularProvider) {

            RestangularProvider.setBaseUrl('http://localhost:3000/API');

            RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

            RestangularProvider.addResponseInterceptor(function(result, operation, what, url, response, deferred) {
                var extractedData = result;
                // .. to look for getList operations
                if (operation === "getList" && angular.isDefined(result.data)) {
                    // .. and handle the data and record data
                    extractedData = result.data;

                    if (angular.isDefined(result.records)) {
                        extractedData.records = result.records;
                    }
                }
                return extractedData;
            });

        }])
        .run(['ProfileService', 'AuthService', function(ProfileService, AuthService) {
            ProfileService.initProfile();
            AuthService.initAuthorizationData();
        }]);


})(angular);