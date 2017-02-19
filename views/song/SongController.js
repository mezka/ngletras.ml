function SongController($scope, $stateParams, $log){
  $log.log('Loading SongController...');

  $scope.songs = $stateParams.searchObj.response.docs;

  $scope.showParams = function(){
    $log.log($stateParams.searchObj.response.docs);

  };
}


App.controller('SongController', SongController);
