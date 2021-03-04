// Main game logic

const xVelocity = 4
const yVelocity = 2
const paddleSpeed = 6
// How far the ball will spawn from the wall
const spawnPadding = 20

// Store the time when the last frame was rendered
let lastFrameTime = 0
// Store the ball's current velocity
let ballMovement = [0, 0]
// Are the paddles moving?
let paddleMovement = [0, 0]
// Store the state of the game
let gameState = 'stopped'
// Store the gamemode
let gameMode = 'firstTo10'
// Store who won when the ball passes a paddle
let winner = ''
// Store the player scores, left -> right
let scores = [0, 0]
let paddleColor = new Color(255, 255, 255)
let divider = new Sprite(199.5, topWall, 1, 225 - topWall - (225 - bottomWall),
  null, 10, new Color(255, 64, 64))
let ball = new Sprite(50, 50, 10, 10, new Color(127, 255, 0),
  5, new Color(80, 100, 0), new Color(4, 255, 54))
ball.hidden = true
let leftPaddle = new Sprite(leftWall, 20, 6, paddleHeight, paddleColor,
    5, new Color(80, 80, 160), new Color(80, 80, 205))
let rightPaddle = new Sprite(rightWall, 20, 6, paddleHeight, paddleColor, 5, new Color(160, 80, 80), new Color(205, 80, 80))
resetPaddles()

// Runs before every frame is drawn on-screen
function gameLoop () {
  // Get the time that this frame was rendered
  let currentTime = performance.now()
  // Calculate the time difference from last frame
  let frameDelta = currentTime - lastFrameTime
  // Calculate how much to speed up / slow down the game
  let speedMultiplier = calculateSpeedMultiplier(frameDelta)
  // Store the time that this frame was rendered
  lastFrameTime = currentTime
  if (gameState === 'stopped') {
    // Show welcome screen
    drawWelcome()
  } else if(gameState === 'gameover') {
    // Show game over screen
    drawGameOver()
  } else if (gameState === 'starting') {
    // Show starting screen
    drawStarting()
  } else if(gameState === 'victory') {
    // Show victory screen
    drawVictory()
  } else {
    if (gameState === 'playing') {
      if (gameMode === 'bot') {
        doBotTick()
      }
      checkCollisions()
    } else if (gameState === 'failed') {
      if (ball.checkLeftPass(0 - ball.size.w) ||
      ball.checkRightPass(400 + ball.size.w)) {
        console.log('Game over')
        // Increment winner's score
        if (winner === 'l') {
          scores[0]++
        } else {
          scores[1]++
        }
        if (gameMode === 'firstTo10' && (scores[0] > 9 || scores[1] > 9)) {
          // Play winner sound
          soundEffects["winner"].play()
          // Set game state
          gameState = 'victory'
        } else {
          // Play goal sound
          soundEffects["goal"].play()
          // Set game state
          gameState = 'gameover'
        }
        // Hide the ball in case it's still on-screen
        ball.hidden = true
      }
    }
    doMovementTick(speedMultiplier)
    doPaddleTick(speedMultiplier)
    draw()
  }
  requestAnimationFrame(gameLoop)
}

function checkCollisions() {
  if(!ball.checkBounds(topWall, bottomWall)) {
    // Ball hit the top or bottom
    console.log('Horizontal collision')
    ballMovement[1] = -ballMovement[1]
    soundEffects["borderHit"].play()
    // Make ball flash
    ball.flash()
  }
  if(ball.checkLeftPass(leftWall + leftPaddle.size.w)) {
    if (!ball.checkVerticalCollision(leftPaddle)) {
      // The left paddle failed to deflect the ball
      // Set the game state
      gameState = 'failed'
      // Store that the right player won
      winner = 'r'
    } else if(ballMovement[0] < 0) {
      // Make the ball bounce off the paddle
      ballMovement[0] = xVelocity * (Math.random() * 1 + 0.6)
      console.log('Left bounce')
      soundEffects["ballHit1"].play()
      // Flash the left paddle
      leftPaddle.flash()
    }
  }
  if(ball.checkRightPass(rightWall)) {
    if(!ball.checkVerticalCollision(rightPaddle)) {
      // The right paddle failed to deflect the ball
      // Store that the left player won
      winner = 'l'
      // Set the game state
      gameState = 'failed'
    } else if(ballMovement[0] > 0) {
      // Make the ball bounce off the paddle
      ballMovement[0] = -xVelocity * (Math.random() * 1 + 0.6)
      console.log('Right bounce')
      soundEffects["ballHit2"].play()
      // Flash the right paddle
      rightPaddle.flash()
    }
  }
}

