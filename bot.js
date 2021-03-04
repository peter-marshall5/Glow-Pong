// Handles game bot in bot mode

const halfField = 400 / 2
const almostThere = 400 / 4 * 3
// Safe area for ball to hit paddle
const safeArea = 5
// Fuzziness on first path prediction
const fuzziness = 40

// Store the predicted Y value
let predictedY = null
// The course of the ball may change slightly due to frame drops
let accuratelyPredictedY = false
// Did the paddle move randomly yet?
let randomlyMoved = false
// Store the target for the paddle
let target = 0

function doBotTick () {
  if (ballMovement[0] < 0) {
    randomlyMoved = false
    paddleMovement[1] = 0
    return
  }
  if (!randomlyMoved) {
    // Move randomly
    target = Math.random() * (bottomWall - topWall) + topWall
    // Don't move randomly again
    randomlyMoved = true
  }
  if (ball.position.x > halfField) {
    if (!predictedY) {
      predictedY = predictBallPath()
      target = predictedY + Math.random() * 2 * fuzziness - fuzziness
    }
    if (ball.position.x > almostThere && !accuratelyPredictedY) {
      accuratelyPredictedY = true
      predictedY = predictBallPath()
      target = predictedY
    }
  } else {
    predictedY = null
    accuratelyPredictedY = false
  }
  if (target < rightPaddle.position.y + safeArea) {
    paddleMovement[1] = 2
  } else if (target > rightPaddle.position.y + rightPaddle.size.h
    - safeArea - ball.size.h) {
    paddleMovement[1] = 1
  } else {
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

window.doBotTick = doBotTick
