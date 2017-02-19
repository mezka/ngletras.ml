var App = angular.module('App', ['ui.router', 'ngSanitize']);

App.config(

function($stateProvider, $urlRouterProvider){

  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: './views/home/home.html',
    controller: 'HomeController'
  };

  var songFound = {
    name: 'song',
    url: '/song:searchObj',
    templateUrl: './views/song/song.html',
    controller: 'SongController'
  };

  var lyricsFound = {
    name: 'lyrics',
    url: '/lyrics',
    templateUrl: './views/lyrics/lyrics.html'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(songFound);
  $stateProvider.state(lyricsFound);

  $urlRouterProvider.when('', '/');
});
