var App = angular.module('App', ['ui.router']);

App.config(

function($stateProvider, $urlRouterProvider){

  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: './views/home/home.html'
  };

  var songFoundState = {
    name: 'song',
    url: '/song',
    params: {searchObj: null},
    templateUrl: './views/song/song.html',
    controller: 'SongController'
  };

  var lyricsFoundState = {
    name: 'lyrics',
    url: '/lyrics',
    templateUrl: './views/lyrics/lyrics.html'
  };

  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/404');

  $stateProvider.state(homeState);
  $stateProvider.state(songFoundState);
  $stateProvider.state(lyricsFoundState);
});


App.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
