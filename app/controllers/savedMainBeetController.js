app.controller('savedMainCtrl', function($http, $location, $scope, $timeout, $interval, authFactory, beetFactory, playFactory, user) {

  $scope.grid = 16;
  let grid = $scope.grid
  $scope.playing = false



//set UID
  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })

  $scope.newBeet = (grid) => {
    if ($scope.playing) {
      $scope.stop()
    }
    $scope.instruments = playFactory.newBeet(grid)
  }
  $scope.loadSavedBeet = (instruments, bpm) => {

      let defaultBeet = {
        hihat: "",
        kick: "",
        openhihat: "",
        snare: ""
      };

      $scope.loopName = name
      $scope.bpm = bpm

      //adding files to instruments object
      for (key in defaultBeet) {
        // add 16 tracks per row
        if (!instruments[key]) {
          instruments[key] = []
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        Object.defineProperty(instruments[key], 'muted', {
          value: false,
          enumerable: false,
          writable: true
        })

        for (var i = 0; i < $scope.grid; i++) {
          instruments[key][i] = {
            name: [key] + i,
            value: instruments[key][i] || false
          }
        } // end $scope.grid for loop
      } //end sounds for in loop key in instruments

      return $scope.instruments = instruments

    } // end savedBeets

  $scope.loadSavedBeet(instruments, bpm, name, data)

  $scope.plusTempo = () => {
    console.log("plus")
    $scope.bpm = $scope.bpm + 4
  }
  $scope.minusTempo = () => {
    console.log("minus")
    $scope.bpm = $scope.bpm - 4
  }

  //1. play and establish timing
    $scope.play = function(instruments,bpm) {
    $scope.playing = true
    // console.log($scope.bpm)
      //establish timing

    let time = 60000 / bpm
       // let measure = ((60000 / $scope.bpm) / 4) *  $scope.grid
    let measure = time * 4
    let rate = time/4
    playFactory.loadPattern(rate, instruments, grid)
      //grabbing return value ID of interval before firing pattern
    intervalId = setInterval(() => {

      playFactory.loadPattern(rate, instruments, grid)
    }, measure)
  }
  //version 2.0
 // $scope.play = () => {
 //    $scope.playing = true
 //    //establish timing
 //    let measure = ((60000 / $scope.bpm) / 4) *  $scope.grid

 //    playFactory.loadPattern($scope.bpm, instruments, $scope.grid)
 //      //grabbing return value ID of interval before firing pattern
 //    // intervalId = setInterval(() => {
 //    //   playFactory.loadPattern($scope.bpm, instruments, $scope.grid)
 //    // }, measure)

 //  }



  $scope.stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      $scope.playing = false
    }
  }

  //save pattern and convert to object
  $scope.save = function() {
      var $toastContent = $('<span>Beet Saved</span>');
      Materialize.toast($toastContent, 1000);

      let uid = $scope.UID
      let beetName = $scope.loopName
      let bpm = $scope.bpm
      let savedInstruments = $scope.instruments

      beetFactory.save(uid, beetName, bpm, savedInstruments, $scope.grid)
    }
    //change pattern
  $scope.changeValue = (beet) => {
    // console.log(beet)
    // let value = beet.value
    if (beet.value) {
      beet.value = false
    } else {
      beet.value = true
    }
    // console.log("after", beet.value)
  }

  $scope.checkAuth = () => {
    if (!user) {
      var $toastContent = $('<span>Login to Save/View your BEETZ</span>');
      Materialize.toast($toastContent, 3500);
    } else {
      $scope.stop()
      $location.url('/beetGarden')
    }
  }

  if (!user) {
    var $toastContent = $('<span>Login to Save/View your BEETZ</span>');
    Materialize.toast($toastContent, 3500);
  }

  // MUTE TRACK
  $scope.mute = (instrument) => {

    instrument.muted = !instrument.muted
    const name = instrument[0].name
    let newName = name.replace('0', '')
    playFactory.toggleMute(newName, instrument.muted)
  }
  //SELECT ALL IN TRACK
  $scope.selectAll = (instrument, grid) => {

  }




// version2.0
  //select all feature
  // $('.beet').click(function(e) {
  //   // debugger
  //   console.log("above")
  //     //   if(e.shiftKey) {
  //     // console.log("in")
  //     //     $scope.beet.value = true
  //     //   }
  // })
// verision 2.0
  //   function highlightPattern(value, sound, i, bpm, instruments, instrument) {

  //   bpm = (60000 / bpm) / 4; // lets bpm be updated dynamically

  //   setTimeout(() => {
  //     instruments[instrument][i].playing = true
  //     if (value) {
  //       samples[sound].play() //play sound
  //     }
  //   }, bpm * i);
  //   instruments[instrument][i].playing = false

  // }




});
