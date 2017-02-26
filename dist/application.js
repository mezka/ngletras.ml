var App = angular.module('App', ['ui.router']);

App.config(

    function($stateProvider, $urlRouterProvider) {

        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: './views/home/home.html'
        };

        var searchBandState = {
            name: 'band',
            url: '/song/{band}',
            params: {
                band: null,
            },
            templateUrl: './views/song/song.html',
            controller: 'SongController'
        };

        var searchTitleState = {
            name: 'title',
            url: '/song/{title}',
            params: {
                title: null,
            },
            templateUrl: './views/song/song.html',
            controller: 'SongController'
        };

        var lyricsFoundState = {
            name: 'lyrics',
            url: '/lyrics/{band}/{title}',
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
        $stateProvider.state(searchBandState);
        $stateProvider.state(searchTitleState);
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

    $scope.search = function(bandIn, titleIn){

        $scope.searchObj.clear();

        if (!bandIn && !titleIn) {
        } else if (bandIn && titleIn) {
            changeState('lyrics', {
                band: bandIn,
                title: titleIn
            });
        }else if(!bandIn && titleIn){
            changeState('title', {
                title: titleIn
            });
        }else{
          changeState('band', {
              band: bandIn
          });
        }
    };
}




App.controller('MainController', MainController);

function MainService($http, $log) {


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
}

angular.module('App').service('MainService', MainService);

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

function SongController($scope, $stateParams, MainService){
  console.log('Loading SongController...');



  if($stateParams.band){
    MainService.getArtistSongs($stateParams.band).then(function(data){
      console.log(data.response);
      $scope.songs = data.response.docs;
    });
  }else if($stateParams.title){
    MainService.getSongsByTitleOrExcerpt($stateParams.title).then(function(data){
      $scope.songs = data.response.docs;
    });
  }
}

App.controller('SongController', SongController);
