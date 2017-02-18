var App = angular.module('App', ['ui.router', 'ngSanitize']);

App.config(

function($stateProvider, $urlRouterProvider){

  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: './views/home/home.html',
    controller: 'HomeController'
  };

  var songsFound = {
    name: 'songs',
    url: '/songs',
    templateUrl: './views/songs/songs.html'
  };

  var lyricsFound = {
    name: 'lyrics',
    url: '/lyrics',
    templateUrl: './views/lyrics/lyrics.html'
  };

  $stateProvider.state(homeState);

  $urlRouterProvider.when('', '/');
});
