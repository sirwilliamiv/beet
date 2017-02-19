app.controller('savedMainCtrl', function($http, $scope, $timeout, $interval, authFactory, beetFactory, playFactory, user) {
  console.log("savedMainCTrl")
  $scope.grid = 16;
  let grid = $scope.grid

  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })

  $scope.newBeet =(grid)=> {
    $scope.stop()

    $scope.instruments =  playFactory.newBeet(grid)
}
  $scope.loadSavedBeet = (instruments, bpm) => {
      let defaultBeet = {
        hihat:"",
        kick:"",
        openhihat:"",
        snare: ""
      };
      $scope.bpm = bpm

        //adding files to instruments object
      for (key in defaultBeet) {
        // add 16 tracks per row
        if (!instruments[key]) {
          instruments[key] = []
        }

        for (var i = 0; i < grid; i++) {


          instruments[key][i] = {
            name: [key] + i,
            value: instruments[key][i] || false
          }
        } // end grid for loop
      } //end sounds for in loop key in instruments

      return $scope.instruments = instruments

    } // end savedBeets

  $scope.loadSavedBeet(instruments, bpm)

  $scope.plusTempo = () => {
  console.log("plus")
  $scope.bpm = $scope.bpm + 4
}
$scope.minusTempo = () => {
  console.log("minus")
  $scope.bpm = $scope.bpm - 4
}

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
      playFactory.loadPattern(bpm, instruments, grid)
    }, measure)
  }
  $scope.stop = () => {
    clearInterval(intervalId)
  }

  //save pattern and convert to object
  $scope.save = function() {
    let uid = $scope.UID
    let beetName = $scope.loopName
    let bpm = $scope.bpm
    let savedInstruments = $scope.instruments

    beetFactory.save(uid, beetName, bpm, savedInstruments, grid)
  }
//change pattern
   $scope.changeValue = (beet)=>{
      console.log(beet)
      // let value = beet.value
      if(beet.value) {
        beet.value = false


      } else {

        beet.value = true
      }
      console.log("after", beet.value)
    }




});
