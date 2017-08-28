require('chromedriver');
var AllureReporter = require('jasmine-allure-reporter');
var webdriver = require('selenium-webdriver');
var myReporter = {
jasmineStarted: function () {
    //var AllureReporter = require('jasmine-allure-reporter');
    //var driver = require('selenium-webdriver');
    var driver=new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://www.google.com');
    jasmine.getEnv().addReporter(new AllureReporter({
  resultsDir: 'allure-results'
}));
    jasmine.getEnv().afterEach(function(done){
      driver.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }

  
}
jasmine.getEnv().addReporter(myReporter);

describe('A test suite',function(){
    it('A test case',function(){
        expect(true).toBe(true);
    });
     it('A test case',function(){
        expect(false).toBe(true);
    });
});