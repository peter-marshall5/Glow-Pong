// Handles key presses

function onkeydown (e) {
  //  console.log('Key down:', e.code)
  switch (e.code) {
    case 'Space':
      console.log('Space pressed')
      if (window.getGameState() === 'gameover' || window.getGameState() === 'starting') {
        startGame()
      }
      if (window.getwindow.getGameState() === 'victory') {
        resetGame()
      }
      break
    case 'ArrowUp':
      console.log('Up arrow pressed')
      if (gameMode !== 'bot') {
        window.paddleMovement[1] = 2
      } else {
        window.paddleMovement[0] = 2
      }
      break
    case 'ArrowDown':
      console.log('Down arrow pressed')
      if (gameMode !== 'bot') {
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
      if (window.getwindow.getGameState() !== 'stopped') {
        resetGame()
        // Play lose sound
        stopSoundEffects()
        soundEffects['menuCancel'].play()
      }
    default:
    break
  }
}

function onkeyup (e) {
  //console.log('Key up:', e.code)
  switch (e.code) {
    case 'ArrowUp':
      console.log('Up arrow released')
      if (gameMode !== 'bot') {
        window.paddleMovement[1] = 0
      } else {
        window.paddleMovement[0] = 0
      }
      break
      case 'ArrowDown':
      console.log('Down arrow released')
      if (gameMode !== 'bot') {
        window.paddleMovement[1] = 0
      } else {
        window.paddleMovement[0] = 0
      }
      break
    case 'KeyW':
      console.log('W key released')
      window.paddleMovement[0] = 0
      break;
    case 'KeyS':
      console.log('S key released')
      window.paddleMovement[0] = 0
      break
    default:
    break
  }
}

function onclick (e) {
  for (const i in window.buttons) {
    if (window.buttons[i].onclick && window.buttons[i].checkClick(e.offsetX, e.offsetY)) {
      window.buttons[i].onclick()
    }
  }
}

window.addEventListener('keydown', onkeydown)
window.addEventListener('keyup', onkeyup)
canvas.addEventListener('click', onclick)
