(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberListCtrl', MemberListCtrl);

    MemberListCtrl.$inject = ['MemberModel', 'UtilityService', '$uibModal', 'Restangular', 'MemberService'];

    function MemberListCtrl(MemberModel, UtilityService, $uibModal, Restangular, MemberService) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.pagination;

        // 会员列表
        vm.list;

        vm.current = {
            selectedAll: false
        };
        vm.toggleItems = toggleItems;
        vm.openEditModal = openEditModal;

        /*----------  内部变量  ----------*/
        var memberModel = MemberModel,
            utilityService = UtilityService,
            restangular = Restangular,
            memberService = MemberService;
        /*----------  内部逻辑函数  ----------*/

        function toggleItems(items) {
            utilityService.toggleItems(items, vm.current.selectedAll);
        }
        /**
         * 
         * 打开会员修改窗口
         * @param {any} items
         * @returns
         */
        function openEditModal(items) {
            let selected = utilityService.getSelected(items);
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
                    let member = restangular.copy(selected[0]);
                    $scope.vm = {};

                    $scope.vm.member = member;
                    $scope.vm.confirmPaymentPassword = member.payment_password;
                    $scope.vm.hidePaymentPasswordNotice = true;
                    $scope.vm.edit = edit;
                    $scope.vm.levelList = vm.levelList;
                    $scope.vm.checkPaymentPassword = (password, confirmPassword) => {

                        $scope.vm.hidePaymentPasswordNotice = memberService.checkPassword(password, confirmPassword);
                    }
                }
            });
        }

        /**
         * 修改会员信息
         * 
         * @param {any} item
         */
        function edit(item) {
            utilityService.showLoading();
            memberModel.edit(item).then(result => {
                utilityService.hideLoading();
            });
        }

        /**
         * 根据参数，获取会员列表
         * 
         * @param {object} configs
         */
        function getMembers(configs) {
            var _configs = angular.copy(configs);
            // 关联 operator、level 对象
            _configs['fields'] = 'operator,level';

            memberModel.getMembers(_configs).then(result => {
                vm.list = result;
            });
        }

        /*----------  内部辅助函数  ----------*/




        function init() {
            vm.pagination = utilityService.initPagination();

            getMembers(vm.pagination);

            memberModel.getLevels().then(result => {

                vm.levelList = result;
            });

        }

        init();
    }
})();