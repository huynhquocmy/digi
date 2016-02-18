angular.module('app')
.controller('HomeController', ['$scope', '$timeout', 'Restangular', '$rootScope', 'MetaService', function ($scope, $timeout, Restangular, $rootScope, MetaService) {
	$scope.isLoadMore = false;
	$scope.baseUrl = 'http://media.freshy.vn/product_images/';

	$scope.showMore = function (el) {
		$scope.isLoadMore = !$scope.isLoadMore;
		if ($scope.isLoadMore) {
			$('.load-more').slideDown('fast');
		} else {
			$('.load-more').slideUp('fast');
		}
	};

	$scope.getAllTopics = function () {
        Restangular.one('topic').all('findAll')
        .post().then(function (result) {
            if (result.length) {
                $scope.topics = result;
            }
        })
    };

    $scope.getAllPosts = function () {
        Restangular.one('blog').all('findAll')
        .post().then(function (result) {
            if (result.length) {
                $scope.posts = result;
                if ($scope.posts.length > 6) {
                    var top = $scope.posts.slice(0, 6);
                    $scope.morePosts = $scope.posts.slice(6, $scope.posts.length);
                    $scope.posts = top;
                }
            }
        })
    };

    $scope.getAllPosts();
    $scope.getAllTopics();
	
	//nnlu073
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Freshy","Your online food and health inspiration","freshy_home");
	
}])

.directive('parseHtml', ['$rootScope', function ($rootScope) {
    return {
        scope: {
            data: "=",
            html: "="
        },
        restrict: 'AEC',
        link: function (scope, el) {
            scope.init = function () {
            	$(el).html(scope.data.content_vi);
            };

            scope.$watch('data', function () {
            	if (scope.data) {
            		scope.init();
            	}
            })
        }
    }
}]);