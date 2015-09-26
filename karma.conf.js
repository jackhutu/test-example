// Karma configuration
module.exports = function(config) {
  config.set({
    // 根路径,其它相对路径都这它为基准
    basePath: '',
    //使用的测试框架
    frameworks: ['jasmine'],
    //所有浏览器加载的文件路径
    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'client/**/*.js',
        'client/**/*.html',
        'test_karma/**/*.spec.js'
    ],
    //对angular文件近照依赖注入顺序加载
    angularFilesort: {
      whitelist: [
        'client/**/*.js'
      ]
    },
    // 需要排除的文件
    exclude: [
    ],
    //预处理器,默认只对CoffeeScript预处理,其它的需要装插件,这里对应两个插件
    preprocessors: {
        'client/**/*.js': ['coverage'], //测试覆盖率插件karma-coverage
        'client/**/*.html': ['ng-html2js'] //将angular模板文件转化成$templatecache
    },
    //默认module名称为templates
    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/',
      moduleName: 'templates'
    },
    //测试结果报告,默认只有progress,其它的需要手动添加.
    reporters: ['progress','coverage'],
    //测试覆盖率配置,text-summary在控制台打印, html 生成html文件到指定的dir
    coverageReporter: {
      //type : 'html',
      type:'text-summary',
      dir : 'test_karma_coverage/'
    },
    //默认端口
    port: 9876,
    // 开启关闭有颜色的输出
    colors: true,
    // 输出的日志级别
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // 是否开启自动监控
    autoWatch: false,
    // 运行测试的浏览器,需要安装插件
    browsers: ['Chrome'],
    // 是否只运行一次就退出karma, 通常和autoWatch配合使用,当autoWatch为true时,此处为false
    singleRun: true
  })
}
