function LyricsController($scope, $stateParams, MainService) {
    console.log('Loading LyricsController...');
    console.log($stateParams);

    $scope.lyricsObj = $stateParams;

    MainService.getLyrics($stateParams.band, $stateParams.title).then(function(data) {
        console.log('Got data: ' + data.mus[0].text);
        $scope.lyricsObj.text = data.mus[0].text;
    });

}

App.controller('LyricsController', LyricsController);
