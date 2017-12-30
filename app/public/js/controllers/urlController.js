var app = angular.module("tinyURLApp");

//&scope---angular core提供的一个变量，一个纽带
app.controller("urlController",
    ["$scope","$http","$routeParams",function($scope,$http,$routeParams){
            $http.get("/api/v1/urls/"+$routeParams.shortUrl)
                 .then(function(data){
                $scope.shortUrl = data.data.shortUrl;
                $scope.longUrl = data.data.longUrl;
                $scope.shortUrlToShow = "http://localhost:3000/"+data.data.shortUrl;
        });

        $http.get("/api/v1/urls/"+$routeParams.shortUrl + "/totalClicks")
             .then(function(data){
                $scope.totalClicks = data.data;
        });
        $scope.hour = "hour";
        $scope.day = "day";
        $scope.month = "month";
        $scope.getTime = function(time){
            $scope.lineLabels = [];
            $scope.lineData = [];
            $scope.time = time;
            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + time)
                .then(function(data){
                    data.data.forEach(function (info) {
                        var legend = '';
                        if(time == 'hour'){
                            if(info._id.minutes < 10){
                                info._id.minutes = '0' + info._id.minutes;
                            }
                            legend = info._id.hour + ':' + info._id.minutes;
                        }
                        if(time == 'day'){
                            legend = info._id.hour + ':00' ;
                        }
                        if(time == 'month'){
                            legend = info._id.month + '/' + info._id.day;
                        }


                        $scope['lineLabels'].push(legend);
                        $scope['lineData'].push(info.count);
                    });
                });
        };

        $scope.getTime('hour');
       var renderChart = function(chart, infos){
           $scope[chart + "Labels"] = [];
           $scope[chart + "Data"] = [];
           $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + infos)
               .then(function(data){
                   data.data.forEach(function (info) {
                       $scope[chart + "Labels"].push(info._id);
                       $scope[chart + "Data"].push(info.count);
                   });
               });
       };

       renderChart("pie","referer");
       renderChart("doughnut","country");
       renderChart("bar","platform");
       renderChart("base","browser");
    }]);