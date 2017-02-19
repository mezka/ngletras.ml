function MainService($http, $log) {

    this.getData = function(query) {
        return $http({
            method: 'GET',
            url: 'https://api.vagalume.com.br/' + query + '&apikey={68372f035a4d545c305c57647c620ffc}'
        }).then(function(response) {
            if (response.status === 200)
                return response.data;
        });
    };


    this.queryMaker = function(artist, song, type, limit){

      function htmlEncode(s) {
          var el = document.createElement("div");
          el.innerText = el.textContent = s;
          s = el.innerHTML;
          return s;
      }


      artist = htmlEncode(artist);
      song = htmlEncode(song);

      switch(type){
        case 'excerpt':
          return 'search.excerpt?q=' + song + '&limit=' + limit;
        case 'artistMusic':
          return 'search.artmus?q=' + artist + '&limit=' + limit;
        case 'lyrics':
          return 'search.php?art=' + artist + '&mus=' + song;
      }
    };
}

angular.module('App').service('MainService', MainService);
