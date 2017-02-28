(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$sce', 'EssaysModel', 'UtilityService', '$uibModal'];

    function HomeCtrl($scope, $sce, EssaysModel, UtilityService, $uibModal) {

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

        init();

        function essayView(essay) {
            if (essay) {
                essay.id++;
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
            if (essay.id) {} else {
                essay.datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                essay.id = 0;
                vm.essaysList.push(essay);
            }
        };
        vm.deleteEssay = function(essay) { //删除一行的内容
            vm.essaysList.splice(vm.essaysList.indexOf(essay), 1);
        };

    }

})();