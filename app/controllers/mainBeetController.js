app.controller('mainCtrl', function($http, $scope, $timeout, $interval, authFactory, beetFactory, playFactory,user) {

  console.log("homeCtrl")
  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })



  const samples = {
      hihat: new Howl({
        src: ['/assets/audio/beet/HH.mp3'],
        volume: 0.5,
        html5: true
      }),
      kick: new Howl({
        src: ['/assets/audio/beet/BD.mp3'],
        volume: 0.8,
        html5: true
      }),
      openhihat: new Howl({
        src: ['/assets/audio/beet/openHH.mp3'],
        volume: 0.5,
        html5: true
      }),
      snare: new Howl({
        src: ['/assets/audio/beet/SN.mp3'],
        volume: 0.8,
        html5: true
      })
    } //end samples object

  let grid = 16;
  let intervalId = 0; // becomes the setInterval id
  $scope.bpm = 90
  $scope.playing = false





  ///saved
  // $scope.savedToPlay = (instruments, bpm) => {
  //   let defaultBeet = {
  //   hihat: {},
  //   kick: {},
  //   openhihat: {},
  //   snare: {}
  // };
  //     $scope.bpm = bpm
  //       //adding files to instruments object
  //     for (key in samples) {
  //       // add 16 tracks per row
  //       for (var i = 0; i < grid; i++) {
  //         instruments[key][i] = {
  //           name: [key] + i,
  //           // sample: sample,
  //           value: instruments[key][i] || false,
  //           // bpm: instruments[key][i].bpm
  //         }
  //       } // end grid for loop
  //     } //end sounds for in loop key in instruments
  //     console.log(instruments)

  //     // return
  //     return $scope.instruments = instruments

  //   } // end savedBeets
  //
  //
  //   ///********DO NOT NEED BELOW
    //logged in or not determines which state to be in
//   $scope.pageLoad = (instruments) => {
// debugger
//     if (instruments = null || undefined) {
//       $scope.newBeet()
//     } else {

//       // $scope.savedToPlay(instruments, bpm)
//     }
//   }
// // console.log("instruments",instruments)
//   $scope.pageLoad(instruments,bpm)



  //1. play and establish timing
  $scope.play = function() {
      // $scope.playing = true
      console.log($scope.bpm)
        //establish timing
      let time = 60000 / $scope.bpm
      let measure = time * 4
      let bpm = time / 4
      $scope.loadPattern(bpm)
        //grabbing return value ID of interval before firing pattern
      intervalId = setInterval(() => {
        // let bpm = instruments.hihat.0.bpm
        // $scope.loadPattern(bpm)
        playFactory.loadPattern(bpm)
      }, measure)
      console.log("intervalId", intervalId)
    }
    //2. acquire sounds
  $scope.loadPattern = (bpm) => {
      for (instrument in $scope.instruments) {
        for (let i = 0; i < grid; i++) {

          var sound = instrument
          var value = $scope.instruments[instrument][i].value
          console.log("sound", instrument)
          $scope.playPatternSound(value, sound, i, bpm)
        } //end for loop
      } //end for in loop
    } //end loadPattern
    //3. play sound
  $scope.playPatternSound = function(value, sound, i, bpm) {

    setTimeout(function() {

      if (value) {
        console.log("playing")
        samples[sound].play() //play sound

      }
    }, bpm * i);
  }

  // samples.hihat.play()


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

          // previously track
          instruments[name][i] = {
            name: name + i,
            value: false
          }
        } // end grid for loop
      } //end sounds for in loop
      console.log(instruments)
        // return
      return $scope.instruments = instruments
    } // end newBeet

  //stop
  $scope.stop = () => {
    clearInterval(intervalId)
    $scope.playing = false
  }

  //save pattern and convert to object

  $scope.save = function() {
      let instruments = angular.copy($scope.instruments)
        // let instruments_ = Object.assign({}, $scope.instruments) <- does not deep copy object
      let user = {}
      user.UID = $scope.UID
      user.name = $scope.loopName
      user.bpm = $scope.bpm
      user.instruments = {}
      console.log("save")
      for (name in instruments) {
        user.instruments[name] = {}

        for (var i = 0; i < grid; i++) {
          if (instruments[name][i].value) {
            user.instruments[name][i] = instruments[name][i].value
          }
        } //end for loop
      } //end for in loop

      beetFactory.save(user).then((res) => {
        //last beet saved
        $scope.beetUID = res
      })
    } //end save function

  //loads last saved beet ---SAVE
  // $scope.loadFB = function() {
  //     beetFactory.load().then((userBeets) => {
  //       console.log("loading?")
  //       $scope.savedToPlay(userBeets)

  //     })
  // }
  //     // $http.get(`https://beet-35be8.firebaseio.com/userBeets.json`)


});
