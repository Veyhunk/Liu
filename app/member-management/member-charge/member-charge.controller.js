(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberChargeCtrl', MemberChargeCtrl);

    MemberChargeCtrl.$inject = ['$scope', 'UtilityService', 'ProfileService', 'MemberModel', '$uibModal'];

    function MemberChargeCtrl($scope, UtilityService, ProfileService, MemberModel, $uibModal) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.currentCharge;
        // 详细会员信息查看
        vm.showMemberDetail = false;
        vm.current = {
            member: null,
            total: 0
        };

        vm.total = total;
        vm.charge = charge;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            profile = ProfileService.profile,
            memberModel = MemberModel;
        /*----------  内部逻辑函数  ----------*/

        function charge(current) {

        }

        // 计算总充值
        function total(current) {
            current.total = current.charge.reward_amount + current.charge.amount;
        }

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
                "remark": ""
            };

            return chargeOrder;
        }



        function initChargeOrderCode(chargeOrder) {
            // 初始化订单编号
            utilityService.getOrderCode('CZ').then(result => {
                chargeOrder.order_code = result;
            });
        }

        /*----------  监听区块  ----------*/

        $scope.$on('MEMBER_SEARCH_EVENT', (e, value) => {
            e.preventDefault();
            e.stopPropagation();
            vm.current.member = value;
        });

        function init() {
            vm.current.charge = initChargeOrder();
            initChargeOrderCode(vm.current.charge);
        }

        init();
    }
})();