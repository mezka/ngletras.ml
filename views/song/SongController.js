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
