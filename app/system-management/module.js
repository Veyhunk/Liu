(function() {
    'use strict';

    angular.module('app.system_management', ['ui.router'])
        .config(SystemManagementConfig);

    SystemManagementConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function SystemManagementConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.system_management', {
                name: '系统管理',
                url: '/system_management',
                abstract: true,
            })
            .state('app.system_management.user', {
                name: '用户管理',
                url: '/user',
                views: {
                    'content@app': {
                        templateUrl: 'app/system-management/user/user.html'
                    }
                }
            })
            .state('app.system_management.role', {
                name: '角色管理',
                url: '/role',
                views: {
                    'content@app': {
                        templateUrl: 'app/system-management/role/role.html'
                    }
                }
            });

    }

})();