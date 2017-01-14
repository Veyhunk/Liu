(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('LayoutModel', LayoutModel);

    LayoutModel.$inject = ['Restangular'];

    function LayoutModel(Restangular) {
        var LayoutModel = {
            getPermissions: getPermissions
        };

        return LayoutModel;

        ////////////////


        // 获取用户菜单
        function getPermissions() {
            return Restangular.all('permissions.json').getList();
        }
    }
})();