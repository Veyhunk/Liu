(function() {
    'use strict';

    angular.module('app.member_management', ['ui.router'])
        .config(MemberManagementConfig);

    MemberManagementConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function MemberManagementConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.member_management', {
                name: '会员管理',
                url: '/member_management',
                abstract: true,
            })
            .state('app.member_management.register', {
                name: '会员登记',
                url: '/register',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-register/member-register.html'
                    }
                }
            })
            .state('app.member_management.list', {
                name: '会员列表',
                url: '/list',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-list/member-list.html'
                    }
                }
            })
            .state('app.member_management.charge', {
                name: '会员充值',
                url: '/charge',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-charge/member-charge.html'
                    }
                }
            })
            .state('app.member_management.level', {
                name: '会员等级',
                url: '/level',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-level/member-level.html'
                    }
                }
            });
    };
})();