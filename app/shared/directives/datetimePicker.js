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