(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberSearchCtrl', MemberSearchCtrl);

    MemberSearchCtrl.$inject = ['UtilityService', 'MemberModel', '$uibModal'];

    function MemberSearchCtrl(UtilityService, MemberModel, $uibModal) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.showMemberDetail = false;

        vm.current = {
            member: null,
            charge: null,
        };

        vm.search = search;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            memberModel = MemberModel;
        /*----------  内部逻辑函数  ----------*/
        function search(queryString) {
            utilityService.showLoading();
            memberModel.search(queryString).then(result => {
                result = result.plain();
                utilityService.hideLoading();

                if (result.length <= 1) {
                    return selectMember(result);
                }

                $uibModal.open({
                    templateUrl: 'app/member-management/shared/member-search-list.modal.html',
                    size: 'lg',
                    controller: function($scope) {
                        $scope.list = result;
                        $scope.select = function(member) {
                            selectMember(member);
                        }
                    }
                });

            });
        }


        /*----------  内部辅助函数  ----------*/

        function selectMember(member) {
            $scope.$emit('MEMBER_SEARCH_EVENT', member);
        }

        function init() {

        }

        init();
    }
})();