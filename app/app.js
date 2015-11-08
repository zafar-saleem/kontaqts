'use strict';

// Declare app level module which depends on views, and components
angular.module('contacts', [
  'ngRoute',
  'firebase',
  'contacts.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
