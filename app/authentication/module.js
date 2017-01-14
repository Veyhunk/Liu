(function() {
    'use strict';

    angular.module('app.authentication', ['ui.router'])
        .config(authenticationConfig);

    authenticationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function authenticationConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: 'app/authentication/login.html',
                    }
                },
                resolve: {
                    scripts: function(LazyScript) {
                        return LazyScript.register([
                            'assets/lib/md5/md5.js'
                        ]);
                    }
                },
            });

    }

})();