app.controller('mainCtrl', function($http, $scope, $timeout, $interval, authFactory, beetFactory, playFactory,user) {

  console.log("homeCtrl")
  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })
  let grid = 16;
  let intervalId = 0; // becomes the setInterval id
  $scope.bpm = 90
  $scope.playing = false

  //1. play and establish timing
  $scope.play = function() {
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
        // $scope.loadPattern(bpm)
        playFactory.loadPattern(bpm, instruments, grid)
      }, measure)
      console.log("intervalId", intervalId)
    }

  //fresh beet
  $scope.newBeet = () => {
      let instruments = {
          hihat: {},
          kick: {},
          openhihat: {},
          snare: {}
        }
        //adding files to instruments object
      for (name in instruments) {
        for (var i = 0; i < grid; i++) {
          instruments[name][i] = {
            name: name + i,
            value: false
          }
        } // end grid for loop
      } //end sounds for in loop
      console.log(instruments)

      return $scope.instruments = instruments
    } // end newBeet
$scope.newBeet()

//stop
$scope.stop = () => {
    clearInterval(intervalId)
    $scope.playing = false
  }

  //save pattern and convert to object
$scope.save = function() {
  let uid = $scope.UID
  let beetName = $scope.loopName
  let bpm = $scope.bpm
  let savedInstruments = $scope.instruments

  beetFactory.save(uid,beetName,bpm, savedInstruments,grid)
}




  //loads last saved beet ---SAVE
  // $scope.loadFB = function() {
  //     beetFactory.load().then((userBeets) => {
  //       console.log("loading?")
  //       $scope.savedToPlay(userBeets)

  //     })
  // }
  //     // $http.get(`https://beet-35be8.firebaseio.com/userBeets.json`)


});
