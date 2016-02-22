angular.module('app')
.directive('digiHeader', function ($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '../../templates/shared/header.html'
  };
})
.directive('digiFooter', function ($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '../../templates/shared/footer.html'
  };
});