app.controller('mainCtrl', function($http, $scope, $timeout, $interval, authFactory, beetFactory) {

  console.log("homeCtrl")
  authFactory.getUser().then((uid) => {
    $scope.UID = uid
  })

  const sounds = {
      hihat: 'HH.mp3',
      kick: 'BD.mp3',
      openhihat: 'openHH.mp3',
      snare: 'SN.mp3'
  };

  const grid = 16;
  let intervalId = 0; // becomes the setInterval id
  $scope.bpm = 90
  $scope.playing = false


//fresh beet
  $scope.newBeet = () => {
      let instruments = {
            hihat: {},
            kick: {},
            openhihat: {},
            snare: {}
        }
        //adding files to instruments object
      for (name in sounds) {
        // for (name in sounds[hits]) {
          let sample = new Howl({
              src: [`/assets/audio/beet/${sounds[name]}`],
              volume: 0.8,
              html5: true
            })
          for (var i = 0; i < grid; i++) {
            // previously track
            instruments[name][i] = {
              name: name + i,
              sample: sample,
              value: false
            }
          } // end grid for loop
        // } // end name in sounds[hits] loop
      } //end sounds for in loop
      console.log(instruments)
      // return
      return $scope.instruments = instruments
    } // end newBeet


  ///saved
  $scope.savedToPlay = (savedBeet) => {
      //adding files to instruments object
      for (key in savedBeet) {
        for (name in savedBeet[key]) {
          // add 16 tracks per row
          for (var i = 0; i < grid; i++) {

            let sample = new Howl({
              src: [`/assets/audio/beet/${key}+".mp3"`],
              volume: 0.8,
              html5: true
            })
            savedBeet[key][name][i] = {
              name:  savedBeet[key][name].name + i,
              sample: sample,
              value: savedBeet[key][name].value,
              bpm: savedBeet[key][name].bpm
            }
          } // end grid for loop
        } //end for in loop --name in key
      } //end sounds for in loop key in savedBeet
      console.log(savedBeet)

      // return
      return $scope.instruments = savedBeet

    } // end savedBeets



    //1. play and establish timing
  $scope.play = function() {
    $scope.playing = true
    console.log($scope.bpm)
      //establish timing
    let time = 60000 / $scope.bpm
    let measure = time * 4
    let bpm = time / 4
      //grabbing return value ID of interval before firing pattern
    intervalId = setInterval(() => {
      // let bpm = instruments.hihat.0.bpm
      $scope.loadPattern(bpm)
    }, measure)
    console.log("intervalId", intervalId)
  }
    //2. acquire sounds
  $scope.loadPattern = (bpm) => {
      for (instrument in $scope.instruments) {
        for (let i = 0; i < grid; i++) {
          var sound = $scope.instruments[instrument][i].sample
          var value = $scope.instruments[instrument][i].value
          console.log("sound", instrument)
          $scope.playPatternSound(value, sound, i, $scope.play, bpm)
        } //end for loop
      } //end for in loop
    } //end loadPattern
//3. play sound
  $scope.playPatternSound = function(value, sound, i, playValue, bpm) {
      setTimeout(function() {
        if (value) {
          console.log("playing")
          sound.play() //play sound
        }
      }, bpm * i);
    }

       //stop
  $scope.stop = () => {
      clearInterval(intervalId)
      $scope.playing = false
    }

    //save pattern and convert to object

  $scope.save = function() {
    debugger
    let instruments = angular.copy($scope.instruments)
    // let instruments_ = Object.assign({}, $scope.instruments)
      console.log("save")
      for (name in instruments) {
        for (var i = 0; i < grid; i++) {
//firebase : howler src is an array, reset to empty string to be accepted
          instruments[name][i].sample = ''
          instruments[name][i].UID = $scope.UID // .$$state.value
          instruments[name][i].name = $scope.loopName
          instruments[name][i].bpm = $scope.bpm

        } //end for loop
      } //end for in loop

      // $scope.saveThisBeet(instruments, $scope.UID) // .$$state.value)
      beetFactory.save(instruments, $scope.UID)
        .then((res) => {
          $scope.beetUID = res
        })
      // if($scope.playing) {
      //   $scope.savedToPlay(instruments)

      // }
    } //end save function



  // $scope.loadPattern = function() {
  //   beetFactory.load('-Kct9ztod7IdYbaZSUkM')
  //     // $http.get(`https://beet-35be8.firebaseio.com/userBeets.json`)
  //     .then((userBeets) => {

  //       $scope.userBeets = userBeets //  = allSavedBeets.data
  //      ********** $scope.savedToPlay($scope.userBeets)
  //     })






  //



  // get from firebase object
  //http://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array
  // users > add saved beet id to object
  //   post beet to firebase .then(beetid) => patch beetid to users UID

});
