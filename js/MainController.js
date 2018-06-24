function MainController($scope, MainService, $state) {

    console.log('Loading MainController ...');

    $scope.searchObj = {
        band: '',
        title: '',
        clear: function(){
          this.band = '';
          this.title = '';
        }
    };

    var changeState = function(stateName, stateParams) {
        $state.go(stateName, stateParams);
    };

    $scope.searchMessage = '';

    $scope.search = function(bandIn, titleIn){

        $scope.searchObj.clear();

        if (!bandIn && !titleIn) {
        } else if (bandIn && titleIn) {
            changeState('lyrics', {
                band: bandIn,
                title: titleIn
            });
        }else if(!bandIn && titleIn){
            changeState('title', {
                title: titleIn
            });
        }else{
          changeState('band', {
              band: bandIn
          });
        }
    };
}




App.controller('MainController', MainController);
