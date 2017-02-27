app.controller('mainCtrl', function($http,$location, $scope, $timeout, $interval, authFactory, beetFactory, playFactory,user) {


  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })
  $scope.grid = 16;
  let grid = $scope.grid
  let intervalId = 0; // becomes the setInterval id
  $scope.bpm = 90
  $scope.playing = false
  // $scope.instruments = instruments
  let instruments =  {}

  //1. play and establish timing
  $scope.play = () => {
      $scope.playing = true
      // console.log($scope.bpm)
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

    }

    $scope.changeValue = (beet)=>{

      if(beet.value) {
        beet.value = false

      } else {
        beet.value = true
      }

    }

$scope.plusTempo = () => {
  console.log("plus")
  $scope.bpm = $scope.bpm + 4
}
$scope.minusTempo = () => {
  console.log("minus")
  $scope.bpm = $scope.bpm - 4
}

// MUTE FEATURE
$scope.mute= (instrument)=> {
  Object.defineProperty(instrument, 'muted', {
    value: !instrument.muted, enumerable: false
  })

  // instrument.muted = !instrument.muted
  const name = instrument[0].name
  let newName = name.replace('0','')
  console.log("hey", newName )
  playFactory.toggleMute(newName, instrument.muted)
}
  $scope.newBeet = () => {
    // $scope.stop()
       instruments = {
          hihat: {},
          kick: {},
          openhihat: {},
          snare: {}
        }
        //adding files to instruments object
      for (name in instruments) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
      Object.defineProperty(instruments[name], 'muted', {
          value: false, enumerable: false, writable: true
        })
        for (var i = 0; i < grid; i++) {
          instruments[name][i] = {
            name: name + i,
            value: false,
            playing: false
          }
        } // end grid for loop
      } //end sounds for in loop


      return $scope.instruments = instruments
    } // end newBeet
  $scope.newBeet()

$scope.checkAuth = ()=> {
  if (!user) {
    var $toastContent = $('<span>Login to Save/View your BEETZ</span>');
    Materialize.toast($toastContent, 3500);
  } else {
    $location.url('/beetGarden')
  }
}

if (!user) {
  var $toastContent = $('<span>Login to Save/View your BEETZ</span>');
  Materialize.toast($toastContent, 3500);
}


// $scope.instruments =  playFactory.newBeet()

//stop
$scope.stop = () => {
    clearInterval(intervalId)
    $scope.playing = false
  }

  //save pattern and convert to object
$scope.save = function() {
   var $toastContent = $('<span class="toast">Beet Saved</span>');
    Materialize.toast($toastContent, 1000);
  let uid = $scope.UID
  let beetName = $scope.loopName
  let bpm = $scope.bpm
  let savedInstruments = $scope.instruments

  beetFactory.save(uid,beetName,bpm, savedInstruments,grid)
}

    // MUTE FEATURE
$scope.mute= (instrument)=> {

  instrument.muted = !instrument.muted
  const name = instrument[0].name
  let newName = name.replace('0','')
  console.log("hey", newName )
  console.log("muting:", newName)
  playFactory.toggleMute(newName, instrument.muted)
}

//set interval which calls a set timeout


  //loads last saved beet ---SAVE
  // $scope.loadFB = function() {
  //     beetFactory.load().then((userBeets) => {
  //       console.log("loading?")
  //       $scope.savedToPlay(userBeets)

  //     })
  // }
  //     // $http.get(`https://beet-35be8.firebaseio.com/userBeets.json`)


});
