(function() {
    'use strict';

    angular.module('app.admin', ['ui.router'])
        .config(pageTemplateConfig);

    pageTemplateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function pageTemplateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.admin', {
                name: '系统管理',
                url: '/admin',
                views: {
                    'content@app': {
                        templateUrl: 'app/admin/index.html'
                    }
                }
            });

    }

})();