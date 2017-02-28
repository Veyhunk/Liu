(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('EssayManage', EssayManage);

    EssayManage.$inject = ['$scope', '$sce', 'EssaysModel', 'UtilityService', '$uibModal'];

    function EssayManage($scope, $sce, EssaysModel, UtilityService, $uibModal) {

        let vm = this;
        /*----------  界面层资源  ----------*/

        // 分页信息
        vm.pagination;

        // 列表
        vm.essaysList;

        /*----------  内部变量  ----------*/

        let essaysModel = EssaysModel,
            utilityService = UtilityService;

        /*----------  内部逻辑函数  ----------*/

        /**
         * 根据参数，获取列表
         * 
         * @param {object} configs
         */
        function getEssays(configs) {
            essaysModel.getEssays(configs).then(result => {
                vm.essaysList = result;
            });
        }

        /*----------  内部辅助函数  ----------*/


        function init() {
            vm.pagination = utilityService.initPagination();
            getEssays(vm.pagination.configs);
        }

        function essayView(object) {
            let selected = object;
            if (selected) {
                $uibModal.open({
                    templateUrl: 'app/shared/templates/essay.modal.html',
                    size: 'sm',
                    controller: function($scope) {
                        $scope.essay = object;
                        $scope.vm = vm;
                    }
                });
                return;
            }
            $uibModal.open({
                templateUrl: 'app/shared/templates/essay.modal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.essay = {};
                    $scope.vm = vm;
                }
            });
        }
        vm.essayView = essayView;
        init();
        vm.addEssay = function() { //添加
            vm.essaysList.push({ Name: vm.newName, Id: vm.newId, Grade: vm.newGrade });
            vm.newName = '';
            vm.newId = '';
            vm.newGrade = '';
        };
        vm.deleteEssay = function(essay) { //删除一行的内容
            vm.essaysList.splice(vm.essaysList.indexOf(essay), 1);
        };

    }

})();