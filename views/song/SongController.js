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
