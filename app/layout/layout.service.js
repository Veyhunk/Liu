(function() {
    'use strict';

    angular
        .module('app.layout')
        .service('LayoutService', LayoutService);

    LayoutService.$inject = [];

    function LayoutService() {

        this.resolveMenus = resolveMenus;

        ////////////////

        /**
         * @typedef {Object} Menus
         * @property {Array.<Object>} Menus.mainMenus - 主菜单
         * ```
         *   [{
         *       id: 1,
         *       name: '会员管理',
         *       url: '#/member_management',
         *       parent: null,
         *       sort: 1,
         *       children: 
         *       [{
         *           id: 2,
         *           name: '会员登记',
         *           url: '#/member_management/register',
         *           parent: 1,
         *           sort: 1,
         *          }, {
         *           id: 3,
         *           name: '会员列表',
         *           url: '#/member_management/list',
         *           parent: 1,
         *           sort: 2,
         *       }]
         *   }]
         * ```
         * @property {Array.<Object>} Menus.shortMenus - 快捷菜单.
         * ``` 
         * [{
         *           id: 2,
         *           name: '会员登记',
         *           url: '#/member_management/register',
         *           parent: 1,
         *           sort: 2,  // parent sort + child sort
         *          }, {
         *           id: 3,
         *           name: '会员列表',
         *           url: '#/member_management/list',
         *           parent: 1,
         *           sort: 3,
         *       }]
         * ```
         */

        /**
         * 将从后台获取的菜单数据解析成主菜单和快捷菜单
         * @method resolveMenus
         * @param {Array.<Object>} menus
         * @returns {Menus} result 
         */
        function resolveMenus(menus) {
            var _menus = menus;

            var result = {
                mainMenus: [],
                shortcutMenus: []
            };

            var nodes = {},
                rootNodes = {};

            _menus.forEach(item => {

                // 缓存父节点
                if (!item.parent) {
                    rootNodes[item.id] = item;
                    nodes[item.id] = item;
                    return;
                }

                // 添加子节点
                if (nodes[item.parent]) {
                    if (typeof nodes[item.parent].children === 'undefined') {
                        nodes[item.parent].children = [];
                    }

                    nodes[item.parent].children.push(item);
                }

                nodes[item.id] = item;

            });

            // 如果是快捷菜单，要加上父 sort
            // TODO(延平 2016-11-14): 根据需求再作修改
            _.forIn(nodes, (item, key) => {
                if (item.is_shortcut) {
                    var _item = angular.copy(item);
                    _item.sort = _item.sort + nodes[_item.parent].sort;
                    result.shortcutMenus.push(_item);
                }
            });

            _.forIn(rootNodes, (item, value) => {
                result.mainMenus.push(item);
            });


            return result;
        }
    }
})();