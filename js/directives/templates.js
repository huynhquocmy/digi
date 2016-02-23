angular.module('app')
.directive('digiHeader', function ($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '../../templates/shared/header.html',
    replace: true
  };
})
.directive('digiFooter', function ($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '../../templates/shared/footer.html',
    replace: true
  };
});