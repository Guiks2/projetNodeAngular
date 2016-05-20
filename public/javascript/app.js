//controllers & directives
var app = angular.module("EsgiMp3", []);

app.controller("Mp3LibraryController", Mp3LibraryController);

function Mp3LibraryController($scope, $http) {
    $http.get("/data/title").success(onResult);

    function onResult(data)
    {
        console.log(data);
        $scope.songs = data;
    }
}

app.directive('song-date', function() {
    return {
        restrict: 'A',
        template: '<span>{{song.year}}</span>'
    };
});