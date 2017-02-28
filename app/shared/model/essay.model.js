(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('EssaysModel', EssaysModel);

    EssaysModel.$inject = ['Restangular', 'localStorageService'];

    function EssaysModel(Restangular, localStorageService) {

        let essays = Restangular.all('essays.json'),
            essaysClass = Restangular.all('essays_classes.json');

        let EssaysModel = {
            createEssay: createEssay,
            getEssays: getEssays,
            editEssay: editEssay,
            updateEssays: updateEssays,
            getClasses: getClasses
        };

        return EssaysModel;

        // 获取文章分类列表
        function getClasses(configs = {}) {
            return essaysClass.getList(configs);
        }


        /**
         * 
         * 创建
         * @param {Object} essay
         */
        function createEssay(essay) {
            return essays.post(essay);
        }
        /**
         * 
         * 修改
         * @param {Object} essay
         */
        function editEssay(essay) {
            return essay.put(essay);
        }
        // 获取文章列表
        function getEssays(configs = {}) {
            let result;
            result = localStorageService.get("essays");
            if (result) {
                return result;
            } else {
                essays.getList(configs).then(
                    res => {
                        result = res.plain();
                        localStorageService.set("essays", result);
                        return result;
                    }
                );
            }

        }
        // 获取文章列表
        function updateEssays(essays) {
            // 保存 essays
            return localStorageService.set("essays", essays);
        }
    }
})();