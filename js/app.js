(function (angular) {

	var appModule = angular.module('app', [
		'ui.router', 
		'restangular']);

	appModule.config(config)
    .run(run);

	config.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider'];
	function config($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {

		// $urlRouterProvider.otherwise("/");
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		// Setup state
		$stateProvider.state('login', {
			url: "/login?{code}",
			templateUrl: "views/auth/login.view.html",
			controller: 'AuthController',
			controllerAs: 'vm',
			authenticate: false
		})

		$stateProvider.state('login.register', {
			url: '/register',
			views: {
				'content': {
					templateUrl: "views/auth/register.html",
					controller: 'AuthController',
					controllerAs: 'vm'
				}
			}
		});
	}


	run.$inject = ['$rootScope', '$state', '$stateParams', '$http', '$window', '$timeout', 'Restangular'];
	function run($rootScope, $state, $stateParams, $http, $window, $timeout, Restangular) {
		Restangular.setBaseUrl('http://api.freshy.vn');

		$rootScope.$on('$stateChangeStart', function (e, to) {
			if (to.authenticate && !$rootScope.globals.isAuthenticated) {
				e.preventDefault();
				$state.go('login');
			}
		});
	}
	//nnluc073
	appModule.service('MetaService', function() {
       var title = 'Test';
       var metaDescription = '';
       var metaKeywords = '';
       return {
          set: function(newTitle, newMetaDescription, newKeywords) {
              metaKeywords = newKeywords;
              metaDescription = newMetaDescription;
              title = newTitle; 
          },
          metaTitle: function(){ return title; } ,
          metaDescription: function() { return metaDescription; },
          metaKeywords: function() { return metaKeywords; }
       }
    });
	
})(angular);
