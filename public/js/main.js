angular.module('hebrew-editor', ['ngRoute'])
	.controller('editorController', ['$scope', '$routeParams', '$location',
		function($scope, $routeParams, $location) {
			$scope.author = $routeParams.author;
			$scope.title = $routeParams.title;
			$scope.chapter = $routeParams.chapter;

			var makeDocName = function (author, title, chapter) {
				return author + '.' + title + '.' + chapter;
			};
			var docName = makeDocName($scope.author, $scope.title, $scope.chapter);
			var editor = document.getElementById('editor');
			var hebrewEditor = document.getElementById('hebrew-editor');

			sharejs.open(docName, 'text', function(error, doc) {
				doc.attach_textarea(editor);
			});
			sharejs.open(docName + '.hebrew', 'text', function(error, doc) {
				doc.attach_textarea(hebrewEditor);
			});


			$scope.rename = function(author, title, chapter) {
				var newName = makeDocName(author, title, chapter);
				sharejs.open(newName, 'text', function(error, doc) {
					doc.insert(0, editor.value);
				});
				sharejs.open(newName + '.hebrew', 'text', function(error, doc) {
					doc.insert(0, hebrewEditor.value);
				});

			};
		}
	])
	.controller('homeController', ['$scope', '$http',
		function($scope, $http) {
			$scope.docs = [];
			$scope.delete = function(id) {
				$http.delete("/docs/" + id).then(function(response) {
					console.log(response);
				});
			}

			$http.get("/docs").then(function(res) {
				var docs = res.data;
				angular.forEach(docs, function(doc) {
					var parts = doc._id.split(".");
					if (parts.length === 3) {
						doc.title = formatTitle(parts);
						doc.link = parts.join("/");
						doc.number = parseInt(parts[2]);
						$scope.docs.push(doc);

					}
					// doc.link = doc._id.replace(/\./g, "/");
				});
				$scope.docs.sort(function(a, b) {
					return a.number > b.number;
				});
				// $scope.docs = docs;
				console.log($scope.docs);
			});

			$scope.getDoc = function(docName) {
				$http.get("/docs/" + docName).then(function(res) {
					console.log(res);
				});
			};

			$scope.getDoc('test.test.1');

			$scope.create = function(docName) {
				$http.post("/docs", {
					docName: docName
				}, function(data) {
					console.log(data);
				});
			};

			function formatTitle(parts) {
				var formattedParts = [];
				var formattedPart;
				angular.forEach(parts, function(part) {
					formattedPart = part.split("_");
					angular.forEach(formattedPart, function(word, index) {
						formattedPart[index] = capitalizeFirstLetter(word);
					});
					formattedParts.push(formattedPart.join(" "));
				});
				return formattedParts.join(" - ");
			}

			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
		}
	])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/:author/:title/:chapter', {
				templateUrl: 'partials/text-areas.html',
				controller: 'editorController'
			});

			$routeProvider.when('/home', {
				templateUrl: 'partials/home.html',
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