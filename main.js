window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();
function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}
var loopnum = 0;
Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}
var canvas = document.getElementById("gol");
var ctx = canvas.getContext("2d");

function Life(context) {
  this.field = null;
  this.timer = new Timer();
  this.clockTick = 0;
  this.elapsed = 0;
  this.delay = 0.25;
  this.playing = false;
  this.ctx = context;
  this.randomlyGenerate();
}

Life.prototype.randomlyGenerate = function() {
  var r = 0;
  var line = [];
  var lines = [];
  for (var i = 0; i < 80; i++) {
    line = [];
    for (var j = 0; j < 65; j++) {
      r = Math.random();
      if (r < 0.1) {
        line.push("Alive");
      } else {
        line.push("Barren");
      }
    }
    lines.push(line);
  }
  this.field = lines;
}
Life.prototype.start = function() {
  this.playing = true;
  var that = this;
  (function gameLoop() {
      that.loop();
      requestAnimFrame(gameLoop, that.ctx.canvas);
  })();
}
Life.prototype.loop = function() {
  if (this.playing) {
    this.clockTick = this.timer.tick();
    this.elapsed += this.clockTick;
    if (this.elapsed > this.delay) {
      this.update();
      this.draw();
      this.elapsed = 0;
    }
  }
}

// Life.prototype.loadState = function(data) {
//   this.field = data.field;
//   //this.timer = data.timer;
//   //this.clockTick = data.clockTick;
//   //this.elapsed = data.elapsed;
//   this.delay = data.delay;
//   this.playing = data.playing;
//   this.ctx = data.ctx;
// }

Life.prototype.update = function() {

  var line = [];
  var lines = [];
  for (var i = 0; i < 80; i++) {
    line = [];
    for (var j = 0; j < 65; j++) {
      line.push(this.field[i][j]);
    }
    lines.push(line);
  }
  var old = lines;

  var neighbors = 0;
  for (var i = 0; i < 80; i++) {
    for (var j = 0; j < 65; j++) {
      //Check Neighbors
      neighbors = 0;
      if (i > 0 && old[i-1][j] === "Alive") {
        neighbors += 1;
      }
      if (i < 79 && old[i+1][j] === "Alive") {
        neighbors += 1;
      }
      if (j > 0 && old[i][j-1] === "Alive") {
        neighbors += 1;
      }
      if (i < 64 && old[i][j+1] === "Alive") {
        neighbors += 1;
      }
      if (i > 0 && j > 0 && old[i-1][j-1] === "Alive") {
        neighbors += 1;
      }
      if (i > 0 && j < 64 && old[i-1][j+1] === "Alive") {
        neighbors += 1;
      }
      if (i < 79 && j > 0 && old[i+1][j-1] === "Alive") {
        neighbors += 1;
      }
      if (i < 79 && j < 64 && old[i+1][j+1] === "Alive") {
        neighbors += 1;
      }

      //Determine if alive
      if (this.field[i][j] === "Alive") {
        if (neighbors === 2 || neighbors === 3) {
          this.field[i][j] = "Alive";
        } else {
          this.field[i][j] = "Dead";
        }
      } else {
        if (neighbors === 3) {
          this.field[i][j] = "Alive";
        }
      }
    }
  }
}

Life.prototype.draw = function() {
  ctx.clearRect(0,0,800, 650);
  ctx.save();
  //console.log("drawing");
  for (var i = 0; i < 80; i++) {
    for (var j = 0; j < 65; j++) {
      var status = this.field[i][j];
      if (status === "Alive") {
        ctx.fillStyle = "Blue";
      } else if (status === "Dead"){
        ctx.fillStyle = "Green"
      } else if (status = "Barren") {
        ctx.fillStyle = "White";
      }
      ctx.fillRect(i * 10, j * 10, 10, 10);
    }
  }
  ctx.restore();
}
