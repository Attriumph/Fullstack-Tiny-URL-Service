var app = angular.module("tinyURLApp");

// &scope---angular core提供的一个变量，一个纽带
app.controller("homeController",
    ["$scope","$http","$location",function($scope,$http,$location){
    $scope.submit= function(){

          $http.post("/api/v1/urls/", {
              longUrl: $scope.longUrl
          })
              .then(function(data){
                  $location.path("/urls/" + data.data.shortUrl);
              });

    }

}]);