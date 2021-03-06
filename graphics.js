// Handles all graphics

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const leftWall = 20
const rightWall = 374
const topWall = 20
const bottomWall = 205
const paddleHeight = 50

let backgroundColor = ''
const textColor = new window.Color(255, 255, 255)
const textBlurColor = new window.Color(100, 80, 80)
const spriteColor = new window.Color(255, 128, 128)
const textBlur = 30
const textOffset = 400 / 4 - 20
let cWidth = 0
let cHeight = 0

function resize () {
  // Check if width or height should be scaled according to resolution
  if (window.innerWidth / 16 * 9 > window.innerHeight) {
    // The screen is
    // In landscape
    cHeight = window.innerHeight
    // Find height based on width
    cWidth = window.innerHeight / 9 * 16
  } else {
    // In portrait
    cWidth = window.innerWidth
    // Find width based on height
    cHeight = cWidth / 16 * 9
  }
  console.log(cWidth, cHeight, window.innerWidth, window.innerHeight)
  canvas.style.width = cWidth + 'px'
  canvas.style.height = cHeight + 'px'
  canvas.width = cWidth * window.devicePixelRatio
  canvas.height = cHeight * window.devicePixelRatio
  backgroundColor = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.width / 2, canvas.height / 2, 0)
  backgroundColor.addColorStop(0, 'rgba(17,17,17,1)')
  backgroundColor.addColorStop(1, 'rgba(24,24,24,1)')
}

function draw (faded) {
  ctx.fillStyle = backgroundColor
  ctx.globalAlpha = 1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (faded) {
    ctx.globalAlpha = 0.4
  }
  for (let i = 0; i < window.sprites.length; i++) {
    window.sprites[i].draw()
  }
  drawText('Score', 0, 6, 6)
  // Draw blue / left score
  drawText(window.scores[0], -textOffset, 20, 20, new window.Color(30, 80, 255))
  // Draw red / right score
  drawText(window.scores[1], textOffset, 20, 20, new window.Color(255, 30, 30))
  ctx.globalAlpha = 1
}

function drawSprite (that) {
  if (that.hidden) {
    return
  }
  const coordMap = {
    start: window.convertCoords(that.position.x, that.position.y),
    size: window.convertCoords(that.size.w, that.size.h)
  }
  if (that.flashing) {
    that.flashIntensity += 0.2
    if (that.flashIntensity > 1) {
      that.flashIntensity = 1
      that.flashing = false
    }
  } else if (that.flashIntensity > 0) {
    that.flashIntensity -= 0.1
    if (that.flashIntensity < 0) {
      that.flashIntensity = 0
    }
  }
  // Set color
  ctx.fillStyle = 'rgb(' +
    that.color.r + ',' +
    that.color.g + ',' +
    that.color.b + ')'
  if (that.flashIntensity > 0) {
    // Add glow
    // Don't oversaturate glow at first
    ctx.shadowColor = 'rgba(' +
      that.flashColor.r + ',' +
      that.flashColor.g + ',' +
      that.flashColor.b + ',' +
      (that.flashIntensity * 0.8) + ')'
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = that.flashIntensity * 30 + 10
    // Draw shadow twice to make glow brighter
    ctx.fillRect(coordMap.start.x, coordMap.start.y,
      coordMap.size.x, coordMap.size.y)
    ctx.fillRect(coordMap.start.x, coordMap.start.y,
      coordMap.size.x, coordMap.size.y)
  }
  if (that.blurRadius) {
    const blurRadius = window.convertCoords(that.blurRadius).x
    // Add glow
    ctx.shadowColor = 'rgb(' +
      that.blurColor.r + ',' +
      that.blurColor.g + ',' +
      that.blurColor.b + ')'
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = blurRadius
  }
  // Draw rectangle
  ctx.fillRect(coordMap.start.x, coordMap.start.y,
    coordMap.size.x, coordMap.size.y)
  // Remove glow
  ctx.shadowColor = ''
  ctx.shadowBlur = 0
}

function drawText (message, x, y, fontSize, color, blurColor) {
  color = color || textColor
  blurColor = blurColor || textBlurColor
  // Convert pixel measurement
  const coordMap = window.convertCoords(x, y)
  // Set font size
  ctx.font = window.convertCoords(fontSize, 0).x + 'px sans-serif'
  // Measure size of text
  const textSize = ctx.measureText(message)
  // Find center of canvas
  const center = (canvas.width / 2) - (textSize.width / 2)
  // Set color
  ctx.fillStyle = 'rgb(' +
    color.r + ',' +
    color.g + ',' +
    color.b + ')'
  // Add glow
  ctx.shadowColor = 'rgb(' +
    color.r + ',' +
    color.g + ',' +
    color.b + ')'
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.shadowBlur = textBlur
  // Draw text
  ctx.fillText(message, center + coordMap.x, coordMap.y)
  // Remove glow
  ctx.shadowColor = ''
  ctx.shadowBlur = 0
}

function drawGameOver () {
  draw(true)
  drawText('Game over!', 0, 60, 30)
  if (window.getWinner() === 'l') {
    drawText('Blue wins', 0, 110, 10)
  } else {
    drawText('Red wins', 0, 110, 10)
  }
  drawText('Press space to continue', 0, 200, 8)
}

function drawVictory () {
  draw(true)
  drawText('VICTORY!', 0, 60, 30)
  if (window.getWinner === 'l') {
    drawText('Blue wins', 0, 110, 10)
  } else {
    drawText('Red wins', 0, 110, 10)
  }
  drawText('Press space to continue', 0, 200, 8)
}

function drawButton (button) {
  const coordMap = {
    start: window.convertCoords(button.x, button.y),
    size: window.convertCoords(button.w, button.h)
  }
  const center = (canvas.width / 2) - (coordMap.size.x / 2)
  ctx.drawImage(button.img.img, center + coordMap.start.x, coordMap.start.y,
    coordMap.size.x, coordMap.size.y)
}

function drawWelcome () {
  draw(true)
  drawText('Pong Game', 0, 60, 30)
  drawText('by Peter Marshall', 0, 77, 7)
  window.buttons.freeplay.draw()
  window.buttons.firstTo10.draw()
  window.buttons.bot.draw()
  drawText('Controls:', 0, 190, 10)
  drawText('Esc: Back to menu', 0, 200, 7)
  drawText('W and S: Move left paddle', 0, 208, 7)
  drawText('Up and Down arrows: Move right paddle', 0, 215, 5)
}

function drawStarting () {
  draw(true)
  if (window.getGameMode() === 'normal') {
    drawText('Endless Mode', 0, 60, 30)
  } else if (window.getGameMode() === 'firstTo10') {
    drawText('First to 10', 0, 60, 30)
  } else if (window.getGameMode() === 'bot') {
    drawText('Play against Bot', 0, 60, 30)
  }
  drawText('Press space to begin', 0, 200, 8)
}

function calculateSpeedMultiplier (frameDelta) {
  const framerate = 1 / frameDelta * 1000
  const multiplier = (60 / framerate)
  return multiplier
}

window.resize = resize
window.canvas = canvas
window.drawButton = drawButton
window.drawSprite = drawSprite
window.leftWall = leftWall
window.rightWall = rightWall
window.topWall = topWall
window.bottomWall = bottomWall
window.paddleHeight = paddleHeight
window.spriteColor = spriteColor
window.drawGameOver = drawGameOver
window.drawVictory = drawVictory
window.drawWelcome = drawWelcome
window.drawStarting = drawStarting
window.calculateSpeedMultiplier = calculateSpeedMultiplier
window.getCwidth = function () {
  return cWidth
}
