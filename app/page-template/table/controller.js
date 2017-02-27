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