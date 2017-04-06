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