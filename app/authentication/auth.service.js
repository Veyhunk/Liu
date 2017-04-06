(function() {
    'use strict';

    angular
        .module('app.authentication')
        .service('AuthService', AuthService);

    AuthService.$inject = ['Restangular', '$state', '$q', 'ProfileService', 'localStorageService'];

    function AuthService(Restangular, $state, $q, ProfileService, localStorageService) {
        this.logOut = logOut;
        this.login = login;
        this.getToken = getToken;
        this.initAuthorizationData = initAuthorizationData;

        let profileService = ProfileService;

        let storageName = 'authorizationData';

        let authorizationData = {};

        /**
         * @param {object} user
         * @returns
         */
        function login(user) {
            let deferred = $q.defer();

            Restangular.all('login.json').customGET().then(result => {
                result = result.plain();

                if (!result) return;

                // 抽取授权 token

                authorizationData.access_token = result.access_token;
                authorizationData.expires_in = result.expires_in;

                // 保存 token
                localStorageService.set(storageName, authorizationData);

                // 设置 profile
                profileService.setProfile(result.profile);

                deferred.resolve();
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logOut() {
            profileService.removeProfile();
            localStorageService.remove(storageName);
            $state.go('login');
        }

        function getToken() {
            if (!authorizationData) return;

            return authorizationData.access_token;
        }

        function initAuthorizationData() {
            let result = localStorageService.get(storageName);
            if (!result) return;

            authorizationData = result;
        }
    }
})();