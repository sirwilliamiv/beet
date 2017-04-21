app.controller('mainCtrl', function($location, $scope, $timeout, $interval, authFactory, beetFactory, playFactory, user) {


  $scope.grid = 16;
  // let grid = $scope.grid
  $scope.bpm = 90
  $scope.playing = false
  let grid = $scope.grid
  let intervalId = 0; // becomes the setInterval id
  let instruments = {}

  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })

  //1. play and establish timing
  //  //1. play and establish timing
  $scope.play = () => {
   console.log(instruments)
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
  //version 2.0
//   $scope.play = () => {
//     $scope.playing = true
//     //establish timing
//     let measure = ((60000 / $scope.bpm) / 4) *  $scope.grid
//     playFactory.loadPattern($scope.bpm, instruments, $scope.grid)
//       //grabbing return value ID of interval before firing pattern
//     intervalId = setInterval(() => {
//       playFactory.loadPattern($scope.bpm, instruments, grid)
//     }, measure)
// //need a function which subtracts total time thru measure from end of measure
//   }

  //toggle individual beet value
  $scope.changeValue = (beet) => {
    if (beet.value) {
      beet.value = false
    } else {
      beet.value = true
    }
  }

  //tempo adjust
  $scope.plusTempo = () => {
    console.log("plus")
    $scope.bpm = $scope.bpm + 4
  }
  $scope.minusTempo = () => {
    console.log("minus")
    $scope.bpm = $scope.bpm - 4
  }



  $scope.newBeet = () => {
      if ($scope.playing) {
        $scope.stop()
      }
      instruments = {
          hihat: {},
          kick: {},
          openhihat: {},
          snare: {}
        }
        //adding files to instruments object
      for (name in instruments) {
        // adding muted property
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        Object.defineProperty(instruments[name], 'muted', {
          value: false,
          enumerable: false,
          writable: true
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

  //stop
  $scope.stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      $scope.playing = false
    }
  }

  //save pattern and convert to object
  $scope.save = function() {
    var $toastContent = $('<span class="toast">Beet Saved</span>');
    Materialize.toast($toastContent, 1000);
    let uid = $scope.UID
    let beetName = $scope.loopName
    let bpm = $scope.bpm
    let savedInstruments = $scope.instruments

    beetFactory.save(uid, beetName, bpm, savedInstruments, grid)
  }

  //user must be logged in to navigate to beetgarden
  $scope.checkAuth = () => {
      if (!user) {
        var $toastContent = $('<span>Login to Save/View your BEETZ</span>');
        Materialize.toast($toastContent, 3500);
      } else {
        $scope.stop()
        $location.url('/beetGarden')
      }
    }
    // UX to let user know to sign in to save beets
  if (!user) {
    var $toastContent = $('<span>Login to Save/View your BEETZ</span>');
    Materialize.toast($toastContent, 3500);
  }


  //loads last saved beet ---SAVE
  // $scope.loadFB = function() {
  //     beetFactory.load().then((userBeets) => {
  //       console.log("loading")
  //       $scope.savedToPlay(userBeets)

  //     })
  // }

  // MUTE FEATURE
  $scope.mute = (instrument) => {
    Object.defineProperty(instrument, 'muted', {
        value: !instrument.muted,
        enumerable: false
      })
      // instrument.muted = !instrument.muted <--muted becomes enumerable and is loaded visually
    const name = instrument[0].name
    let newName = name.replace('0', '')
    playFactory.toggleMute(newName, instrument.muted)
  }


});
