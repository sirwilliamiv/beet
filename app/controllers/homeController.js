app.controller('homeCtrl', function($http, $scope, $timeout, $interval) {
  console.log("homeCtrl")

  const sounds = {
    kick: 'BD.mp3',
    snare: 'SN.mp3',
    hihat: 'HH.mp3',
    openhihat: 'openHH.mp3'
  };
  const grid = 16;
  $scope.playing = false


  // $scope.sing = () => {
  let instruments = {
      kick: [],
      snare: [],
      hihat: [],
      openhihat: []
    }
    //adding files to instruments object
  for (name in sounds) {
    let sample = new Howl({
        src: [`/assets/audio/beet/${sounds[name]}`],
        volume: 0.8,
        html5: true
      })
      //combine sample and  name
      // add 16 tracks per row
    for (var i = 0; i < grid; i++) {

      let track = {
          name: name + i,
          sample: sample
        }
        //add tracks to instruments object by name
      instruments[name].push(track)
    } // end grid for loop
  } //end sounds for in loop
  console.log(instruments)
    // return
  $scope.instruments = instruments

  // } //end sing

    //acquire sounds
$scope.aquire = () => {
      // var timing=  window.setInterval($scope.aquire,3200)

      for (instrument in instruments) {

        for (let i = 0; i < grid; i++) {
          var sound = instruments[instrument][i].sample
          var value = instruments[instrument][i].value
          console.log("sound", instrument)
          $scope.timeout(value, sound, i)

        } //end for loop

      }
    }
    // test if  value is true
  // $scope.play = (value, sound, i) => {
  //       if (value) {
  //        sound.play() //play sound
  //         console.log("playing")
  //       } else {}
  // }
  $scope.timeout= function(value,sound,i) {
    setTimeout(function() {
      if (value) {
        sound.play() //play sound
        console.log("i",i)
        console.log("value",value)
          // $timeout($scope.repeat, (400 * i))
      }
      console.log('calling timeout')
      // $scope.timeout(value,sound,i);
    }, 125 * i);
  }


  // // test 3 FAIL
  // $scope.play = () => {
  //   for (instrument in instruments) {
  //     $scope.playing = true
  //     for (var i = 0; i < grid; i++) {

  //       let tempo = 200 * i
  //       var sound = instruments[instrument][i].sample
  //       var value = instruments[instrument][i].value
  //         //test if  value is true
  //       if (value) {
  //         $timeout(function() {
  //             sound.play() //play sound
  //           }, tempo) // set time interval
  //       } else {
  //         $timeout(function() {}, tempo)
  //       }
  //     }

  //     $timeout($scope.play, 3200).flush() //
  //   }
  // }
  // test1 --FAIL
  // $scope.play = () => {
  //   for (instrument in instruments) {
  //     $scope.playing = true
  //     for (var i = 0; i < grid; i++) {

  //       let tempo = 200 * i
  //       let sound = instruments[instrument][i].sample
  //       let value = instruments[instrument][i].value
  //         //test if  value is true
  //       if (value) {
  //          switch (instruments[instrument]) {

  //            case 'kick':
  //               sound.play()
  //           break;
  //            default:
  //              instruments.hihat[0].sample.play()
  //           break;
  //         }

  //        } else {
  //         $timeout(function() {}, tempo)
  //       }
  //     }
  //     $timeout($scope.play, 3200) //
  //   }
  // }


  // test 2--FAIL//writing loop by hand
  // $scope.play = () => {
  //   for(var i = 0; i < 2; i++){

  //   instruments.kick[0].sample.play()
  // }
  // }
  //mess with it

  //   ///play the sound
  // $scope.play = (beat) => {
  //   //match beat to play
  //   for (k in sounds) {
  //     if (k === beat.name) {
  //       beat.sample.play()
  //     }
  //   }
  //   console.log("i should play sound from ", beat.name)
  // }

});
