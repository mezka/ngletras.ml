var App = angular.module('App', ['ui.router']);

App.config(

    function($stateProvider, $urlRouterProvider) {

        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: './views/home/home.html'
        };

        var songFoundState = {
            name: 'song',
            url: '/song{band, title}',
            params: {
                band: null,
                title: null
            },
            templateUrl: './views/song/song.html',
            controller: 'SongController'
        };

        var lyricsFoundState = {
            name: 'lyrics',
            url: '/lyrics{band, title}',
            params: {
                band: null,
                title: null
            },
            templateUrl: './views/lyrics/lyrics.html',
            controller: 'LyricsController'
        };

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        $stateProvider.state(homeState);
        $stateProvider.state(songFoundState);
        $stateProvider.state(lyricsFoundState);
    });


App.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

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

function MainService($http, $log) {

    this.lastState = {link: '/', params: null};

    this.htmlEncode = function htmlEncode(s) {
        var el = document.createElement("div");
        el.innerText = el.textContent = s;
        s = el.innerHTML;
        return s;
    };

    this.getLyrics = function(artist, song){

      artist = this.htmlEncode(artist);
      song = this.htmlEncode(song);


      return $http({
          method: 'GET',
          url: 'https://api.vagalume.com.br/' + 'search.php?art=' + artist + '&mus=' + song + '&apikey={68372f035a4d545c305c57647c620ffc}'
      }).then(function(response) {
          if (response.status === 200)
              return response.data;
          else
            console.log("getLyrics failed, logging response.status: ", response.status);
      });
    };

    this.getArtistSongs = function(artist){

      artist = this.htmlEncode(artist);

      return $http({
          method: 'GET',
          url: 'https://api.vagalume.com.br/search.artmus?q=' + artist + '&limit=10'
      }).then(function(response) {
          if (response.status === 200){
              console.log(response.data);
              return response.data;
          }else
            console.log("getArtistSongs failed, logging response.status: ", response.status);
      });
    };

    this.getSongsByTitleOrExcerpt = function(song){

      song = this.htmlEncode(song);

      return $http({
          method: 'GET',
          url: 'https://api.vagalume.com.br/' + 'search.excerpt?q=' + song + '&limit=10'
      }).then(function(response) {
          if (response.status === 200)
              return response.data;
          else
            console.log("getSongsByTitleOrExcerpt failed, logging response.status: ", response.status);
      });
    };

    this.saveCurrentState = function(stateName, stateParams){
      this.lastState.link = stateName;
      this.lastState.params = stateParams;
    };

    this.getLastState = function(){
      return this.lastState;
    };

}

angular.module('App').service('MainService', MainService);

function SongController($scope, $stateParams, MainService){
  console.log('Loading SongController...');

  if($stateParams.band){
    MainService.getArtistSongs($stateParams.band).then(function(data){
      console.log(data);
      $scope.songs = data.response.docs;
    });
  }else {
    MainService.getSongsByTitleOrExcerpt($stateParams.title).then(function(data){
      console.log(data);
      $scope.songs = data.response.docs;
    });
  }
}


App.controller('SongController', SongController);

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
