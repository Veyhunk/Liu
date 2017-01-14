(function() {
    'use strict';

    angular
        .module('app.consumption_management')
        .controller('ConsumptionRecordCtrl', ConsumptionRecordCtrl);

    ConsumptionRecordCtrl.$inject = ['UtilityService', 'ConsumptionModel'];

    function ConsumptionRecordCtrl(UtilityService, ConsumptionModel) {
        /*----------  界面层资源  ----------*/
        let vm = this;
        // 分页信息
        vm.pagination;
        // 消费记录
        vm.list;
        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            consumptionModel = ConsumptionModel;
        /*----------  内部逻辑函数  ----------*/
        function getRecords(configs) {
            consumptionModel.getExpenses(configs).then(result => {

                vm.list = result.plain();;
                vm.pagination.records = result.records;

            }, error => {

            });
        }

        /*----------  内部辅助函数  ----------*/

        function init() {
            vm.pagination = utilityService.initPagination();
            getRecords(vm.pagination.configs);
        }

        init();
    }
})();