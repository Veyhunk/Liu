(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberRegisterCtrl', MemberRegisterCtrl);

    MemberRegisterCtrl.$inject = ['ProfileService', 'MemberModel', 'MemberService', 'UtilityService'];

    function MemberRegisterCtrl(ProfileService, MemberModel, MemberService, UtilityService) {
        var vm = this;
        /*----------  界面层资源  ----------*/

        vm.hidePaymentPasswordNotice = true;

        vm.current = {
            member: initMember()
        };

        vm.create = create;
        vm.checkPaymentPassword = checkPaymentPassword;
        vm.resetForm = resetForm;

        /*----------  内部变量  ----------*/
        var memberModel = MemberModel,
            utilityService = UtilityService,
            memberService = MemberService;
        /*----------  内部函数逻辑  ----------*/
        /**
         * 添加新会员
         * 
         * @param {Object} member
         */
        function create(member) {
            // TODO: 添加新会员
        }

        // 重置表单
        function resetForm(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            initForm();
        }

        // 验证支付密码是否确认
        function checkPaymentPassword(password, confirmPassword) {

            vm.hidePaymentPasswordNotice = memberService.checkPassword(password, confirmPassword);
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
            memberModel.getLevels().then(result => {
                //TODO: 过滤散客
                result = result.plain();
                vm.current.member.level = result[1].id;
                vm.levelList = result;
            });

        }

        /**
         * 初始化表单
         */
        function initForm() {
            vm.hidePaymentPasswordNotice = true;
            vm.confirmPaymentPassword = '';
            vm.current.member = initMember();
            vm.current.member.level = vm.levelList[1].id;
        }

        function init() {
            initLevels();
        }

        init();
    }
})();