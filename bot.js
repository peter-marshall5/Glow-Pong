// Handles game bot in bot mode

const halfField = 400 / 2
const almostThere = 400 / 5 * 4
const safeArea = 5

// Store the predicted Y value
let predictedY = null
// The course of the ball may change slightly due to frame drops
let accuratelyPredictedY = false

function doBotTick () {
  if (ball.position.x > halfField) {
    if (!predictedY) {
      predictedY = predictBallPath()
    }
    if (ball.position.x > almostThere && !accuratelyPredictedY) {
      accuratelyPredictedY = true
      predictedY = predictBallPath()
    }
    if (predictedY < rightPaddle.position.y + safeArea) {
      paddleMovement[1] = 2
    } else if (predictedY > rightPaddle.position.y + rightPaddle.size.h
      - safeArea - ball.size.h) {
      paddleMovement[1] = 1
    } else {
      paddleMovement[1] = 0
    }
  } else {
    predictedY = null
    accuratelyPredictedY = false
    paddleMovement[1] = 0
  }
}

function predictBallPath () {
  if (ballMovement[0] < 0) {
    console.log('U')
    return
  }
  predictionX = ball.position.x
  predictionY = ball.position.y
  let predictionMovement = [ballMovement[0], ballMovement[1]]
  while (predictionX < rightPaddle.position.x) {
    // Move the invisible ball
    predictionX = Math.max(leftWall, Math.min(rightWall,
      predictionX + predictionMovement[0]))
      predictionY = Math.max(topWall, Math.min(bottomWall, predictionY +
      predictionMovement[1]))
    if (predictionY <= topWall || predictionY >= bottomWall - ball.size.h) {
      predictionMovement[1] = -predictionMovement[1]
    }
  }
  return predictionY
}
