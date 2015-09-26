(function () {
	'use strict';

	angular.module('testexample', ['ui.router'])
		.config(function ($stateProvider,$urlRouterProvider) {
			$stateProvider
			  .state('main', {
			    url: '/',
			    templateUrl: 'app/main.html',
			    controller: 'MainCtrl'
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

		});
})();