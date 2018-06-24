function LyricsController($scope, $stateParams, MainService) {
    console.log('Loading LyricsController...');
    console.log($stateParams);

    $scope.lyricsObj = $stateParams;
    $scope.showBr = false;
    $scope.languageMessage = "Disponível em Português";


    MainService.getLyrics($stateParams.band, $stateParams.title).then(function(data) {
        $scope.lyricsObj.title = data.mus[0].name;
        $scope.lyricsObj.text = data.mus[0].text;
        $scope.lyricsObj.br = data.mus[0].translate[0].text;
        MainService.saveSongStorage(lyricsObj);
    });


    $scope.toggleBr = function(){
      if(!$scope.showBr){
        $scope.showBr = true;
        $scope.languageMessage = "Go back to English";
      }else {
        $scope.showBr = false;
        $scope.languageMessage = "Disponível em Português";
      }
    };
}

App.controller('LyricsController', LyricsController);
