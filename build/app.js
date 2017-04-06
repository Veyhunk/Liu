// angular bootstrap
$(function() {

    // moment.js default language
    moment.locale('zh-cn')

    angular.bootstrap(document, ['app']);


});


(function($) {
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"],

    };
}(jQuery));
(function() {
    'use strict';

    angular.module('app', [
        // 第三方插件
        'restangular',
        'ui.bootstrap',
        'ngAnimate',
        'LocalStorageModule',
        // 布局模块
        'app.layout',
        // 系统配置模块
        'app.configs',
        // 授权登录验证模块
        'app.authentication',
        // 共享模块
        'app.shared',
        'app.constants',
        // 业务逻辑模块
        'app.page_template',
        'app.admin'
    ]);
})();
(function() {
    'use strict';

    angular.module('app.admin', ['ui.router'])
        .config(pageTemplateConfig);

    pageTemplateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function pageTemplateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.admin', {
                name: '系统管理',
                url: '/admin',
                views: {
                    'content@app': {
                        templateUrl: 'app/admin/index.html'
                    }
                }
            });

    }

})();
(function() {
    'use strict';

    angular.module('app.authentication', ['ui.router'])
        .config(authenticationConfig);

    authenticationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function authenticationConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: 'app/authentication/login.html',
                    }
                },
                resolve: {
                    scripts: function(LazyScript) {
                        return LazyScript.register([
                            'assets/lib/md5/md5.js'
                        ]);
                    }
                },
            });

    }

})();
(function() {
    'use strict';

    angular.module('app.layout', ['ui.router'])
        .config(LayoutConfig);

    LayoutConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function LayoutConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/layout/layout.html',
                    }
                }
            }).state('app.home', {
                url: '/home',
                views: {
                    'content@app': {
                        templateUrl: 'app/home/home.html',
                    }
                }
            });


        $urlRouterProvider.otherwise(function($injector, $location) {
            $location.path('/home');
        });



    }

})();
(function() {
    'use strict';

    angular.module('app.page_template', ['ui.router'])
        .config(pageTemplateConfig);

    pageTemplateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function pageTemplateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.page_template', {
                name: '系统管理',
                url: '/page_template',
                abstract: true,
            })
            .state('app.page_template.form', {
                name: '表单',
                url: '/form',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/form/form.html'
                    }
                }
            })
            .state('app.page_template.modal', {
                name: '模态框',
                url: '/modal',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/modal/modal.html'
                    }
                }
            })
            .state('app.page_template.table', {
                name: '表格',
                url: '/table',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/table/table.html'
                    }
                }
            })
            .state('app.page_template.text', {
                name: '文本',
                url: '/text',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/text/text.html'
                    }
                }
            })
            .state('app.page_template.tree', {
                name: '树',
                url: '/tree',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/tree/tree.html'
                    }
                }
            })
            .state('app.page_template.full_view', {
                name: '配色',
                url: '/full_view',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/full-view/full-view.html'
                    }
                }
            }).state('app.page_template.palette', {
                name: '调色板',
                url: '/palette',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/palette/palette.html'
                    }
                }
            }).state('app.page_template.plugin_test', {
                name: ' 插件测试',
                url: '/plugin_test',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/plugin-test/plugin-test.html'
                    }
                }
            });

    }

})();
(function() {
    'use strict';

    angular.module('app.shared', [

    ]);
})();
(function(angular) {
    'use strict';

    angular
        .module('app.configs', [])
        .config(['RestangularProvider', function(RestangularProvider) {

            RestangularProvider.setBaseUrl('API');

            RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

            RestangularProvider.addResponseInterceptor(function(result, operation, what, url, response, deferred) {
                var extractedData = result;
                // .. to look for getList operations
                if (operation === "getList" && angular.isDefined(result.data)) {
                    // .. and handle the data and record data
                    extractedData = result.data;

                    if (angular.isDefined(result.records)) {
                        extractedData.records = result.records;
                    }
                }
                return extractedData;
            });

        }])
        .run(['ProfileService', 'AuthService', function(ProfileService, AuthService) {
            ProfileService.initProfile();
            AuthService.initAuthorizationData();
        }]);


})(angular);
(function() {
    'use strict';

    angular
        .module('app.constants', [])
        .constant('Version', '1.0.0')
        .constant('LOADING_EVENT', {
            show: 'show module loading',
            hide: 'hide module loading'
        });
})();
(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('EssayManage', EssayManage);

    EssayManage.$inject = ['$scope', '$sce', 'EssaysModel', 'UtilityService', '$uibModal', 'localStorageService'];

    function EssayManage($scope, $sce, EssaysModel, UtilityService, $uibModal, localStorageService) {

        let vm = this;
        /*----------  界面层资源  ----------*/

        // 分页信息
        vm.pagination;

        // 列表
        vm.essaysList;

        /*----------  内部变量  ----------*/

        let essaysModel = EssaysModel,
            utilityService = UtilityService;

        /*----------  内部逻辑函数  ----------*/

        /**
         * 根据参数，获取文章列表
         * 
         * @param {object} configs 配置
         */
        function getEssays(configs) {
            // 通过页面配置 从模型层获取数据
            vm.essaysList = essaysModel.getEssays(configs);
        }

        /**
         * 根据参数，获取文章列表
         * 
         * @param {object} configs 配置
         */
        vm.resetEssays = function() {
            // 通过页面配置 从模型层获取数据
            essaysModel.resetEssays(vm.pagination.configs).then(
                res => {
                    let result = res.plain();
                    localStorageService.set("essays", result);
                    vm.essaysList = result;
                }
            );
        }

        /*----------  内部辅助函数  ----------*/


        /**
         * 页面数据初始化
         */
        function init() {
            // 初始化分页配置
            vm.pagination = utilityService.initPagination();
            // 获取文章
            getEssays(vm.pagination.configs);
        }
        // 调用后台数据初始化
        init();

        /**
         * 激活文章弹窗的方法
         * 
         * @param {essay object} essay 文章的对象，可以为空
         */
        vm.essayView = function(essay) {
                // 检查传入的文章是否存在
                if (essay) {
                    // 如果存在，则是查看文章
                    //    浏览量+1
                    essay.id++;
                    // 关闭编辑状态
                    essay.$edit = false;
                    //    浏览量同步到服务器
                    essaysModel.updateEssays(vm.essaysList);
                    $uibModal.open({
                        templateUrl: 'app/shared/templates/essay.modal.html',
                        size: 'md',
                        controller: function($scope) {
                            // 绑定选中的文章
                            $scope.essay = essay;
                            // 绑定VM服务
                            $scope.vm = vm;
                        }
                    });
                    return;
                } else {
                    // 如果文章为空，则激活新建
                    $uibModal.open({
                        templateUrl: 'app/shared/templates/essay.modal.html',
                        size: 'md',
                        controller: function($scope) {
                            // 新建文章
                            $scope.essay = {};
                            // 激活编辑状态
                            $scope.essay.$edit = true;
                            // 绑定VM服务
                            $scope.vm = vm;
                        }
                    });
                }
            }
            /**
             * 保存文章的方法
             * 
             * @param {essay object} essay 文章的对象，不可以为空
             */
        vm.saveEssay = function(essay) { //添加
            // 如果ID存在，则是修改，否则是新建
            if (essay.id) {
                // 修改
                // 更新服务器数据
                essaysModel.updateEssays(vm.essaysList);
            } else {
                // 新建
                essay.datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                essay.id = 0;
                let index = (vm.essaysList.length - 1) > 7 ? 7 : vm.essaysList.length - 1;
                essay.imageURL = vm.essaysList[index].imageURL;
                let list = [];
                list.push(essay);
                for (let key in vm.essaysList) {
                    list.push(vm.essaysList[key]);
                }
                vm.essaysList = list;
                // 更新服务器数据
                essaysModel.updateEssays(vm.essaysList);
            }
        };

        /**
         * 删除文章的方法
         * 
         * @param {essay object} essay 文章的对象，不可以为空
         */
        vm.deleteEssay = function(essay) {
            //删除传入的 文章的对象
            vm.essaysList.splice(vm.essaysList.indexOf(essay), 1);
            // 更新服务器数据
            essaysModel.updateEssays(vm.essaysList);
        };

    }

})();
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
(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['localStorageService'];

    function ProfileService(localStorageService) {

        let profile = {};

        let storageName = 'profile';

        let ProfileService = {
            getProfile: getProfile,
            setProfile: setProfile,
            removeProfile: removeProfile,
            getRole: getRole,
            getUser: getUser,
            getPermissions: getPermissions,
            initProfile: initProfile,
        };

        return ProfileService;

        function getRole() {
            return profile.role;
        }

        function getUser() {
            return profile.user;
        }

        function getPermissions() {
            return profile.permissions;
        }

        function setProfile(newProfile) {
            profile = newProfile;

            localStorageService.set(storageName, profile);
        }

        function getProfile() {
            return profile;
        }

        function removeProfile() {
            profile = {};
            localStorageService.remove(storageName);
        }

        function initProfile() {
            let result = localStorageService.get(storageName);
            if (result) {
                profile = result;
            }
        }

    }
})();
(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$sce', 'EssaysModel', 'UtilityService', '$uibModal', 'CarouselModel'];

    function HomeCtrl($scope, $sce, EssaysModel, UtilityService, $uibModal, CarouselModel) {

        let vm = this;
        /*----------  界面层资源  ----------*/

        // 分页信息
        vm.pagination;

        // 列表
        vm.essaysList;

        /*----------  内部变量  ----------*/

        let essaysModel = EssaysModel,
            carouselModel = CarouselModel,
            utilityService = UtilityService;

        /*----------  内部逻辑函数  ----------*/

        /**
         * 根据参数，获取文章列表
         * 
         * @param {object} configs 配置
         */
        function getEssays(configs) {
            // 通过页面配置 从模型层获取数据 模型层连接API
            vm.essaysList = essaysModel.getEssays(configs);
        }
        /**
         * 根据参数，获取文章列表
         * 
         * @param {object} configs 配置
         */
        function getSlides(configs) {
            // 通过页面配置 从模型层获取数据
            vm.slides = carouselModel.getCarousel(configs).then(
                res => {
                    vm.slides = res.plain();
                }
            );
        }

        /*----------  内部辅助函数  ----------*/


        /**
         * 页面数据初始化
         */
        function init() {
            // 初始化分页配置
            vm.pagination = utilityService.initPagination();
            // 获取文章
            getEssays(vm.pagination.configs);
            // 获取轮播图
            getSlides(vm.pagination.configs);
        }
        // 调用后台数据初始化 
        init();

        /**
         * 激活轮播图弹窗的方法
         * 
         * @param {pid int} pid: 当前选中的图片的id 
         */
        vm.picView = function(pid) {
            $uibModal.open({
                templateUrl: 'app/shared/templates/carousel.modal.html',
                size: 'lg',
                backdrop: 'true',
                controller: function($scope) {
                    // 绑定选中的轮播图
                    var slides_1 = vm.slides;

                    $scope.myInterval = 3000;
                    $scope.noWrapSlides = false;
                    $scope.noTransition = true;
                    $scope.active = pid;
                    var slides = $scope.slides = [];

                    slides_1.forEach(function(slide) {

                        slides.push({
                            imageURL: slide.imageURL,
                            title: slide.title,
                            description: slide.description,
                            id: slide.id
                        });
                    });
                }
            });
            return;
        }

        /**
         * 激活文章弹窗的方法
         * 
         * @param {essay object} essay 文章的对象，可以为空
         */
        vm.essayView = function(essay) {
                // 检查传入的文章是否存在
                if (essay) {
                    // 如果存在，则是查看文章
                    //    浏览量+1
                    essay.id++;
                    // 关闭编辑状态
                    essay.$edit = false;
                    //    浏览量同步到服务器
                    essaysModel.updateEssays(vm.essaysList);
                    $uibModal.open({
                        templateUrl: 'app/shared/templates/essay.modal.html',
                        size: 'md',
                        controller: function($scope) {
                            // 绑定选中的文章
                            $scope.essay = essay;
                            // 绑定VM服务
                            $scope.vm = vm;
                        }
                    });
                    return;
                } else {
                    // 如果文章为空，则激活新建
                    $uibModal.open({
                        templateUrl: 'app/shared/templates/essay.modal.html',
                        size: 'md',
                        controller: function($scope) {
                            // 新建文章
                            $scope.essay = {};
                            // 激活编辑状态
                            $scope.essay.$edit = true;
                            // 绑定VM服务
                            $scope.vm = vm;
                        }
                    });
                }
            }
            /**
             * 保存文章的方法
             * 
             * @param {essay object} essay 文章的对象，不可以为空
             */
        vm.saveEssay = function(essay) { //添加
            // 如果ID存在，则是修改，否则是新建
            if (essay.id) {
                // 修改
                // 更新服务器数据
                essaysModel.updateEssays(vm.essaysList);
            } else {
                // 新建
                essay.datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                essay.id = 0;
                let index = (vm.essaysList.length - 1) > 7 ? 7 : vm.essaysList.length - 1;
                essay.imageURL = vm.essaysList[index].imageURL;
                let list = [];
                list.push(essay);
                for (let key in vm.essaysList) {
                    list.push(vm.essaysList[key]);
                }
                vm.essaysList = list;
                // 更新服务器数据
                essaysModel.updateEssays(vm.essaysList);
            }
        };

        /**
         * 删除文章的方法
         * 
         * @param {essay object} essay 文章的对象，不可以为空
         */
        vm.deleteEssay = function(essay) {
            //删除传入的 文章的对象
            vm.essaysList.splice(vm.essaysList.indexOf(essay), 1);
            // 更新服务器数据
            essaysModel.updateEssays(vm.essaysList);
        };

    }

})();
(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutCtrl', LayoutCtrl);

    LayoutCtrl.$inject = [
        '$scope', '$state', 'LayoutModel', 'LayoutService', 'DictionaryService', 'ProfileService',
        'AuthService', 'Version', 'LOADING_EVENT', '$timeout'
    ];

    function LayoutCtrl($scope, $state, LayoutModel, LayoutService, DictionaryService, ProfileService,
        AuthService, Version, LOADING_EVENT, $timeout) {
        /*----------  界面层资源  ----------*/
        var vm = this;

        // 快捷菜单切换状态
        vm.isShortcutMenusMini = false;

        vm.state = $state;
        vm.logOut = AuthService.logOut;
        vm.Version = Version;

        // 用户信息
        vm.user = null;
        // 系统主菜单
        vm.mainMenus = null;
        // 快捷菜单
        vm.shortcutMenus = null;
        // loading
        vm.contentLoading = false;

        /*----------  内部变量  ----------*/
        var layoutModel = LayoutModel,
            layoutService = LayoutService,
            profileService = ProfileService;


        /*----------  逻辑代码区块  ----------*/

        /*----------  辅助函数区块  ----------*/

        function initMainMenus(permissions) {

            var menus = layoutService.resolveMenus(permissions);

            vm.mainMenus = menus.mainMenus;
            vm.shortcutMenus = menus.shortcutMenus;

        }

        function hideLoading() {
            vm.contentLoading = false;
        }

        function showLoading() {
            vm.contentLoading = true;
        }
        /*----------  监听区块  ----------*/

        // MARK：这是一个好方法么？
        $scope.$on(LOADING_EVENT.show, e => {

            e.stopPropagation();
            e.preventDefault();
            showLoading();
        });

        $scope.$on(LOADING_EVENT.hide, e => {
            e.stopPropagation();
            e.preventDefault();
            hideLoading();
        });

        function init() {
            // 初始化菜单
            var permissions = profileService.getPermissions();
            initMainMenus(permissions);

            // 初始化用户信息
            vm.user = profileService.getUser();
            showLoading();

            $timeout(() => {
                hideLoading();
            }, 2000);
        }


        init();
    }
})();
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
         * @property {Array.<Object>} Menus.shortMenus - 快捷菜单.
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
(function() {
    'use strict';

    angular
        .module('app.page_template')
        .controller('PluginTestCtrl', PluginTestCtrl);

    PluginTestCtrl.$inject = ['$scope', 'DictionaryService'];

    function PluginTestCtrl($scope, DictionaryService) {
        var vm = this;

        //商品测试单位
        vm.goodsUnits = _.toArray(DictionaryService.get('goods.units'));

        vm.treeData = [{
                "id": 1,
                "title": "node1",
                "nodes": [{
                        "id": 11,
                        "title": "node1.1",
                        "nodes": [{
                            "id": 111,
                            "title": "node1.1.1",
                            "nodes": []
                        }]
                    },
                    {
                        "id": 12,
                        "title": "node1.2",
                        "nodes": []
                    }
                ]
            },
            {
                "id": 2,
                "title": "node2",
                "nodrop": true,
                "nodes": [{
                        "id": 21,
                        "title": "node2.1",
                        "nodes": []
                    },
                    {
                        "id": 22,
                        "title": "node2.2",
                        "nodes": []
                    }
                ]
            },
            {
                "id": 3,
                "title": "node3",
                "nodes": [{
                    "id": 31,
                    "title": "node3.1",
                    "nodes": []
                }]
            }
        ];

        vm.showLoading = function() {
            // $scope.$emit(LOADING_EVENT.show);
        }

    }
})();
(function() {
    'use strict';

    angular
        .module('app.page_template')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$sce'];

    function FormController($scope, $sce) {
        $scope.students = [
            { Name: '小李', Id: '201401201', Grade: '计算机技术' },
            { Name: '李磊', Id: '201401202', Grade: '计算机技术' },
            { Name: '夏津', Id: '201401203', Grade: '计算机技术' },
            { Name: '杭州', Id: '201401204', Grade: '计算机技术' }
        ];
        $scope.addStudent = function() { //添加学生函数
            $scope.students.push({ Name: $scope.newName, Id: $scope.newId, Grade: $scope.newGrade });
            $scope.newName = '';
            $scope.newId = '';
            $scope.newGrade = '';
        };
        $scope.deleteStudent = function(student) { //删除一行的内容
            $scope.students.splice($scope.students.indexOf(student), 1);
        };

    }

})();
(function() {
    'use strict';

    angular
        .module('app.shared')
        .directive('datetimePicker', datetimePicker);

    datetimePicker.$inject = [];
    /**
     *  时间选择控件
     * 
     *      <div class="input-group date" datetime-picker data-date-format="dd-mm-yyyy" datetime-picker-options="{ pickerPosition: 'bottom-left'}">
                <input type="text" class="form-control" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
     * 
     * 
     */
    function datetimePicker() {

        var datetimePicker = {
            link: link,
            restrict: 'A',
            scope: {
                datetimePickerOptions: '='
            }
        };
        return datetimePicker;

        function link(scope, element, attrs) {
            var options = {};
            if (scope.datetimePickerOptions) {
                options = scope.datetimePickerOptions;
            }
            options = angular.extend({
                autoclose: true,
                language: 'zh-CN',
                pickerPosition: 'bottom-right'
            }, options);

            element.datetimepicker('remove');
            element.datetimepicker(options);
        }
    }
})();
(function(angular) {
    'use strict';

    angular
        .module('app.shared')
        .directive('loading', loading);

    /**
     * @class loading
     * ## 使用说明
     *      <div loading="vm.loading" ><div>被包裹的内容</div></div>
     * 
     * 注：外层元素必须要有高度和宽度，这样 Loading 才能自适应
     */
    loading.$inject = [];

    /* @ngInject */
    function loading() {

        var loading = {

            link: link,
            restrict: 'A',
            scope: {
                /**
                 * 设置Loading状态，true显示，false隐藏
                 * @property {Boolean}   
                 */
                loading: '=',
            }
        };
        return loading;

        function link(scope, element, attrs) {

            let options = {
                /**
                 * @cfg 选择显示的模板
                 */
                template: 1,

            };

            let loading = angular.element('<div></div>');

            loading.append(loadingTemplates[options.template]);

            loading.addClass('loading');

            element.css('position', 'relative');
            element.append(loading);

            scope.$watch('loading', function(newVal, oldVal) {
                if (angular.isDefined(newVal)) {
                    if (newVal) {
                        loading.show();
                    } else {
                        loading.hide();
                    }
                }
            });

        }
    }

    var loadingTemplates = {
        1: '<div class="loading-container"><div class="loader-container"><span class="loader loader-quart"></span><p>加载中...</p></div></div>',

    }

})(angular);
(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('CarouselModel', CarouselModel);

    CarouselModel.$inject = ['Restangular', 'localStorageService'];

    function CarouselModel(Restangular, localStorageService) {

        let carousel = Restangular.all('carousel.json');

        let CarouselModel = {
            getCarousel: getCarousel
        };

        return CarouselModel;

        // 获取列表
        function getCarousel(configs) {
            // let result;
            // carousel.getList(configs).then(
            //     res => {
            //         result = res.plain();
            //         debugger
            //         return result;
            //     }
            // );

            return carousel.getList(configs);
        }
    }
})();
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
            resetEssays: resetEssays,
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
        function resetEssays(configs = {}) {
            return essays.getList(configs);

        }
        //更新文章列表
        function updateEssays(essays) {
            // 保存 essays
            return localStorageService.set("essays", essays);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('DictionaryService', DictionaryService);

    DictionaryService.$inject = [];
    /**
     * 对应后台字典表
     * 
     * @returns
     */
    function DictionaryService() {

        var dictionaries = {
            //商品类型
            'goods.types': {
                1: '实物类',
                2: '服务类',
                3: '计次类',
                4: '计时类'
            },
            'sex': {
                0: '女士',
                1: '男士'
            },
            'member.states': {
                0: '锁定',
                1: '正常',
                2: '挂失'
            },
            // 充值类型
            'member_charge.types': {
                1: '会员充值',
                2: '会员充次',
                3: '会员充时',
                4: '办卡充值'
            },
            // 消费类型
            'consumption.types': {
                1: '商品消费',
                2: '快速消费',
                3: '计次消费',
                4: '计时消费',
                5: '积分兑换'
            },
            // 出入库类型
            'inventory': {
                1: '商品入库',
                2: '销售出库',
                3: '编辑入库',
                4: '编辑出库'
            },
            'payment.types': {
                1: '余额',
                2: '现金',
                3: '网银',
                4: '支付宝',
                5: '微信'
            },
            'http_methods': {
                1: 'get',
                2: 'post',
                3: 'patch',
                4: 'put',
                5: 'delete'
            },
            'goods.units': {
                1: '包',
                2: '条',
                3: '瓶',
                4: '箱',
                5: '个',
                6: '次',
                7: '件',
                8: '台',
                9: '套',
                10: '组',
                11: '块'
            },
            'charge.units': {
                1: '元',
                2: '次',
                3: '分钟',
                4: '小时',
                5: '天'
            }
        };

        var DictionaryService = {
            get: get,
            resolve: resolve
        };

        return DictionaryService;

        ////////////////

        /**
         * 获取相应类型的字典表
         * 
         * @param {string} type
         * @returns
         * 
         * usage:
         * var sex = DictionaryService.get('sex');
         * console.info(sex[0]) // 女士
         */
        function get(type) {
            if (angular.isDefined(dictionaries[type])) {
                return dictionaries[type];
            }
        }

        /**
         * 根据所传类型和数值解析
         * 
         * @param {string} type
         * @param {number} value
         * @returns
         * 
         * usage:
         * var sex = DictionaryService.resolve('sex',0);
         * console.info(sex) // 女士
         */
        function resolve(type, value) {
            if (angular.isUndefined(dictionaries[type])) {
                return value;
            }
            return dictionaries[type][value];
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('LazyScript', LazyScript);

    LazyScript.$inject = ['$q'];

    function LazyScript($q) {
        var cache = {};

        function isPending(scriptName) {
            return (cache.hasOwnProperty(scriptName) && cache[scriptName].promise && cache[scriptName].promise.$$state.pending)
        }

        function isRegistered(scriptName) {
            return cache.hasOwnProperty(scriptName)
        }

        function loadScript(scriptName) {
            if (!cache[scriptName]) {
                cache[scriptName] = $q.defer();
                var el = document.createElement('script');
                el.onload = function(script) {
                    console.log('script is lazy loaded:', scriptName)
                    cache[scriptName].resolve(scriptName);
                };
                el.src = scriptName;
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(el, x);

            }
            return cache[scriptName].promise;

        }

        function register(scriptName) {
            if (isPending(scriptName)) {
                return cache[scriptName].promise;
            }
            if (isRegistered(scriptName)) {
                return $q.resolve(scriptName);
            } else {
                var dfd = $q.defer();

                loadScript(scriptName).then(function() {
                    dfd.resolve(scriptName);
                });

                return dfd.promise;

            }
        }
        return {
            register: function(scripts) {

                var dfd = $q.defer();
                var promises = [];
                if (angular.isString(scripts))
                    scripts = [scripts];

                angular.forEach(scripts, function(script) {
                    promises.push(register(script));
                })

                $q.all(promises).then(function(resolves) {
                    dfd.resolve(resolves);
                })
                return dfd.promise;
            }
        };
    }
})();
(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('UtilityService', UtilityService);

    UtilityService.$inject = ['$q'];

    function UtilityService($q) {
        let UtilityService = {
            getOrderCode: getOrderCode,
            getDatetime: getDatetime,
            initPagination: initPagination
        };

        return UtilityService;

        // 获取项目中所需要用到的订单编号
        function getOrderCode(type) {
            let deferred = $q.defer();

            getDatetime().then(result => {
                deferred.resolve(type + result);
            });

            return deferred.promise;
        }
        // 获取后台时间，年+月+日+时分秒，如20161118192403
        function getDatetime() {
            let deferred = $q.defer();

            let result = moment().format('YYYYMMDDHHmmss');
            deferred.resolve(result);

            return deferred.promise;
        }
        // 初始化分页参数
        function initPagination() {
            let pagination = {
                configs: {
                    // 每页8条
                    per_page: 8,
                    // 当前页
                    page: 1,
                },
                // 总记录条数
                records: 0
            }
            return pagination;
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.shared')
        .filter('capitalChinese', capitalChinese);

    function capitalChinese() {
        var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";

        //此处收录了375个多音字,数据来自于http://www.51window.net/page/pinyin
        var oMultiDiff = { "19969": "DZ", "19975": "WM", "19988": "QJ", "20048": "YL", "20056": "SC", "20060": "NM", "20094": "QG", "20127": "QJ", "20167": "QC", "20193": "YG", "20250": "KH", "20256": "ZC", "20282": "SC", "20285": "QJG", "20291": "TD", "20314": "YD", "20340": "NE", "20375": "TD", "20389": "YJ", "20391": "CZ", "20415": "PB", "20446": "YS", "20447": "SQ", "20504": "TC", "20608": "KG", "20854": "QJ", "20857": "ZC", "20911": "PF", "20504": "TC", "20608": "KG", "20854": "QJ", "20857": "ZC", "20911": "PF", "20985": "AW", "21032": "PB", "21048": "XQ", "21049": "SC", "21089": "YS", "21119": "JC", "21242": "SB", "21273": "SC", "21305": "YP", "21306": "QO", "21330": "ZC", "21333": "SDC", "21345": "QK", "21378": "CA", "21397": "SC", "21414": "XS", "21442": "SC", "21477": "JG", "21480": "TD", "21484": "ZS", "21494": "YX", "21505": "YX", "21512": "HG", "21523": "XH", "21537": "PB", "21542": "PF", "21549": "KH", "21571": "E", "21574": "DA", "21588": "TD", "21589": "O", "21618": "ZC", "21621": "KHA", "21632": "ZJ", "21654": "KG", "21679": "LKG", "21683": "KH", "21710": "A", "21719": "YH", "21734": "WOE", "21769": "A", "21780": "WN", "21804": "XH", "21834": "A", "21899": "ZD", "21903": "RN", "21908": "WO", "21939": "ZC", "21956": "SA", "21964": "YA", "21970": "TD", "22003": "A", "22031": "JG", "22040": "XS", "22060": "ZC", "22066": "ZC", "22079": "MH", "22129": "XJ", "22179": "XA", "22237": "NJ", "22244": "TD", "22280": "JQ", "22300": "YH", "22313": "XW", "22331": "YQ", "22343": "YJ", "22351": "PH", "22395": "DC", "22412": "TD", "22484": "PB", "22500": "PB", "22534": "ZD", "22549": "DH", "22561": "PB", "22612": "TD", "22771": "KQ", "22831": "HB", "22841": "JG", "22855": "QJ", "22865": "XQ", "23013": "ML", "23081": "WM", "23487": "SX", "23558": "QJ", "23561": "YW", "23586": "YW", "23614": "YW", "23615": "SN", "23631": "PB", "23646": "ZS", "23663": "ZT", "23673": "YG", "23762": "TD", "23769": "ZS", "23780": "QJ", "23884": "QK", "24055": "XH", "24113": "DC", "24162": "ZC", "24191": "GA", "24273": "QJ", "24324": "NL", "24377": "TD", "24378": "QJ", "24439": "PF", "24554": "ZS", "24683": "TD", "24694": "WE", "24733": "LK", "24925": "TN", "25094": "ZG", "25100": "XQ", "25103": "XH", "25153": "PB", "25170": "PB", "25179": "KG", "25203": "PB", "25240": "ZS", "25282": "FB", "25303": "NA", "25324": "KG", "25341": "ZY", "25373": "WZ", "25375": "XJ", "25384": "A", "25457": "A", "25528": "SD", "25530": "SC", "25552": "TD", "25774": "ZC", "25874": "ZC", "26044": "YW", "26080": "WM", "26292": "PB", "26333": "PB", "26355": "ZY", "26366": "CZ", "26397": "ZC", "26399": "QJ", "26415": "ZS", "26451": "SB", "26526": "ZC", "26552": "JG", "26561": "TD", "26588": "JG", "26597": "CZ", "26629": "ZS", "26638": "YL", "26646": "XQ", "26653": "KG", "26657": "XJ", "26727": "HG", "26894": "ZC", "26937": "ZS", "26946": "ZC", "26999": "KJ", "27099": "KJ", "27449": "YQ", "27481": "XS", "27542": "ZS", "27663": "ZS", "27748": "TS", "27784": "SC", "27788": "ZD", "27795": "TD", "27812": "O", "27850": "PB", "27852": "MB", "27895": "SL", "27898": "PL", "27973": "QJ", "27981": "KH", "27986": "HX", "27994": "XJ", "28044": "YC", "28065": "WG", "28177": "SM", "28267": "QJ", "28291": "KH", "28337": "ZQ", "28463": "TL", "28548": "DC", "28601": "TD", "28689": "PB", "28805": "JG", "28820": "QG", "28846": "PB", "28952": "TD", "28975": "ZC", "29100": "A", "29325": "QJ", "29575": "SL", "29602": "FB", "30010": "TD", "30044": "CX", "30058": "PF", "30091": "YSP", "30111": "YN", "30229": "XJ", "30427": "SC", "30465": "SX", "30631": "YQ", "30655": "QJ", "30684": "QJG", "30707": "SD", "30729": "XH", "30796": "LG", "30917": "PB", "31074": "NM", "31085": "JZ", "31109": "SC", "31181": "ZC", "31192": "MLB", "31293": "JQ", "31400": "YX", "31584": "YJ", "31896": "ZN", "31909": "ZY", "31995": "XJ", "32321": "PF", "32327": "ZY", "32418": "HG", "32420": "XQ", "32421": "HG", "32438": "LG", "32473": "GJ", "32488": "TD", "32521": "QJ", "32527": "PB", "32562": "ZSQ", "32564": "JZ", "32735": "ZD", "32793": "PB", "33071": "PF", "33098": "XL", "33100": "YA", "33152": "PB", "33261": "CX", "33324": "BP", "33333": "TD", "33406": "YA", "33426": "WM", "33432": "PB", "33445": "JG", "33486": "ZN", "33493": "TS", "33507": "QJ", "33540": "QJ", "33544": "ZC", "33564": "XQ", "33617": "YT", "33632": "QJ", "33636": "XH", "33637": "YX", "33694": "WG", "33705": "PF", "33728": "YW", "33882": "SR", "34067": "WM", "34074": "YW", "34121": "QJ", "34255": "ZC", "34259": "XL", "34425": "JH", "34430": "XH", "34485": "KH", "34503": "YS", "34532": "HG", "34552": "XS", "34558": "YE", "34593": "ZL", "34660": "YQ", "34892": "XH", "34928": "SC", "34999": "QJ", "35048": "PB", "35059": "SC", "35098": "ZC", "35203": "TQ", "35265": "JX", "35299": "JX", "35782": "SZ", "35828": "YS", "35830": "E", "35843": "TD", "35895": "YG", "35977": "MH", "36158": "JG", "36228": "QJ", "36426": "XQ", "36466": "DC", "36710": "JC", "36711": "ZYG", "36767": "PB", "36866": "SK", "36951": "YW", "37034": "YX", "37063": "XH", "37218": "ZC", "37325": "ZC", "38063": "PB", "38079": "TD", "38085": "QY", "38107": "DC", "38116": "TD", "38123": "YD", "38224": "HG", "38241": "XTC", "38271": "ZC", "38415": "YE", "38426": "KH", "38461": "YD", "38463": "AE", "38466": "PB", "38477": "XJ", "38518": "YT", "38551": "WK", "38585": "ZC", "38704": "XS", "38739": "LJ", "38761": "GJ", "38808": "SQ", "39048": "JG", "39049": "XJ", "39052": "HG", "39076": "CZ", "39271": "XT", "39534": "TD", "39552": "TD", "39584": "PB", "39647": "SB", "39730": "LG", "39748": "TPB", "40109": "ZQ", "40479": "ND", "40516": "HG", "40536": "HG", "40583": "QJ", "40765": "YQ", "40784": "QJ", "40840": "YK", "40863": "QJG" };
        //参数,中文字符串
        //返回值:拼音首字母串数组
        function makePy(str) {
            if (typeof(str) != "string")
                throw new Error(-1, "函数makePy需要字符串类型参数!");
            var arrResult = new Array(); //保存中间结果的数组
            for (var i = 0, len = str.length; i < len; i++) {
                //获得unicode码
                var ch = str.charAt(i);
                //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
                arrResult.push(checkCh(ch));
            }
            //处理arrResult,返回所有可能的拼音首字母串数组
            return mkRslt(arrResult);
        }

        function checkCh(ch) {
            var uni = ch.charCodeAt(0);
            //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
            if (uni > 40869 || uni < 19968)
                return ch; //dealWithOthers(ch);
            //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
            return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
        }

        function mkRslt(arr) {
            var arrRslt = [""];
            for (var i = 0, len = arr.length; i < len; i++) {
                var str = arr[i];
                var strlen = str.length;
                if (strlen == 1) {
                    for (var k = 0; k < arrRslt.length; k++) {
                        arrRslt[k] += str;
                    }
                } else {
                    var tmpArr = arrRslt.slice(0);
                    arrRslt = [];
                    for (k = 0; k < strlen; k++) {
                        //复制一个相同的arrRslt
                        var tmp = tmpArr.slice(0);
                        //把当前字符str[k]添加到每个元素末尾
                        for (var j = 0; j < tmp.length; j++) {
                            tmp[j] += str.charAt(k);
                        }
                        //把复制并修改后的数组连接到arrRslt上
                        arrRslt = arrRslt.concat(tmp);
                    }
                }
            }
            return arrRslt;
        }



        ////////////////

        /**
         * 对中文进行取首字母处理
         * @param {String} Params
         * @returns {String} 
         * 返回中文首字母大写
         */
        function capitalChineseFilter(Params) {
            if (!Params) return;
            return makePy(Params)[0] || '';
        }

        return capitalChineseFilter;
    }
})();
(function() {
    'use strict';

    angular
        .module('app.shared')
        .filter('dictionary', dictionary);

    function dictionary(DictionaryService) {
        var dictionaryService = DictionaryService;
        return dictionaryFilter;

        function dictionaryFilter(value, type) {
            return dictionaryService.resolve(type, value);
        }
    }
})();