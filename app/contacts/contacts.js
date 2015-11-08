'use strict';

angular.module('contacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contacts', {
		templateUrl: 'contacts/contacts.html',
		controller: 'ContactsCtrl'
	});
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
	var ref = new Firebase('https://kontaqts.firebaseio.com/kontaqts');
	$scope.contacts = $firebaseArray(ref);

	$scope.showAddForm = function () {
		$scope.addFormShow = true;
	};

	$scope.hide = function () {
		$scope.addFormShow = false;
		$scope.contactShow = false;
	};

	$scope.addFormSubmit = function () {
		// if ($scope.name) { var name = $scope.name } else { var name = null }
		var name = ($scope.name) ? $scope.name : null;
		var email = ($scope.email) ? $scope.email : null;
		var company = ($scope.company) ? $scope.company : null;
		var mobile_phone = ($scope.mobile_phone) ? $scope.mobile_phone : null;
		var home_phone = ($scope.home_phone) ? $scope.home_phone : null;
		var work_phone = ($scope.work_phone) ? $scope.work_phone : null;
		var street_address = ($scope.street_address) ? $scope.street_address : null;
		var city = ($scope.city) ? $scope.city : null;
		var state = ($scope.state) ? $scope.state : null;
		var zip_code = ($scope.zip_code) ? $scope.zip_code : null;

		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones: [
				{
					mobile: mobile_phone,
					home: home_phone,
					work: work_phone
				}
			],
			address: [
				{
					street_address: street_address,
					city: city,
					state: state,
					zip: zip_code
				}
			]
		}).then(function (ref) {
			var id = ref.key();

			console.log('Added contact with ID ' + id);

			clearFields();

			$scope.addFormShow = false;
			$scope.msg = "Contact Added";
		});
	};

	$scope.editFormSubmit = function () {
		var id = $scope.id;
		var record = $scope.contacts.$getRecord(id);

		record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		record.phones[0].work = $scope.work_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].mobile = $scope.mobile_phone;
		record.address[0].street_address = $scope.street_address;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		// record.address[0].zip = $scope.zip_code;

		$scope.contacts.$save(record).then(function (ref) {
			console.log(ref.key);
		});

		clearFields();

		$scope.editFormShow = false;

		$scope.msg = "Contact updated";
	};

	$scope.showContact = function (contact) {
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip_code = contact.address[0].zip_code;

		$scope.contactShow = true;
	};

	$scope.showEditForm = function (contact) {
		$scope.editFormShow = true;

		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work_phone;
		$scope.home_phone = contact.phones[0].home_phone;
		$scope.mobile_phone = contact.phones[0].mobile_phone;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip_code = contact.address[0].zip_code;
	};

	$scope.removeContact = function (contact) {
		$scope.contacts.$remove(contact);
		$scope.msg = 'contact removed';
	};

	function clearFields () {
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zip_code = '';
	}

}]);