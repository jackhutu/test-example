// protractor 配置
exports.config = {
  //每个运行在浏览器的脚本文件超时时间,单位毫秒.
	allScriptsTimeout: 11000,
  //使用的测试框架
  framework: 'jasmine2',
  //测试的文件路径
  specs: ['test_e2e/main.spec.js'],
  //程序的基本URL,protractor.get()将以它作为相为路径
  baseUrl: 'http://localhost:3000',
  //浏览器配置
  capabilities: {
    browserName: 'chrome'
  },
  //多浏览器配置
  // multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }]
  // jasmine配置
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  //selenium及浏览器驱动文件路径
  seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  chromeDriver: 'node_modules/protractor/selenium/chromedriver'
}