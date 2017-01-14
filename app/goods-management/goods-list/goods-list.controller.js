(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsListCtrl', GoodsListCtrl);

    GoodsListCtrl.$inject = ['GoodsModel', 'UtilityService'];

    function GoodsListCtrl(GoodsModel, UtilityService) {
        let vm = this;
        /*----------  界面层资源  ----------*/

        // 分页信息
        vm.pagination;

        // 商品列表
        vm.list;

        /*----------  内部变量  ----------*/

        let goodsModel = GoodsModel,
            utilityService = UtilityService;

        /*----------  内部逻辑函数  ----------*/

        /**
         * 根据参数，获取商品列表
         * 
         * @param {object} configs
         */
        function getGoods(configs) {
            goodsModel.getGoods(configs).then(result => {
                vm.list = result;
            });
        }

        /*----------  内部辅助函数  ----------*/


        function init() {
            vm.pagination = utilityService.initPagination();
            getGoods(vm.pagination.configs);
        }

        init();
    }
})();