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