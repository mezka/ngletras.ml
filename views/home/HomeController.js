function HomeController($scope, $log, MainService, $sanitize) {

    $log.log('Loading HomeController ...');

    $scope.search = {
        artist: '',
        song: ''
    };

    $scope.searchOutcome = '';

    $scope.getLyrics = function(artist, song) {

        var promise = MainService.getLyrics(artist, song);

        promise.then(
          function(data){
            if(data.type === 'song_notfound')
              $scope.searchOutcome = 'Sorry, the song was not found. Remember that you have to search for both artist and song name';
            else
              $scope.searchOutcome = MainService.htmlEncode(data.mus[0].text);
          }
        );
    };


    $scope.getSongs = function(artist){
      MainService.getSongs(artist).then(
        function(data){
            if(response.numfound !== 0){
              
            }
        }
      )
    }
}


App.controller('HomeController', HomeController);
