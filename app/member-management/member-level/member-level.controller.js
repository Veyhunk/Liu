(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberLevelCtrl', MemberLevelCtrl);

    MemberLevelCtrl.$inject = ['UtilityService', 'MemberModel', '$uibModal'];

    function MemberLevelCtrl(UtilityService, MemberModel, $uibModal) {
        var vm = this;
        /*----------  界面层资源  ----------*/

        //会员等级列表
        vm.list;

        vm.current = {
            selectedAll: false
        };

        vm.toggleItems = toggleItems;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            memberModel = MemberModel;
        /*----------  内部逻辑函数  ----------*/

        function toggleItems(items) {
            utilityService.toggleItems(items, vm.current.selectedAll);
        }
        /**
         * 
         * 打开会员等级修改窗口
         * @param {Array[Object]} items
         * @returns
         */
        vm.openEditModal = openEditModal;

        function openEditModal(items) {
            let selected = {};
            if (selected.length > 1) {
                $uibModal.open({
                    templateUrl: 'app/shared/views/system-notice.tpl.html',
                    size: 'sm',
                    controller: function($scope) {
                        $scope.title = '系统提示';
                        $scope.content = '同时只能选中一个会员进行编辑！';
                    }
                });
                return;
            }
            $uibModal.open({
                templateUrl: 'app/member-management/member-list/edit.modal.html',
                size: 'lg',
                controller: function($scope) {
                    let member = {};
                    $scope.vm = {};

                    $scope.vm.member = member;
                    $scope.vm.confirmPaymentPassword = member.payment_password;
                    $scope.vm.hidePaymentPasswordNotice = true;
                    $scope.vm.levelList = vm.levelList;
                    $scope.vm.checkPaymentPassword = (password, confirmPassword) => {

                        $scope.vm.hidePaymentPasswordNotice = memberService.checkPassword(password, confirmPassword);
                    }
                }
            });
        }

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