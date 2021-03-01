const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
let cWidth = 0
let cHeight = 0

const leftWall = 20
const rightWall = 374
const topWall = 20
const bottomWall = 205
const paddleHeight = 50
const xVelocity = 4
const yVelocity = 2
const paddleSpeed = 6
// How far the ball will spawn from the wall
const spawnPadding = 20

// Store the ball's current velocity
let ballMovement = [0, 0]
// Are the paddles moving?
let paddleMovement = [0, 0]
// Store the state of the game
let gameState = 'stopped'
// Store who won when the ball passes a paddle
let winner = ''
// Store the player scores, left -> right
let scores = [0, 0]
let ball = new Sprite(50, 50, 10, 10, new Color(127, 255, 0),
  30, new Color(127, 255, 0))
let paddleColor = new Color(255, 255, 255)
let leftPaddle = new Sprite(leftWall, 20, 6, paddleHeight, paddleColor,
  5, paddleBlurColor)
let rightPaddle = new Sprite(rightWall, 20, 6, paddleHeight, paddleColor,
  5, paddleBlurColor)
let divider = new Sprite(199.5, topWall, 1, 225 - topWall - (225 - bottomWall),
  null, 10, new Color(255, 64, 64))

// Runs before every frame is drawn on-screen
function gameLoop () {
  if (gameState === 'stopped') {
    drawWelcome()
  } else if(gameState === 'gameover') {
    // Show game over screen
    drawGameOver()
  } else {
    if (gameState === 'playing') {
      checkCollisions()
    } else if (gameState === 'failed') {
      if (ball.checkLeftPass(0 - ball.size.w) ||
      ball.checkRightPass(400 + ball.size.w)) {
        console.log('Game over')
        // Set game state
        gameState = 'gameover'
        // Increment winner's score
        if (winner === 'l') {
          scores[0]++
        } else {
          scores[1]++
        }
        // Hide the ball in case it's still on-screen
        ball.hidden = true
      }
    }
    doMovementTick()
    doPaddleTick()
    draw()
  }
  requestAnimationFrame(gameLoop)
}

function checkCollisions() {
  if(!ball.checkBounds(topWall, bottomWall)) {
    // Ball hit the top or bottom
    console.log('Horizontal collision')
    ballMovement[1] = -ballMovement[1]
  }
  if(ball.checkLeftPass(leftWall + leftPaddle.size.w)) {
    if (!ball.checkVerticalCollision(leftPaddle)) {
      // The left paddle failed to deflect the ball
      // Set the game state
      gameState = 'failed'
      // Store that the right player won
      winner = 'r'
    } else {
      // Make the ball bounce off the paddle
      ballMovement[0] = xVelocity * (Math.random() * 1 + 0.6)
    }
  }
  if(ball.checkRightPass(rightWall)) {
    if(!ball.checkVerticalCollision(rightPaddle)) {
      // The right paddle failed to deflect the ball
      // Store that the left player won
      winner = 'l'
      // Set the game state
      gameState = 'failed'
    } else {
      // Make the ball bounce off the paddle
      ballMovement[0] = -xVelocity * (Math.random() * 1 + 0.6)
    }
  }
}

function doMovementTick() {
  let left, right
  if (gameState === 'playing') {
    left = leftWall
    right = rightWall
  } else {
    left = 0 - ball.size.w
    right = 400 + ball.size.w
  }
  // Restrict the ball to the play area on the X axis
  ball.move(Math.max(left, Math.min(right, ball.position.x + ballMovement[0])),
    Math.max(topWall, Math.min(bottomWall, ball.position.y + ballMovement[1])))
}

function doPaddleTick () {
  if (paddleMovement[0] == 1) {
    leftPaddle.move(null, Math.min(leftPaddle.position.y + paddleSpeed,
      bottomWall - leftPaddle.size.h))
  } else if (paddleMovement[0] == 2) {
    leftPaddle.move(null, Math.max(leftPaddle.position.y - paddleSpeed,
      topWall))
  }
  if (paddleMovement[1] == 1) {
    rightPaddle.move(null, Math.min(rightPaddle.position.y + paddleSpeed,
      bottomWall - rightPaddle.size.h))
  } else if (paddleMovement[1] == 2) {
    rightPaddle.move(null, Math.max(rightPaddle.position.y - paddleSpeed,
      topWall))
  }
}

function randomFieldCoords (leftHalf) {
  const randomX = random(leftWall + leftPaddle.size.w + spawnPadding,
  rightWall - rightPaddle.size.w - spawnPadding)
  const randomY = random(topWall + spawnPadding, bottomWall - spawnPadding)
  return {x: randomX, y: randomY}
}

function startGame () {
  ball.hidden = false
  let randomCoords = randomFieldCoords()
  ball.move(randomCoords.x, randomCoords.y)
  if (randomCoords.x > 200) {
    ballMovement[0] = -xVelocity
  } else {
    ballMovement[0] = xVelocity
  }
  if (Math.random() > 0.5) {
    ballMovement[1] = yVelocity
  } else {
    ballMovement[1] = -yVelocity
  }
  gameState = 'playing'
}

resize()
document.body.onresize = resize
//startGame()
gameLoop()
