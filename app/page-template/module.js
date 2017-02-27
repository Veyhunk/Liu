(function() {
    'use strict';

    angular.module('app.page_template', ['ui.router'])
        .config(pageTemplateConfig);

    pageTemplateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function pageTemplateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.page_template', {
                name: '系统管理',
                url: '/page_template',
                abstract: true,
            })
            .state('app.page_template.form', {
                name: '表单',
                url: '/form',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/form/form.html'
                    }
                }
            })
            .state('app.page_template.modal', {
                name: '模态框',
                url: '/modal',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/modal/modal.html'
                    }
                }
            })
            .state('app.page_template.table', {
                name: '表格',
                url: '/table',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/table/table.html'
                    }
                }
            })
            .state('app.page_template.text', {
                name: '文本',
                url: '/text',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/text/text.html'
                    }
                }
            })
            .state('app.page_template.tree', {
                name: '树',
                url: '/tree',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/tree/tree.html'
                    }
                }
            })
            .state('app.page_template.full_view', {
                name: '配色',
                url: '/full_view',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/full-view/full-view.html'
                    }
                }
            }).state('app.page_template.palette', {
                name: '调色板',
                url: '/palette',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/palette/palette.html'
                    }
                }
            }).state('app.page_template.plugin_test', {
                name: ' 插件测试',
                url: '/plugin_test',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/plugin-test/plugin-test.html'
                    }
                }
            });

    }

})();