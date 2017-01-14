(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsClassCtrl', GoodsClassCtrl);

    GoodsClassCtrl.$inject = ['UtilityService', 'GoodsModel'];

    function GoodsClassCtrl(UtilityService, GoodsModel) {
        let vm = this;
        /*----------  界面层资源  ----------*/
        // 当前选中商品分类
        vm.selectedGoodsClass;
        // 当前新增商品分类
        vm.currentGoodsClass;
        // 商品分类列表
        vm.list;
        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            goodsModel = GoodsModel;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/

        function initGoodsClass() {
            let goodsClass = {
                "store": null,
                "operator": null,
                "name": "",
                "parent": null,
                "remark": ""
            }
            return goodsClass;
        }

        function initGoodsClassList() {
            goodsModel.getClasses().then(result => {
                vm.list = result;
            });
        }

        function init() {
            // 初始化分类对象
            vm.currentGoodsClass = initGoodsClass();
            // 初始化分类列表
            initGoodsClassList();
        }

        init();
    }
})();