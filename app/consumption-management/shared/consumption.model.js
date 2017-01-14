(function() {
    'use strict';

    angular
        .module('app.consumption_management')
        .factory('ConsumptionModel', ConsumptionModel);

    ConsumptionModel.$inject = ['Restangular'];

    function ConsumptionModel(Restangular) {

        let expenses = Restangular.all('expenses.json');

        let ConsumptionModel = {
            getExpenses: getExpenses,
        };

        return ConsumptionModel;

        // 获取商品列表
        function getExpenses(configs = {}) {
            return expenses.getList(configs);
        }

    }

})();