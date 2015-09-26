'use strict';

describe('module testexample', function() {
	beforeEach(module('testexample'));
	beforeEach(module('templates'));

	describe('main controller', function() {
		var $scope,MainCtrl,$httpBackend,mockArticleList;

		beforeEach(inject(function (_$rootScope_,_$controller_,_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			$scope = _$rootScope_.$new();
			MainCtrl = _$controller_('MainCtrl',{$scope:$scope});
			mockArticleList = $httpBackend.when('GET','/articleList').respond([
													{
														"id":"10001",
														"title":"中国世界第一",
														"content":"人均也是第一"
													},{
														"id":"10002",
														"title":"中国程序员万岁",
														"content":"中国程序员万岁万岁万万岁!"
													}
												]);
		}));

		afterEach(function () {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should return my name',function () {
			expect($scope.name).toBe('Jack Hu');
			expect($scope.articleList).toBeFalsy();
			$httpBackend.flush();
			expect($scope.articleList.length).toEqual(2);
		});
	});

});