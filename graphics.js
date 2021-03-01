let textColor = new Color(255, 255, 255)
let textBlurColor = new Color(150, 100, 100)
let spriteColor = new Color(255, 128, 128)
let paddleBlurColor = new Color(160, 80, 80)
let textBlur = 30

function draw () {
  ctx.globalAlpha = 0.95
  ctx.fillStyle='black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha = 1
  divider.draw()
  ball.draw()
  leftPaddle.draw()
  rightPaddle.draw()
  drawText('Score', 0, 6, 6)
  drawText(scores[0], -50, 11, 11)
  drawText(scores[1], 50, 11, 11)
}

function drawSprite (that) {
  let coordMap = {
    start: convertCoords(that.position.x, that.position.y),
    size: convertCoords(that.size.w, that.size.h)
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
    // Stroke rectangle to add glow
    ctx.strokeRect(coordMap.start.x, coordMap.start.y,
    coordMap.size.x, coordMap.size.y)
  }
  // Set color
  ctx.fillStyle='rgb('
   + that.color.r + ','
   + that.color.g + ','
   + that.color.b + ')'
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
  draw()
  drawText('Game over!', 0, 60, 30)
  if (winner === 'l') {
    drawText('Left wins', 0, 110, 10)
  } else {
    drawText('Right wins', 0, 110, 10)
  }
  drawText('Press space to continue', 0, 200, 8)
}
