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
            vm.essaysList = essaysModel.getEssays(configs);
        }

        /*----------  内部辅助函数  ----------*/


        function init() {
            vm.pagination = utilityService.initPagination();
            getEssays(vm.pagination.configs);
        }

        function essayView(essay) {
            if (essay) {
                essay.id++;
                essaysModel.updateEssays(vm.essaysList);
                $uibModal.open({
                    templateUrl: 'app/shared/templates/essay.modal.html',
                    size: 'md',
                    controller: function($scope) {
                        $scope.essay = essay;
                        $scope.vm = vm;
                    }
                });
                return;
            } else {
                $uibModal.open({
                    templateUrl: 'app/shared/templates/essay.modal.html',
                    size: 'md',
                    controller: function($scope) {
                        $scope.essay = {};
                        $scope.essay.$edit = true;
                        $scope.vm = vm;
                    }
                });
            }
        }
        vm.essayView = essayView;
        init();
        vm.saveEssay = function(essay) { //添加
            if (essay.id) {
                essaysModel.updateEssays(vm.essaysList);
            } else {
                essay.datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                essay.id = 0;
                let index = (vm.essaysList.length - 1) > 7 ? 7 : vm.essaysList.length - 1;
                debugger
                essay.imageURL = vm.essaysList[index].imageURL;
                let list = [];
                list.push(essay);
                for (let key in vm.essaysList) {
                    list.push(vm.essaysList[key]);
                }
                vm.essaysList = list;
                essaysModel.updateEssays(vm.essaysList);
            }
        };
        vm.deleteEssay = function(essay) { //删除一行的内容
            vm.essaysList.splice(vm.essaysList.indexOf(essay), 1);
            essaysModel.updateEssays(vm.essaysList);
        };

    }

})();