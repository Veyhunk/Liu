(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberChargeCtrl', MemberChargeCtrl);

    MemberChargeCtrl.$inject = ['UtilityService', 'ProfileService'];

    function MemberChargeCtrl(UtilityService, ProfileService) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.currentCharge;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            profile = ProfileService.profile;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/

        // 初始化充值订单对象
        function initChargeOrder() {
            var chargeOrder = {
                "member": null,
                "order_code": "",
                "payment_record": null,
                "store": null,
                "operator": null,
                "type": 1,
                "amount": 0,
                "unit": 1,
                "reward_points": 0,
                "reward_amount": 0,
                "items": null,
                "remark": "备注@string"
            };

            return chargeOrder;
        }

        function initChargeOrderCode(chargeOrder) {
            // 初始化订单编号
            utilityService.getOrderCode('CZ').then(result => {
                chargeOrder.order_code = result;
            });
        }

        function init() {
            vm.currentCharge = initChargeOrder();
            initChargeOrderCode(vm.currentCharge);
        }

        init();
    }
})();