(function() {
    'use strict';

    angular.module('app.goods_management', ['ui.router'])
        .config(GoodsManagementConfig);

    GoodsManagementConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function GoodsManagementConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.goods_management', {
                name: '商品管理',
                url: '/goods_management',
                abstract: true,
            })
            .state('app.goods_management.register', {
                name: '商品登记',
                url: '/register',
                views: {
                    'content@app': {
                        templateUrl: 'app/goods-management/goods-register/goods-register.html'
                    }
                }
            })
            .state('app.goods_management.class', {
                name: '商品分类',
                url: '/class',
                views: {
                    'content@app': {
                        templateUrl: 'app/goods-management/goods-class/goods-class.html'
                    }
                }
            })
            .state('app.goods_management.list', {
                name: '商品列表',
                url: '/list',
                views: {
                    'content@app': {
                        templateUrl: 'app/goods-management/goods-list/goods-list.html'
                    }
                }
            })
            .state('app.goods_management.inventory', {
                name: '商品入库',
                url: '/inventory',
                views: {
                    'content@app': {
                        templateUrl: 'app/goods-management/goods-inventory/goods-inventory.html'
                    }
                }
            })
            .state('app.goods_management.inventory_list', {
                name: '库存列表',
                url: '/inventory_list',
                views: {
                    'content@app': {
                        templateUrl: 'app/goods-management/inventory-list/inventory-list.html'
                    }
                }
            });
    };
})();