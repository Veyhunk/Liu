(function() {
    'use strict';

    angular.module('app.statistics_report', ['ui.router'])
        .config(StatisticsReportConfig);

    StatisticsReportConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function StatisticsReportConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.statistics_report', {
                name: '系统管理',
                url: '/statistics_report',
                abstract: true,
            })
            .state('app.statistics_report.member_consumption', {
                name: '会员消费报表',
                url: '/member_consumption',
                views: {
                    'content@app': {
                        templateUrl: 'app/statistics-report/member-consumption/statistics-member-consumption.html'
                    }
                }
            })
            .state('app.statistics_report.member_charge', {
                name: '会员充值报表 ',
                url: '/member_charge',
                views: {
                    'content@app': {
                        templateUrl: 'app/statistics-report/member-charge/statistics-member-charge.html'
                    }
                }
            });

    }

})();