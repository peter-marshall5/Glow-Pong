// Handles all graphics

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
let cWidth = 0
let cHeight = 0

let backgroundColor = ''
let textColor = new Color(255, 255, 255)
let textBlurColor = new Color(100, 80, 80)
let spriteColor = new Color(255, 128, 128)
let textBlur = 30
let textOffset = 400 / 4 - 20

function resize() {
  // Check if width or height should be scaled according to resolution
  if(document.body.clientWidth / 16 * 9 > document.body.clientHeight) {
    // In landscape
    cHeight = document.body.clientHeight
    // Find height based on width
    cWidth = cHeight / 9 * 16
  } else {
    // In portrait
    cWidth = document.body.clientWidth
    // Find width based on height
    cHeight = cWidth / 16 * 9
  }
  canvas.width = cWidth
  canvas.height = cHeight
  backgroundColor = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.width / 2, canvas.height / 2, 0)
  backgroundColor.addColorStop(0, 'rgba(17,17,17,1)')
  backgroundColor.addColorStop(1, 'rgba(24,24,24,1)')
}

function draw (faded) {
  ctx.fillStyle = backgroundColor
  ctx.globalAlpha = 1
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if (faded) {
    ctx.globalAlpha = 0.4
  }
  for (let i = 0; i < sprites.length; i++) {
    sprites[i].draw()
  }
  drawText('Score', 0, 6, 6)
  // Draw blue / left score
  drawText(scores[0], -textOffset, 20, 20, new Color(30, 80, 255))
  // Draw red / right score
  drawText(scores[1], textOffset, 20, 20, new Color(255, 30, 30))
  ctx.globalAlpha = 1
}

function drawSprite (that) {
  if (that.hidden) {
    return
  }
  let coordMap = {
    start: convertCoords(that.position.x, that.position.y),
    size: convertCoords(that.size.w, that.size.h)
  }
  if (that.flashing) {
    that.flashIntensity += 0.2
    if(that.flashIntensity > 1) {
      that.flashIntensity = 1
      that.flashing = false
    }
  } else if (that.flashIntensity > 0) {
    that.flashIntensity -= 0.1
    if(that.flashIntensity < 0) {
      that.flashIntensity = 0
    }
  }
  // Set color
  ctx.fillStyle='rgb('
   + that.color.r + ','
   + that.color.g + ','
   + that.color.b + ')'
  if (that.flashIntensity > 0) {
    // Add glow
    // Don't oversaturate glow at first
    ctx.shadowColor = 'rgba('
     + that.flashColor.r + ','
     + that.flashColor.g + ','
     + that.flashColor.b + ','
     + (that.flashIntensity * 0.8) + ')'
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
    const blurRadius = convertCoords(that.blurRadius).x
    // Add glow
    ctx.shadowColor = 'rgb('
     + that.blurColor.r + ','
     + that.blurColor.g + ','
     + that.blurColor.b + ')'
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
  const coordMap = convertCoords(x, y)
  // Set font size
  ctx.font = convertCoords(fontSize, 0).x + 'px sans-serif'
  // Measure size of text
  const textSize = ctx.measureText(message)
  // Find center of canvas
  const center = (canvas.width / 2) - (textSize.width / 2)
  // Set color
  ctx.fillStyle='rgb('
   + color.r + ','
   + color.g + ','
   + color.b + ')'
   // Add glow
   ctx.shadowColor = 'rgb('
    + color.r + ','
    + color.g + ','
    + color.b + ')'
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
  if (winner === 'l') {
    drawText('Blue wins', 0, 110, 10)
  } else {
    drawText('Red wins', 0, 110, 10)
  }
  drawText('Press space to continue', 0, 200, 8)
}

function drawVictory () {
  draw(true)
  drawText('VICTORY!', 0, 60, 30)
  if (winner === 'l') {
    drawText('Blue wins', 0, 110, 10)
  } else {
    drawText('Red wins', 0, 110, 10)
  }
  drawText('Press space to continue', 0, 200, 8)
}

function drawButton (button) {
  let coordMap = {
    start: convertCoords(button.x, button.y),
    size: convertCoords(button.w, button.h)
  }
  const center = (canvas.width / 2) - (coordMap.size.x / 2)
  ctx.drawImage(button.img.img, center + coordMap.start.x, coordMap.start.y,
    coordMap.size.x, coordMap.size.y)
}

function drawWelcome () {
  draw(true)
  drawText('Pong Game', 0, 60, 30)
  drawText('by Peter Marshall', 0, 77, 7)
  buttons["freeplay"].draw()
  buttons["firstTo10"].draw()
  buttons["bot"].draw()
  drawText('Controls:', 0, 190, 10)
  drawText('Esc: Back to menu', 0, 200, 7)
  drawText('W and S: Move left paddle', 0, 208, 7)
  drawText('Up and Down arrows: Move right paddle', 0, 215, 5)
}

function drawStarting () {
  draw(true)
  drawText('Game over!', 0, 60, 30)
  if (winner === 'l') {
    drawText('Blue wins', 0, 110, 10)
  } else {
    drawText('Red wins', 0, 110, 10)
  }
  drawText('Press space to continue', 0, 200, 8)
}
