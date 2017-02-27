(function() {
    'use strict';

    angular.module('app', [
        // 第三方插件
        'restangular',
        'ui.bootstrap',
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
        'app.member_management',
        'app.admin'
    ]);
})();