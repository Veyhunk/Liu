(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('EssaysModel', EssaysModel);

    EssaysModel.$inject = ['Restangular'];

    function EssaysModel(Restangular) {

        let essays = Restangular.all('essays.json'),
            essaysClass = Restangular.all('essays_classes.json');

        let EssaysModel = {
            getEssays: getEssays,
            getClasses: getClasses
        };

        return EssaysModel;

        // 获取文章分类列表
        function getClasses(configs = {}) {
            return essaysClass.getList(configs);
        }

        // 获取文章列表
        function getEssays(configs = {}) {
            return essays.getList(configs);
        }
    }
})();