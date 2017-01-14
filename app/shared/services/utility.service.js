(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('UtilityService', UtilityService);

    UtilityService.$inject = ['$q'];

    function UtilityService($q) {
        let UtilityService = {
            getOrderCode: getOrderCode,
            getDatetime: getDatetime,
            initPagination: initPagination
        };

        return UtilityService;

        // 获取项目中所需要用到的订单编号
        function getOrderCode(type) {
            let deferred = $q.defer();

            getDatetime().then(result => {
                deferred.resolve(type + result);
            });

            return deferred.promise;
        }
        // 获取后台时间，年+月+日+时分秒，如20161118192403
        function getDatetime() {
            let deferred = $q.defer();

            let result = moment().format('YYYYMMDDHHmmss');
            deferred.resolve(result);

            return deferred.promise;
        }
        // 初始化分页参数
        function initPagination() {
            let pagination = {
                configs: {
                    // 每页10条
                    per_page: 10,
                    // 当前页
                    page: 1,
                },
                // 总记录条数
                records: 0
            }
            return pagination;
        }
    }
})();