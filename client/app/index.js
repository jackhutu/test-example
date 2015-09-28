(function () {
	'use strict';

	angular.module('testexample', ['ui.router'])
		.config(function ($stateProvider,$urlRouterProvider) {
			$stateProvider
			  .state('main', {
			    url: '/',
			    templateUrl: 'app/main.html',
			    controller: 'MainCtrl'
			  })			  
			  .state('article', {
			    url: '/article/:id',
			    templateUrl: 'app/article.html',
			    controller: 'ArticleCtrl'
			  });

			 $urlRouterProvider.otherwise('/');
		})
		.controller('MainCtrl',function ($scope,$http) {
			$scope.name = 'Jack Hu';
			
			$http.get('/articleList').success(function (data, status) {
				$scope.articleList = data;
			}).error(function (err, status) {
				$scope.articleList = [];
			});

		})
		.controller('ArticleCtrl',function ($scope,$http,$stateParams) {
			$http.get('/article/'+ $stateParams.id).success(function (data, status) {
				$scope.article = data;
			}).error(function (err, status) {
				$scope.err_msg = '文章不存在!';
			});
		});
})();