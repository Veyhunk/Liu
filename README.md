## 开发说明
### 项目结构说明
```javascript
Giorgio.WEB
 |-app                        // WEB前端模块源码
    |-_common                 // 全局共享目录
      |- module.js            // 全局共享路由配置 
    |-home                    // 首页模块
    |-admin                   // 项目后台管理模块
    |-app.js                  // angular顶层入口，在其它模块定义的Module要在这里注入
    |-main.js                 // 手动bootstrap（运行）项目
    |-layout                  // 全局布局模块
 |-assets                     // 资源: js、css、images、lib(第三方插件，非Bower和npm)
 |-bower_components           // bower前端依赖组件
 |-node_modules               // npm依赖包
 |-build                      // 部署打包生成文件
 |-tests                      // 测试
 |-404.html                   // 404
 |-app.config.js              // 配置文件
 |-app.scripts.json           // 依赖插件配置
 |-bower.json                 // bower配置 
 |-package.json               // package配置                 
 |-gulpfile.js                // gulp配置               
 |-README.md                  // 项目说明                              
 |-index.html                 // 项目主页   

```
整体项目结构大致如上，第一个模块下都有一个module.js文件进行路由配置。
注：项目结构以当前实际目录结构为准，以上只供参考。
### 拉取项目
首先运行如下命令，从远程仓库将项目源码拉取到本地。
```
Git clone https://github.com/veyhunk/Liu.git
```
### 项目环境搭建
首先需要下载[Node.js](https://nodejs.org)，选择`LTS`（Long Term Support）版本，下载完成之后，在项目根目录运行：
```javascript
npm install
```
安装[bower](http://bower.io)包依赖管理器:

```javascript
npm install -g bower
```

然后在项目根目录下运行如下指令：
```javascript
bower install
```
安装完依赖包之后，安装[gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)，顺序运行如下命令：
```javascript
npm install --g gulp-cli
// sudo npm install --g gulp-cli // for mac
npm install --save-dev gulp
```
现在运行项目:
```javascript
gulp
```
到此，项目就部署完成，如无意外，会自动弹出页面。已经将[BrowserSync](https://browsersync.io)整合，代码修改后，浏览器页面会自动刷新，不需要其它操作。（如果代码修改后发生错误，可能页面不会自动刷新，这时候需要手动刷新下）
### 模块注册                 
拿demo模块为例，首先需要在本模块下新建一个`module.js`文件，在这个文件内进行模块申明和配置，此文件的内容类似如下：
```javascript
(function(){
    
    'use strict';
    angular
        // module定义要注意，后面没第二个参数是获取
        // 下面这样是重新定义一个新的，定义只在module.js文件中进行
        // 其它地方获取使用，不需要第二个参数如.module('app.demo').controller()
        .module('app.demo',['ui.router'])
        .config(DemoConfig);

    DemoConfig.$inject = ['$stateProvider'];

    function DemoConfig($stateProvider){

        $stateProvider
            .state('app.demo', {
                url: '/demo', 
                data: {
                    title: 'Demo'
                },
                views: {
                    'content@app': {
                      templateUrl: 'app/demo/views/demo.html',
                      controller: 'DemoCtrl'
                    }
                }
            })
       
    }

})();
```
`app.demo`就是此模块的名称，将此模块注入到最外层的`app.js`文件中，这样就完成模块注册，之后就可以调用之前注册的模块进行开发工作，如下：
```javascript
(function(){
    
    'use strict';
    angular
        .module('app.demo')
        .controller('DemoCtrl',DemoCtrl);
    // 必须要这么写注入，后期可能会压缩代码
    DemoCtrl.$inject = ['$scope'];
    
    function DemoCtrl($scope) {
        var vm = this;
        var i = 0;
        console.info($scope);
        vm.colors = [
            {name:'black', shade:'dark'},
            {name:'white', shade:'light', notAnOption: true},
            {name:'red', shade:'dark'},
            {name:'blue', shade:'dark', notAnOption: true},
            {name:'yellow', shade:'light', notAnOption: false}
        ]
        vm.select = vm.colors[2];
    } 
})(); 
```
### 注意事项
#### 模块定义
所有模块请使用`匿名立即执行函数`包裹，防止对全局空间的污染：
```javascript
(function(){
    // 模块定义
    // Module Definitions
})(); // 后面跟`;` 不然打包的时候可能出错！
```
#### 插件
因为在架构的过程中，删除了一些可能用不上的插件，和原来的UI框架还是有所区别，如在使用一些功能时出现无找到插件等错误，请自行使用`bower`安装，需要配置`app.scripts.json `文件中的信息，并**重新运行**gulp命令,弄不来随时call我。在项目中使用到的第三方组件大致如下：
##### nc-treetable
这个组件是我自己写的treetable，基本覆盖原型文档中大部分的树形表格显示，暂时支持`radio`和`checkbox`，详细内容参看[nc-widgets](https://github.com/HelloYu/nc-widgets)中的docs和README
##### highcharts-ng
图表组件使用[highcharts-ng](https://github.com/pablojim/highcharts-ng)，选项接口有点区别，支持angular双向绑定，具体信息参看官方文档。
##### angular-toast
消息提示的插件，参看：[angular-toast](https://github.com/Foxandxss/angular-toastr)
##### angularLocalStorage
本地存储插件使用 [angularLocalStorage](https://github.com/agrublev/angularLocalStorage)
##### angular-datatables
使用[angular-datatables](http://l-lin.github.io/angular-datatables/)作为表格显示组件，具体资料参看官方
##### bootstrap-datetimepicker
将[bootstrap-datetimepicker](https://github.com/smalot/bootstrap-datetimepicker)进行简单的封装，所有配置参考官网API文档，使用方法如下：

statisticalanalysis-declaration-energy-consume.html
```html
 <div class='input-group date' nc-datetimepicker nc-option="DeclarationBasisOwner.dateOption">
    <input type='text' class="form-control" ng-model="DeclarationBasisOwner.selectYear" />
    <span class="input-group-addon">
        <span class="glyphicon glyphicon-calendar"></span>
    </span>
</div>
```
DeclarationEnergyConsumeCtrl.js
```javascript
    vm.dateOption = {
            startView: 'decade',
            minView: 'decade',
            format: 'yyyy'
        };
```
##### 天气插件
[open-weather](https://github.com/michael-lynch/open-weather)
##### Restangular
使用[Restangular](https://github.com/mgonto/restangular)来实现RESTful接口，已经在master中配置好，只需要根据官方文档进行使用就行，在相应的model注入调用就好，API的base路径已经设置。
#### 懒加载
有些插件是打包在其它`vendor`文件中，这些文件在初始化的时候没有加载进项目，需要在路由配置的时候手动进行懒加载，如下：
```javascript
    .state('app.ui.jqueryUi', {
        url: '/ui/jquery-ui',
        data: {
            title: 'JQuery UI'
        },
        views: {
            "content@app": {
                templateUrl: 'app/ui/views/jquery-ui.html',
                controller: 'JquiCtrl'
            }
        },
        resolve: {
            srcipts: function(lazyScript){
                return lazyScript.register([
                    'build/vendor.ui.js'
                ])

            }
        }
    })
``` 

### 团队开发Git
#### fetch
每天来秀智商之前，一定先使用`fetch`命令抓取下服务器仓库中的内容，之后使用`diff`看看有什么区别，再进行手动`merge`，因为暂时没有使用`branch`和`pull request`，有可能产生冲突。
#### 开发建议
##### 模块化开发
其实每个人负责一个模块，就是一个branch，当这个人完成模块的时候，就向管理人员发起pull request，管理人员code review之后，如果没问题再将代码merge到master分支中。
##### 版本标签
当几个模块完成后，由管理人员，对源码进行tag处理，也就是版本发布，每个阶段，对应相应的版本。
以上内容因为人员和学习成本的问题，估计暂时无法实行，只作为提议。
#### 更多资料
1、[AngularJS 开发介绍](http://www.yuyanping.com/JavaScript/angular_tutorial/)
2、[前端组队“打怪”规范](http://www.yuyanping.com/Front_End/front_end_team_development_style/)
3、[GIS团队开发](http://www.yuyanping.com/Git/Pull_Request_for_Team_Work/)