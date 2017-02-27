(function() {
    'use strict';

    angular
        .module('app.member_management')
        .factory('MemberService', MemberService);

    MemberService.inject = [];

    function MemberService() {
        var MemberService = {
            checkPassword: checkPassword
        };

        return MemberService;

        ////////////////
        function checkPassword(password, confirmPassword) {
            if (password != confirmPassword &&
                password !== '') {
                return false;
            } else {
                return true;
            }
        }
    }
})();