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
  if (window.ballMovement[0] < 0) {
    randomlyMoved = false
    window.paddleMovement[1] = 0
    return
  }
  if (!randomlyMoved) {
    // Move randomly
    target = Math.random() * (window.bottomWall - window.topWall) + window.topWall
    // Don't move randomly again
    randomlyMoved = true
  }
  if (window.ball.position.x > halfField) {
    if (!predictedY) {
      predictedY = predictBallPath()
      target = predictedY + Math.random() * 2 * fuzziness - fuzziness
    }
    if (window.ball.position.x > almostThere && !accuratelyPredictedY) {
      accuratelyPredictedY = true
      predictedY = predictBallPath()
      target = predictedY
    }
  } else {
    predictedY = null
    accuratelyPredictedY = false
  }
  if (target < window.rightPaddle.position.y + safeArea) {
    window.paddleMovement[1] = 2
  } else if (target > window.rightPaddle.position.y + window.rightPaddle.size.h
    - safeArea - ball.size.h) {
    window.paddleMovement[1] = 1
  } else {
    window.paddleMovement[1] = 0
  }
}

function predictBallPath () {
  if (window.ballMovement[0] < 0) {
    return
  }
  let predictionX = window.ball.position.x
  let predictionY = window.ball.position.y
  const predictionMovement = [window.ballMovement[0], window.ballMovement[1]]
  while (predictionX < window.rightPaddle.position.x) {
    // Move the invisible ball
    predictionX = Math.max(window.leftWall, Math.min(window.rightWall,
      predictionX + predictionMovement[0]))
      predictionY = Math.max(window.topWall, Math.min(window.bottomWall, predictionY +
      predictionMovement[1]))
    if (predictionY <= window.topWall || predictionY >= window.bottomWall - window.ball.size.h) {
      predictionMovement[1] = -predictionMovement[1]
    }
  }
  return predictionY
}

window.doBotTick = doBotTick
