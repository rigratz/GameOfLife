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
  var that = this;
  (function gameLoop() {
      that.loop();
      requestAnimFrame(gameLoop, that.ctx.canvas);
  })();
}
Life.prototype.loop = function() {
  this.clockTick = this.timer.tick();
  this.update();
  this.draw();
  console.log(loopnum);
  console.log(loopnum);
  console.log(loopnum);
  console.log(loopnum);
  console.log(loopnum++);
}

Life.prototype.update = function() {
  //if (loopnum < 10) console.log(this.field);

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
      //console.log(neighbors);
      //console.log(i);
      //console.log(j);
      // if (2 <= neighbors <= 3) {
      //   this.field[i][j] = "Alive";
      // } else {
      //   this.field = "Dead";
      // }
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
      //console.log(this.field[i][j]);
      var status = this.field[i][j];
      // ctx.save();
      // if (status === "Alive") {
      //   ctx.fillStyle = "Blue";
      // } else if (status === "Dead"){
      //   ctx.fillStyle = "Green"
      // } else if (status = "Barren") {
      //   ctx.fillStyle = "White"
      // }
      // ctx.fillRect(i*10, j*10, 10, 10);
      // ctx.restore();
    }
  }
}
Life.prototype.draw = function() {
  ctx.clearRect(0,0,800, 650);
  ctx.save();
  //console.log("drawing");
  for (var i = 0; i < 80; i++) {
    for (var j = 0; j < 65; j++) {
      var status = conway.field[i][j];
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

var conway = new Life(ctx);
conway.start();
// var that = conway;
// (function gameLoop() {
//     that.loop();
//     requestAnimFrame(gameLoop, ctx.canvas);
// })();
