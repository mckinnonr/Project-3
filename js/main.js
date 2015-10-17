(function() {
  var app = angular.module("project3", []);
  app.controller("InstaController", ['$scope', '$http', function($scope, $http){
    $scope.posts = [];
    $scope.loading = false;

    $scope.getPhotos = function (e){
      $scope.loading=true;
      e.preventDefault();
      var searchInput = "https://api.instagram.com/v1/tags/" + $scope.hashTagName + "/media/recent?callback=JSON_CALLBACK&client_id=8ba7e057fa6c492984c0dd157ae41a51";
      $http.jsonp(searchInput).then(function(response){
        $scope.posts=response.data.data;
        $scope.loading=false;
      });
    }


  }]);
}) ();
