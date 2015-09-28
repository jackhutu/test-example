describe('test-example e2e test',function() {
	beforeEach(function () {
		browser.get('/');
	});

  it('should return index page title and my name', function() {
    expect(browser.getTitle()).toBe("Angular 测试");
    expect(element(by.exactBinding('name')).isPresent()).toBe(true);
    expect(element(by.exactRepeater('article in articleList')).isPresent()).toBe(true);
    var title = element(by.repeater('article in articleList').row(0).column('article.title'));
    expect(title.getText()).toEqual('中国世界第一');
  });

  it('should return article detail page', function() {
    element.all(by.linkText('查看文章内容')).first().click();
    expect(element(by.tagName('h1')).getText()).toEqual('文章内容页');
    expect(element(by.className('title')).getText()).toEqual('中国世界第一');
    expect(element(by.className('errmsg')).isPresent()).toBe(false);
  });

  it('should return article 404 error page', function() {
  	element.all(by.linkText('查看文章内容')).last().click();
  	expect(element(by.tagName('h1')).getText()).toEqual('文章内容页');
  	expect(element(by.className('errmsg')).isPresent()).toBe(true);
  });
	  
});
