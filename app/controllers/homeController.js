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
  $scope.loadPattern = () => {
    console.log($scope.bpm)
    let time = 60000 / $scope.bpm
    let measure = time * 4
    let beat = time / 4
    for (instrument in instruments) {
      for (let i = 0; i < grid; i++) {
        var sound = instruments[instrument][i].sample
        var value = instruments[instrument][i].value
        console.log("sound", instrument)
        $scope.playPattern(value, sound, i, $scope.play, beat, measure)
      } //end for loop
    }
  }

  $scope.play = true
  $scope.stop = () => {
    return $scope.play = false
  }


  //how do i start measure 2????
  //
  let count = 0
  $scope.playPattern = function(value, sound, i,play,beat,measure) {

    setTimeout(function() {
      if (value) {
        console.log("playing")
        sound.play() //play sound
      }
      count = count + 1
    }, beat * i);
  }

  let queue = []

  // queue.push(setTimeout($scope.pattern, measure))




});
