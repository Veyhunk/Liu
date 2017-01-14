(function() {
    'use strict';

    angular.module('app.consumption_management', ['ui.router'])
        .config(ConsumptionManagementConfig);

    ConsumptionManagementConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function ConsumptionManagementConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.consumption_management', {
                name: '消费管理',
                url: '/consumption_management',
                abstract: true,
            })
            .state('app.consumption_management.pay_for_goods', {
                name: '商品消费',
                url: '/pay_for_goods',
                views: {
                    'content@app': {
                        templateUrl: 'app/consumption-management/pay-for-goods/pay-for-goods.html'
                    }
                }
            })
            .state('app.consumption_management.quick_pay', {
                name: '快速消费',
                url: '/quick_pay',
                views: {
                    'content@app': {
                        templateUrl: 'app/consumption-management/quick-pay/quick-pay.html'
                    }
                }
            })
            .state('app.consumption_management.record', {
                name: '消费记录',
                url: '/record',
                views: {
                    'content@app': {
                        templateUrl: 'app/consumption-management/record/record.html'
                    }
                }
            });
    };
})();