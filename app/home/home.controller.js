(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$sce', 'EssaysModel', 'UtilityService'];

    function HomeCtrl($scope, $sce, EssaysModel, UtilityService) {

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

    }

})();