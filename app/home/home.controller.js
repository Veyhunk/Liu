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
            // 通过页面配置 从模型层获取数据
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
            getSlides(vm.pagination.configs);
        }
        // 调用后台数据初始化
        init();

        /**
         * 激活图片弹窗的方法
         * 
         * @param {pic object} pic id 图片的对象，可以为空
         */
        vm.picView = function(pid) {
            $uibModal.open({
                templateUrl: 'app/shared/templates/carousel.modal.html',
                size: 'lg',
                backdrop: 'true',
                controller: function($scope) {
                    // 绑定选中的图片
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