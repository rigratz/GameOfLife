//buttons.js

var canvas = document.getElementById("gol");
var ctx = canvas.getContext("2d");
var conway = new Life(ctx);
var cleared = true;

console.log("Get your magnifying glasses out Ninjas and take a closer look at life!");
function onload() {
  //var conway = new Life(ctx);
  var start = document.getElementById("Start");
  if (start.addEventListener) {
    start.addEventListener("click", function() {

      if (cleared) {
        conway.start();
        cleared = !cleared;
        //console.log("a nu start");
      }
    });
  }
  var pause = document.getElementById("Pause");
  if (pause.addEventListener) {
      pause.addEventListener("click", function() {
      //console.log(conway.playing);
      conway.playing = !conway.playing;
    });
  }
  var clear = document.getElementById("Clear");
  if (clear.addEventListener) {
      clear.addEventListener("click", function() {
      //console.log("Clear");
      conway.playing = false;
      ctx.save();
      ctx.clearRect(0,0,800,650);
      ctx.restore();
      cleared = true;
      conway = new Life(ctx);
    });
  }
}
function updateSlider(value) {
  conway.delay = Math.pow(0.25, value);
  conway.elapsed = 0;
  //console.log(conway.delay);
}



onload();
//console.log(conway);
