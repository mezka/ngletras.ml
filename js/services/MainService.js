function MainService($http, $log) {

    this.getLyrics = function(artist, song) {
        return $http({
            method: 'GET',
            url: 'https://api.vagalume.com.br/search.php?art=' + artist + '&mus=' + song + '&apikey={68372f035a4d545c305c57647c620ffc}'
        }).then(function(response) {
            if (response.status === 200) {
                $log.log('Got 200, going to log response.data:\n', response.data);
                $log.log(response);
                return response.data;
            } else {
                $log.log('Something went wrong, going to log response.status:\n\n', response.status);
                $log.log('\n\nNow logging response.data:\n', response.data);
            }
        });
    };

    this.getSongs = function(artist, song) {
        return $http({
            method: 'GET',
            url: 'https://api.vagalume.com.br/search.php?artmus=' + artist + '&apikey={68372f035a4d545c305c57647c620ffc}'
        }).then(function(response) {
            if (response.status === 200) {
                $log.log('Got 200, going to log response.data:\n', response.data);
                $log.log(response);
                return response.data;
            } else {
                $log.log('Something went wrong, going to log response.status:\n\n', response.status);
                $log.log('\n\nNow logging response.data:\n', response.data);
            }
        });
    };

    this.htmlEncode = function HtmlEncode(s) {
        var el = document.createElement("div");
        el.innerText = el.textContent = s;
        s = el.innerHTML;
        return s;
    };
}

angular.module('App').service('MainService', MainService);
