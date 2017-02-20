function MainController($scope, MainService, $state) {

    console.log('Loading MainController ...');

    $scope.searchObj = {
        band: '',
        title: '',
        clear: function(){
          this.band = '';
          this.title = '';
        }
    };

    var changeState = function(stateName, stateParams) {
        $state.go(stateName, stateParams);
    };

    $scope.searchMessage = '';

    $scope.search = function(artist, song) {

        $scope.searchObj.clear();

        if (!artist && !song) {
            $scope.searchMessage = "Your query was empty, try again";
        } else if (artist && song) {
            changeState('lyrics', {
                band: artist,
                title: song
            });
        } else {
            changeState('song', {
                band: artist,
                title: song
            });
        }
    };


}




App.controller('MainController', MainController);
