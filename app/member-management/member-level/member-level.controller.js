(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberLevelCtrl', MemberLevelCtrl);

    MemberLevelCtrl.$inject = ['UtilityService', 'MemberModel'];

    function MemberLevelCtrl(UtilityService, MemberModel) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        // 当前新增会员等级
        vm.currentMemberLevel;
        // 当前选中会员等级
        vm.selectedMemberLevel;
        //会员等级列表
        vm.list;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            memberModel = MemberModel;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/

        function initMemberLevel() {
            var memberLevel = {
                "store": null,
                "operator": null,
                "name": "",
                "discount_rate": 0,
                "point_rate": 0,
                "allow_upgrade": 0,
                "upgrade_point": null,
                "next_level": null,
                "remark": "备注@string"
            }

            return memberLevel;
        }

        function initMemberLevelList() {
            memberModel.getLevels().then(result => {
                vm.list = result;
            }, error => {
                //TODO: show error msg
            });
        }

        function init() {
            vm.currentMemberLevel = initMemberLevel();
            initMemberLevelList();
        }

        init();
    }
})();