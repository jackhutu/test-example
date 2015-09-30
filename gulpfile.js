var gulp = require('gulp');
var path = require('path');
var Server = require('karma').Server;
var protractor = require("gulp-protractor").protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;
var $ = require('gulp-load-plugins')();

var config = {
	mocha: 'test', 							 //mocha测试文件路径
	istanbul: 'test_coverage',   //istanbul输出报告路径
	e2e:'test_e2e'							 //protractor测试文件路径
}


gulp.task('test:mocha',function () {
	gulp.src(path.join(config.mocha, '/**/*.js'),{read: false})
	.pipe($.mocha({
		reporter: 'list',		//list,nyan,spec(default),progress
		require: ['should'],
		timeout: 5000
	}))
	.once('error', function () {
	    process.exit(1);
	})
	.once('end', function () {
	    process.exit();
	});
});

gulp.task('test:karma', function (done) {
  new Server({
  	configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, done).start();
});

//istanbul
gulp.task('pre-test', function () {
  return gulp.src(path.join(__dirname,'/app.js'))
    .pipe($.istanbul())  
    .pipe($.istanbul.hookRequire()) 
});

gulp.task('test:istanbul',['pre-test'],function () {

		gulp.src(path.join(config.mocha, '/**/*.js'),{read: false})
				.pipe($.mocha({
					require: ['should'],
					timeout: 5000
				}))
				//输出报告
				.pipe($.istanbul.writeReports({
					dir: path.join(config.istanbul,'/')
				}))
				//设置覆盖率门槛,如果不达标,会测试不通过.
				.pipe($.istanbul.enforceThresholds({ thresholds: { 
					global: {						//全局门槛
						statements: 80,
						branches: 80,
						lines: 90,
						functions: 75
					},
					each: 60						//单个文件门槛
				}}))
				.once('error', function () {
				    process.exit(1);
				})
				.once('end', function () {
				    process.exit();
				});

});

//e2e test
gulp.task('nodemon',function () {
	$.nodemon({
	  script: path.join(__dirname,'/app.js'), 
	  ext: 'js'
	})
});

gulp.task('webdriver-update', webdriver_update);

gulp.task('test:protractor',function () {
	gulp.src(path.join(config.e2e,'/*.spec.js'))
	  .pipe(protractor({
	  	configFile: path.join(__dirname,'/protractor.conf.js')
	  })).on('error', function (err) {
       process.exit(1);
    }).once('end', function () {
        process.exit();
    });
});
gulp.task('test:e2e',$.sequence('nodemon','webdriver-update','test:protractor'));

gulp.task('default',$.sequence('test:karma','test:istanbul'));
