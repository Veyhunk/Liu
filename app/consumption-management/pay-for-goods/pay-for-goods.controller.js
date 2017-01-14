(function() {
    'use strict';

    angular
        .module('app.consumption_management')
        .controller('PayForGoodsCtrl', PayForGoodsCtrl);

    PayForGoodsCtrl.$inject = ['UtilityService'];

    function PayForGoodsCtrl(UtilityService) {
        let vm = this;
        /*----------  界面层资源  ----------*/
        vm.order = {
            code: null
        };
        /*----------  内部变量  ----------*/

        let utilityService = UtilityService;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/
        // 初始化订单编号
        function getCode() {
            utilityService.getOrderCode('GS').then(result => {
                vm.order.code = result;
            });
        }

        function init() {
            getCode();
        }

        init();
    }
})();