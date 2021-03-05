// Handles key presses

function onkeydown (e) {
  //  console.log('Key down:', e.code)
  switch (e.code) {
    case 'Space':
      console.log('Space pressed')
      if (window.getGameState() === 'gameover' || window.getGameState() === 'starting') {
        window.startGame()
      }
      if (window.getGameState() === 'victory') {
        window.resetGame()
      }
      break
    case 'ArrowUp':
      console.log('Up arrow pressed')
      if (window.getGameMode() !== 'bot') {
        window.paddleMovement[1] = 2
      } else {
        window.paddleMovement[0] = 2
      }
      break
    case 'ArrowDown':
      console.log('Down arrow pressed')
      if (window.getGameMode() !== 'bot') {
        window.paddleMovement[1] = 1
      } else {
        window.paddleMovement[0] = 1
      }
      break
    case 'KeyW':
      console.log('W key pressed')
      window.paddleMovement[0] = 2
      break
    case 'KeyS':
      console.log('S key pressed')
      window.paddleMovement[0] = 1
      break
    case 'Escape':
      console.log('Escape key pressed')
      // Stop the game if it's not stopped
      if (window.getGameState() !== 'stopped') {
        window.resetGame()
        // Play lose sound
        window.stopSoundEffects()
        window.soundEffects.menuCancel.play()
      }
      break
    default:
      break
  }
}

function onkeyup (e) {
  // console.log('Key up:', e.code)
  switch (e.code) {
    case 'ArrowUp':
      console.log('Up arrow released')
      if (window.getGameMode() !== 'bot') {
        window.paddleMovement[1] = 0
      } else {
        window.paddleMovement[0] = 0
      }
      break
    case 'ArrowDown':
      console.log('Down arrow released')
      if (window.getGameMode() !== 'bot') {
        window.paddleMovement[1] = 0
      } else {
        window.paddleMovement[0] = 0
      }
      break
    case 'KeyW':
      console.log('W key released')
      window.paddleMovement[0] = 0
      break
    case 'KeyS':
      console.log('S key released')
      window.paddleMovement[0] = 0
      break
    default:
      break
  }
}

function onclick (e) {
  if (window.getGameState() === 'gameover' || window.getGameState() === 'starting') {
    window.startGame()
  }
  if (window.getGameState() === 'victory') {
    window.resetGame()
  }
  for (const i in window.buttons) {
    if (window.buttons[i].onclick && window.buttons[i].checkClick(e.offsetX, e.offsetY)) {
      window.buttons[i].onclick()
    }
  }
}

const touchMargin = 60

function getTouchOffset (pageX, pageY) {
  const rect = window.canvas.getBoundingClientRect();
  return { x: pageX - rect.left, y: pageY - rect.top }
}

function processTouch (e) {
  let leftTouch = false
  let rightTouch = false
  for (let i = 0; i < e.touches.length; i++) {
    const offset = getTouchOffset(e.touches[i].pageX, e.touches[i].pageY)
    const coordMap = window.reverseConvertCoords(offset.x, offset.y)
    if (coordMap.x < touchMargin) {
      leftTouch = coordMap.y
    }
    if (coordMap.x > 400 - touchMargin) {
      rightTouch = coordMap.y
    }
  }
  return { l: leftTouch, r: rightTouch }
}

function handleTouch (e) {
  if (window.getGameState() !== 'playing') {
    return
  }
  const t = processTouch(e)
  if (t.l) {
    window.leftPaddle.move(null, Math.max(window.topWall,
      Math.min(window.bottomWall - window.leftPaddle.size.h,
      t.l - window.leftPaddle.size.h / 2)))
  }
  if (t.r && window.getGameMode() !== 'bot') {
    window.rightPaddle.move(null, Math.max(window.topWall,
      Math.min(window.bottomWall - window.rightPaddle.size.h,
      t.r - window.rightPaddle.size.h / 2)))
  }
}

function ontouchstart (e) {
  handleTouch(e)
}

function ontouchmove (e) {
  handleTouch(e)
}

function ontouchend (e) {
  const t = processTouch(e)
  if (!t.l) {
    touches.l = null
  }
  if (!t.r) {
    touches.r = null
  }
}

window.addEventListener('keydown', onkeydown)
window.addEventListener('keyup', onkeyup)
window.canvas.addEventListener('click', onclick)
window.canvas.addEventListener('touchstart', ontouchstart)
window.canvas.addEventListener('touchmove', ontouchmove)
window.canvas.addEventListener('touchend', ontouchend)
