'use strict'
angular.module('hebrew-editor', ['ngRoute']);

angular.module('hebrew-editor').controller('editorController', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		var docName = $routeParams.author + '.' + $routeParams.title + '.' + $routeParams.chapter;
		var editor = document.getElementById('editor');
		var hebrewEditor = document.getElementById('hebrew-editor');
		// var docName = location.hash.substr(1);
		// if (docName.length < 1)
		// 	docName = 'hello';
		sharejs.open(docName, 'text', function(error, doc) {
			doc.attach_textarea(editor);
		});
		sharejs.open(docName + '.hebrew', 'text', function(error, doc) {
			doc.attach_textarea(hebrewEditor);
		});
	}
]);

angular.module('hebrew-editor').controller('homeController', ['$scope',
	function($scope) {
		console.log("home");
		$scope.message = "hello";
	}
]);

angular.module('hebrew-editor').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/:author/:title/:chapter', {
			template: '<textarea id="hebrew-editor" dir="rtl"></textarea><textarea id="editor"></textarea>',
			controller: 'editorController'
		});

		$routeProvider.when('/home', {
			template: '<h1 ng-bind="message"></h1>',
			controller: 'homeController'
		});

		$routeProvider.otherwise({
			redirectTo: '/home'
		});
	}
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['hebrew-editor']);
});