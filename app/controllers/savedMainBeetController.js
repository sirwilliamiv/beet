app.controller('savedMainCtrl', function($http, $scope, $timeout, $interval, authFactory, beetFactory, playFactory, user) {
console.log("savedMainCTrl")
 let grid = 16;

  $scope.savedToPlay = (instruments, bpm) => {
    let defaultBeet = {
    hihat: {},
    kick: {},
    openhihat: {},
    snare: {}
  };
      $scope.bpm = bpm
        //adding files to instruments object
      for (key in defaultBeet) {
        // add 16 tracks per row
        for (var i = 0; i < grid; i++) {
          instruments[key][i] = {
            name: [key] + i,
            // sample: sample,
            value: instruments[key][i] || false,
            // bpm: instruments[key][i].bpm
          }
        } // end grid for loop
      } //end sounds for in loop key in instruments
      console.log(instruments)

      // return
      return $scope.instruments = instruments

    } // end savedBeets

$scope.savedToPlay(instruments, bpm)

//1. play and establish timing
  $scope.play = function(instruments) {
      // $scope.playing = true
      console.log($scope.bpm)
        //establish timing
      let time = 60000 / $scope.bpm
      let measure = time * 4
      let bpm = time / 4
      playFactory.loadPattern(bpm, instruments, grid)
        //grabbing return value ID of interval before firing pattern
      intervalId = setInterval(() => {
        // let bpm = instruments.hihat.0.bpm
        playFactory.loadPattern(bpm, instruments, grid)
      }, measure)
      console.log("intervalId", intervalId)
    }
  $scope.stop = ()=>{
    clearInterval(intervalId)
  }



});
