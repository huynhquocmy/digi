angular.module('app').config(['$stateProvider', function config($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		views: {
			'main-content': {
				controller: 'HomeController',
				templateUrl: '../../templates/home.html',
				meta: {
					//Sets 'Home Page' as the title when /home is open
					title: 'Home page', 
					description: 'Digi'
				}
			}
		}
	});
}]);

angular.module('app').controller('mainController', ['$scope', 'Restangular', '$state', '$rootScope',
function ($scope, Restangular, $state, $rootScope) {
}]);