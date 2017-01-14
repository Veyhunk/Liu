var gulp = require('gulp');
var es = require('event-stream');
var browserSync = require('browser-sync').create();
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
// 删除 debug 注释
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var fs = require('fs');
var _ = require('lodash');
var scripts = require('./app.scripts.json');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');

var source = {
    js: {
        main: 'app/main.js',
        src: [
            // application config
            'app.config.js',

            // application bootstrap file
            'app/main.js',

            // main module
            'app/app.js',

            // module files
            'app/**/module.js',

            // other js files [controllers, services, etc.]
            'app/**/!(module)*.js'
        ],

    },
    html: {
        src: [
            'app/**/*.html'
        ]
    },
    css: {
        src: [
            'app/**/*.css'
        ]
    },
    sass: {
        src: [
            'app/**/*.scss'
        ]
    }
};

var dest = 'build';
// 打包
gulp.task('build', function() {

    var sassStream,
        cssStream;

    sassStream = gulp.src(source.sass.src)
        .pipe(sass().on('error', sass.logError));

    cssStream = gulp.src(source.css.src);

    es.merge(sassStream, cssStream)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dest));

    return gulp.src(source.js.src)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// cacheHTML
// 读取 html 文件缓存到 angular
var cacheHTML = function() {
    return gulp.src(source.html.src)
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        }))
        .pipe(gulp.dest(dest));
};

gulp.task('cacheHTML', cacheHTML);

// 监听文件变化
gulp.task('watch', function() {

    watch(source.css.src, function(e) {
        css();
        var time = new Date().toTimeString().split(" ")[0];
        console.info('[' + time + ']' + ' ' + e.relative + ' ' + e.event)
    });
    watch(source.sass.src, function(e) {
        css();
        var time = new Date().toTimeString().split(" ")[0];
        console.info('[' + time + ']' + ' ' + e.relative + ' ' + e.event)
    });
    // html 改变立即刷新
    watch(source.html.src, function(e) {
        cacheHTML().on('end', function() {
            var time = new Date().toTimeString().split(" ")[0];
            console.info('[' + time + ']' + ' ' + e.relative + ' ' + e.event)
            browserSync.reload();
        });
    });
    watch(source.js.src, function(e) {
        js().on('end', function() {
            var time = new Date().toTimeString().split(" ")[0];
            console.info('[' + time + ']' + ' ' + e.relative + ' ' + e.event)
            browserSync.reload();
        });
    });
});

var css = function() {
        var sassStream,
            cssStream;

        sassStream = gulp.src(source.sass.src)
            .pipe(sass().on('error', sass.logError));

        cssStream = gulp.src(source.css.src);

        return es.merge(sassStream, cssStream)
            .pipe(concat('style.css'))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream());
    }
    // 处理 scss 合并 css 并自动注入
gulp.task('css', css);
var js = function() {
    return gulp.src(source.js.src)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest));
}
gulp.task('js', js);

// 打包第三方插件到 build/vendor.js
gulp.task('vendor', function() {

    _.forIn(scripts.chunks, function(chunkScripts, chunkName) {
        var paths = [];
        chunkScripts.forEach(function(script) {
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script)
            }
            paths.push(scriptFileName);
        });

        gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(dest))
    })

});



// 发布模式
gulp.task('prod', ['vendor', 'build', 'cacheHTML']);

// 开发模式
gulp.task('dev', ['vendor', 'js', 'css', 'cacheHTML', 'watch', 'browser-sync']);

// 项目初始化的时候单独运行
gulp.task('init', ['vendor', 'js', 'css']);

gulp.task('default', ['dev']);