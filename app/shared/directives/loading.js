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