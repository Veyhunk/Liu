(function() {
    'use strict';

    angular
        .module('app.member_management')
        .factory('MemberModel', MemberModel);

    MemberModel.$inject = ['Restangular'];

    function MemberModel(Restangular) {

        var members = Restangular.all('members.json'),
            levels = Restangular.all('levels.json');

        var MemberModel = {
            getLevels: getLevels,
            getMembers: getMembers
        };

        return MemberModel;

        /**
         * 获取会员列表
         * 
         * @param {any} configs
         * @returns
         */
        function getMembers(configs) {
            return members.getList(configs);
        }
        /**
         * 获取会员等级列表
         */
        function getLevels() {
            return levels.getList();
        }
    }
})();