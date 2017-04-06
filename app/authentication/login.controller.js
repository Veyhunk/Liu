(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['AuthService', '$state'];

    function LoginCtrl(AuthService, $state) {
        let vm = this;
        /*----------  界面层资源  ----------*/
        vm.loginData = {
            username: '',
            password: '',
        };

        vm.signIn = signIn;
        /*----------  内部变量  ----------*/

        let authService = AuthService;
        /*----------  内部逻辑函数  ----------*/

        // 登录
        function signIn(user) {

            let _user = angular.copy(user);
            _user.password = CryptoJS.MD5(_user.password);

            authService.login(_user).then(result => {
                $state.go('app.home');
            }, error => {
                if (error.status == 'failure') {
                    return;
                }
            });
        }
        /*----------  内部辅助函数  ----------*/


    }
})();