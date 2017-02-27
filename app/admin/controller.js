(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('EssayManage', EssayManage);

    EssayManage.$inject = ['$scope', '$sce', 'EssaysModel', 'UtilityService'];

    function EssayManage($scope, $sce, EssaysModel, UtilityService) {
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
         * 根据参数，获取列表
         * 
         * @param {object} configs
         */
        function getEssays(configs) {
            essaysModel.getEssays(configs).then(result => {
                vm.essaysList = result;
            });
        }

        /*----------  内部辅助函数  ----------*/


        function init() {
            vm.pagination = utilityService.initPagination();
            getEssays(vm.pagination.configs);
        }

        init();
        vm.addEssay = function() { //添加
            vm.essaysList.push({ Name: vm.newName, Id: vm.newId, Grade: vm.newGrade });
            vm.newName = '';
            vm.newId = '';
            vm.newGrade = '';
        };
        vm.deleteEssay = function(essay) { //删除一行的内容
            vm.essaysList.splice(vm.essaysList.indexOf(essay), 1);
        };

    }

})();