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