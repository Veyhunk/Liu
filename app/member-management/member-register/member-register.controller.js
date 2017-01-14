(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberRegisterCtrl', MemberRegisterCtrl);

    MemberRegisterCtrl.$inject = ['ProfileService', 'MemberModel'];

    function MemberRegisterCtrl(ProfileService, MemberModel) {
        var vm = this;
        /*----------  界面层资源  ----------*/

        vm.confirmedPaymentPassword = true;

        vm.currentMember = initMember();
        vm.addMember = addMember;
        vm.checkPaymentPassword = checkPaymentPassword;

        /*----------  内部函数逻辑  ----------*/
        /**
         * 添加新会员
         * 
         * @param {Object} member
         */
        function addMember(member) {
            // TODO: 添加新会员
        }

        // 重置表单
        function resetForm() {
            // TODO：重置表单状态、会员对象重新初始化
        }

        // 验证支付密码是否确认
        function checkPaymentPassword() {

            if (vm.confirmPaymentPassword != vm.currentMember.payment_password &&
                vm.currentMember.payment_password !== '') {

                vm.confirmedPaymentPassword = false;
            }
        }
        /*----------  内部辅助函数  ----------*/
        // 初始化会员对象
        function initMember() {

            /**
             * 会员对象
             */
            var member = {
                "store": "",
                // 新增时修改
                "operator": 0,
                "level": 1,
                "code": "",
                "portrait": "",
                "payment_password": "",
                "balance": 0,
                "points": 0,
                "enroll_date": moment().format('YYYY-MM-DD'),
                "expire_date": "2999-12-12",
                "expenditure": 0,
                "state": 1,
                "name": "",
                "identity": "",
                "contact": "",
                "birthday": "1991-06-26",
                "sex": 1,
                "address": "",
                "remark": "",
            }

            return member;
        }

        // 初始化会员等级列表 
        function initLevels() {
            MemberModel.getLevels().then(result => {
                //TODO: 过滤散客
                result = result.plain();
                vm.levelList = result;
            });

        }

        function init() {
            initLevels();
        }

        init();
    }
})();