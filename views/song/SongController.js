function SongController($scope, $stateParams, $log){
  $log.log('Loading SongController...');

  $scope.showParams = function(){
    $log.log($stateParams);
  };
}


App.controller('SongController', SongController);
