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