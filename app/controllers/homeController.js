app.controller('homeCtrl', function($http, $scope, $timeout, $interval) {
  console.log("homeCtrl")

  const sounds = {
    kick: 'BD.mp3',
    snare: 'SN.mp3',
    hihat: 'HH.mp3',
    openhihat: 'openHH.mp3'
  };
  const grid = 16;
  const song = 8;

  let intervalId = 0; // becomes the setInterval id

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
  $scope.loadPattern = (beat) => {

    for (instrument in instruments) {
      for (let i = 0; i < grid; i++) {
        var sound = instruments[instrument][i].sample
        var value = instruments[instrument][i].value
        console.log("sound", instrument)
        $scope.playPatternSound(value, sound, i, $scope.play, beat)

      } //end for loop
    }

  }
  $scope.stop = () => {
    clearInterval(intervalId)
  }
  $scope.play = function() {
    console.log($scope.bpm)
    let time = 60000 / $scope.bpm
    let measure = time * 4
    let beat = time / 4

    intervalId = setInterval(() => {

      $scope.loadPattern(beat)

    }, measure)
    console.log("intervalId", intervalId)
  }




  $scope.playPatternSound = function(value, sound, i, playValue, beat) {
    setTimeout(function() {
      if (value) {
        console.log("playing")
        sound.play() //play sound
      }
    }, beat * i);
  }








});
