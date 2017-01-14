(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsRegisterCtrl', GoodsRegisterCtrl);

    GoodsRegisterCtrl.$inject = ['GoodsModel', 'DictionaryService', '$filter', 'UtilityService'];

    function GoodsRegisterCtrl(GoodsModel, DictionaryService, $filter, UtilityService) {
        let vm = this;
        /*----------  界面层资源  ----------*/
        // 商品单位列表
        vm.units;
        // 商品分类列表
        vm.classes;
        // 商品类型列表
        vm.types;

        vm.currentGoods = initGoods();


        vm.addGoods = addGoods;
        vm.resolveCapitalChinese = resolveCapitalChinese;

        /*----------  内部变量  ----------*/
        let goodsModel = GoodsModel,
            utilityService = UtilityService,
            dictionaryService = DictionaryService;
        /*----------  内部逻辑函数  ----------*/
        function addGoods(goods) {
            //TODO: 添加新商品
        }

        /*----------  内部辅助函数  ----------*/
        // 中文首字母
        function resolveCapitalChinese(chinese) {
            vm.currentGoods.short_name = $filter('capitalChinese')(chinese);
        }
        // 初始化商品单位
        function initGoodsUnits() {
            vm.units = _.toArray(dictionaryService.get('goods.units'));
        }

        // 初始化商品类型
        function initGoodsTypes() {
            let types = dictionaryService.get('goods.types');

            let key,
                result = [];

            for (key in types) {
                let tmp = {};
                tmp.id = key;
                tmp.name = types[key];
                result.push(tmp);
            }

            vm.types = result;
            vm.currentGoods.type = result[0].id;
        }

        // 初始化商品分类
        function initGoodsClass() {
            goodsModel.getClasses().then(result => {
                result = result.plain();
                vm.classes = result;
            });
        }
        // 初始化商品对象
        function initGoods() {
            let goods = {
                "operator": 1,
                "store": 1,
                "class": 1,
                "code": "",
                "name": "",
                "portrait": "",
                "short_name": "",
                "unit": "",
                "type": 1,
                "exchange_points": "",
                "discount_rate": "",
                "lowest_discount_rate": "",
                "inventory": 0,
                "reward_points": 0,
                "entry_price": 0,
                "sale_price": 0,
                "remark": ""
            }
            return goods;
        }

        function init() {
            // 初始化商品单位
            initGoodsUnits();
            // 初始化商品类型列表
            initGoodsTypes();
            // 初始化商品分类列表
            initGoodsClass();
            // 初始化商品编码
            utilityService.getDatetime().then(result => {
                vm.currentGoods.code = result;
            });
        }

        init();
    }
})();