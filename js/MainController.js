function MainController($scope, $state, MainService) {

    console.log('Loading MainController ...');

    $scope.artist = '';
    $scope.song = '';

    var changeState = function(stateStr, stateObj) {
        $state.go(stateStr, stateObj);
    };

    $scope.searchMessage = '';

    $scope.search = function(artist, song) {

        if (!song) {
            if (!artist)
                $scope.searchMessage = "Your query was empty, try again";
            else {
                  console.log('Trying to get data');
                  MainService.getArtistSongs(artist, song).then(
                    function(data) {
                        console.log('Works!');
                        changeState('song', {
                            searchObj: data
                        });
                    }
                );
            }
        }
    };

}

App.controller('MainController', MainController);