function doMovementTick(speedMultiplier) {
  let left, right
  if (gameState === 'playing') {
    left = leftWall
    right = rightWall
  } else {
    left = 0 - ball.size.w
    right = 400 + ball.size.w
  }
  // Restrict the ball to the play area on the X and Y axis
  ball.move(Math.max(left, Math.min(right, ball.position.x +
    ballMovement[0] * speedMultiplier)),
    Math.max(topWall, Math.min(bottomWall, ball.position.y +
    ballMovement[1] * speedMultiplier)))
}

function doPaddleTick (speedMultiplier) {
  if (paddleMovement[0] === 1) {
    leftPaddle.move(null, Math.min(leftPaddle.position.y + paddleSpeed
      * speedMultiplier, bottomWall - leftPaddle.size.h))
  } else if (paddleMovement[0] === 2) {
    leftPaddle.move(null, Math.max(leftPaddle.position.y - paddleSpeed *
      speedMultiplier, topWall))
  }
  if (paddleMovement[1] === 1) {
    rightPaddle.move(null, Math.min(rightPaddle.position.y + paddleSpeed
      * speedMultiplier, bottomWall - rightPaddle.size.h))
  } else if (paddleMovement[1] === 2) {
    rightPaddle.move(null, Math.max(rightPaddle.position.y - paddleSpeed
      * speedMultiplier, topWall))
  }
}

function randomFieldCoords (leftHalf) {
  const randomX = random(leftWall + leftPaddle.size.w + spawnPadding,
  rightWall - rightPaddle.size.w - spawnPadding)
  const randomY = random(topWall + spawnPadding, bottomWall - spawnPadding)
  return {x: randomX, y: randomY}
}

function resetPaddles () {
  // Reset the paddles to half the screen
  leftPaddle.move(null, 225 / 2 - leftPaddle.size.h / 2)
  rightPaddle.move(null, 225 / 2 - rightPaddle.size.h / 2)
}

function startGame () {
  // Game over sound may still be playing
  stopSoundEffects()
  // Play sound effect
  soundEffects["placingBall"].play()
  // Show ball
  ball.hidden = false
  // Move ball to random place
  let randomCoords = randomFieldCoords()
  ball.move(randomCoords.x, randomCoords.y)
  // Set the ball X velocity
  if (randomCoords.x > 200) {
    ballMovement[0] = -xVelocity
  } else {
    ballMovement[0] = xVelocity
  }
  // Set the ball Y velocity
  if (Math.random() > 0.5) {
    ballMovement[1] = yVelocity
  } else {
    ballMovement[1] = -yVelocity
  }
  resetPaddles()
  gameState = 'playing'
}

function showStart () {
  gameState = 'starting'
  disableButtons()
}

function resetGame () {
  scores[0] = 0
  scores[1] = 0
  resetPaddles()
  ball.hidden = true
  gameState = 'stopped'
  enableButtons()
}

buttons['freeplay'].onclick = function() {
  if (gameState === 'stopped') {
    // Set game mode
    gameMode = 'normal'
    showStart()
    // Play sound effect
    soundEffects['menuSelect'].play()
  }
}

buttons['firstTo10'].onclick = function() {
  if (gameState === 'stopped') {
    // Set game mode
    gameMode = 'firstTo10'
    showStart()
    // Play sound effect
    soundEffects['menuSelect'].play()
  }
}

buttons['bot'].onclick = function() {
  if (gameState === 'stopped') {
    // Set game mode
    gameMode = 'bot'
    showStart()
    // Play sound effect
    soundEffects['menuSelect'].play()
  }
}

resize()
document.body.onresize = resize
gameLoop()

window.ballMovement = ballMovement
window.paddleMovement = paddleMovement
window.ball = ball
window.rightPaddle = rightPaddle
window.leftWall = leftWall
window.rightWall = rightWall
window.topWall = topWall
window.bottomWall = bottomWall
window.setGameState = function (s) {
  gameState = s
}
window.getGameState = function () {
  return gameState
}
