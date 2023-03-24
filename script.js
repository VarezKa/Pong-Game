var canvas = document.getElementById("myCanvasPing");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height / 2;
var dx = 1;
var dy = -1;
var ballRadius = 10;
var paddleHeight = 75;
var paddleWidth = 10;
var paddleX1 = 0;
var paddleY1 = (canvas.height - paddleHeight) / 2;
var paddleX2 = canvas.width - paddleWidth;
var paddleY2 = (canvas.height - paddleHeight) / 2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
let startButton = document.querySelector(".game-buttons__start");
let restartButton = document.querySelector(".game-buttons__restart");
var interval;
startButton.addEventListener("click", startGame);
function startGame() {
  startButton.removeEventListener("click", startGame);
  interval = setInterval(draw, 10);
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("keydown", onkeydown, false);
  document.addEventListener("keyup", onkeyup, false);
}

// alert("PLAY");

function keyDownHandler(e) {
  if (e.keyCode == 40) {
    rightPressed = true;
  } else if (e.keyCode == 38) {
    leftPressed = true;
  }
}

function onkeydown(e) {
  if (e.keyCode == 83) {
    upPressed = true;
  } else if (e.keyCode == 87) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 40) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    leftPressed = false;
  }
}

function onkeyup(e) {
  if (e.keyCode == 83) {
    upPressed = false;
  } else if (e.keyCode == 87) {
    downPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX2, paddleY2, paddleWidth, paddleHeight);
  ctx.fillStyle = "#E22172";
  ctx.fill();
  ctx.closePath();
}

function drawLine() {
  ctx.beginPath();
  ctx.rect(canvas.width / 2, 0, 1, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle1() {
  ctx.beginPath();
  ctx.rect(paddleX1, paddleY1, paddleWidth, paddleHeight);
  ctx.fillStyle = "#2F77CB";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;

  if (x + dx < 0 + paddleWidth) {
    if (
      (y > paddleY1 && y < paddleY1 + paddleHeight) ||
      x > paddleX1 + ballRadius
    ) {
      dx = -dx;
    } else {
      restartGame();
    }
  }

  if (x + dx > canvas.width - ballRadius) {
    if (y > paddleY2 && y < paddleY2 + paddleHeight) {
      dx = -dx;
    } else {
      restartGame();
    }
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (rightPressed && paddleY2 < canvas.height - paddleHeight) {
    paddleY2 += 5;
  } else {
    if (leftPressed && paddleY2 > 0) {
      paddleY2 -= 5;
    }
  }

  if (upPressed && paddleY1 < canvas.height - paddleHeight) {
    paddleY1 += 5;
  } else {
    if (downPressed && paddleY1 > 0) {
      paddleY1 += -5;
    }
  }
  drawPaddle();
  drawPaddle1();
  drawLine();
}

function restartGame() {
  restartButton.style.background = "#e22172";
  restartButton.style.cursor = "pointer";
  clearInterval(interval);
  restartButton.addEventListener("click", () => {
    document.location.reload();
  });
}
