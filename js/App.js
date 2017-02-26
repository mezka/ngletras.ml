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
