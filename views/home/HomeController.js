function HomeController($scope, $log, MainService, $sanitize, $state) {

    $log.log('Loading HomeController ...');

    $scope.artist = '';
    $scope.song = '';

    var changeState = function(stateStr, stateObj) {
        $state.go(stateStr, stateObj);
    };

    var queryMaker = MainService.queryMaker;

    $scope.searchMessage = '';
    var searchObj = '';

    $scope.search = function(artist, song) {
        if (!song) {
            if (!artist)
                $scope.searchMessage = "Your query was empty, try again";
            else {
                getData(queryMaker(artist, song, 'artistMusic', 10));
                $log.log("Logging searchObj" + searchObj);
                changeState('song', searchObj);
            }
        }
    };




    var getData = function(artist, song, query) {

        MainService.getData(artist, song, query).then(
            function(data) {
                if (data.type === 'song_notfound')
                    $scope.searchMessage = 'Sorry, the song was not found for that artist.';
                else
                    searchObj = data;
                    $log.log('Succesfully received data ...');
            }
        );
    };
}


App.controller('HomeController', HomeController);
