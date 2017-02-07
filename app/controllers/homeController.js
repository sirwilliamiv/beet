app.controller('homeCtrl', function($http, $scope) {
  console.log("homeCtrl")

  const sounds = {
    Kick: 'BD.mp3',
    Snare: 'SN.mp3',
    HiHat: 'HH.mp3',
    OHiHat: 'openHH.mp3'
  };
  const grid = 16;
  $scope.play =(beat)=> {

    for(k in sounds){
      if(k === beat.name){

        beat.sample.play()

      }
    }
    // beat.sample.play((id)=> {
    //   debugger
    //   console.log("soundid", id)
    // })

    console.log("i should play sound from ", beat.name)
//     sound.play(function(soundId){
//     // do what you want with soundId
// });

  }
  $scope.sing = () => {
    let rows = []
    for (file in sounds) {

      //add sample
      let sample = new Howl({
          src: [`/assets/audio/beet/${sounds[file]}`],
          volume: 1.0
        })

        //combine sample and  name
      let track = {
          name: file,
          sample: sample
        }

        // add 16 tracks per row
      for (var i = 0; i < grid; i++) {
        rows.push(track)
      }
    } //end for in loop
    // return $scope.rows
    console.log(rows)
    $scope.rows = rows


}


});
