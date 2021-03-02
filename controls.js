// Handles key presses

function onkeydown (e) {
  //console.log('Key down:', e.code)
  switch (e.code) {
    case 'Space':
      console.log('Space pressed')
      if (gameState === 'gameover' || gameState === 'starting') {
        startGame()
      }
      if (gameState === 'victory') {
        resetGame()
      }
      break;
    case 'ArrowUp':
      console.log('Up arrow pressed')
      if (gameMode !== 'bot') {
        paddleMovement[1] = 2
      }
      break;
    case 'ArrowDown':
      console.log('Down arrow pressed')
      if (gameMode !== 'bot') {
        paddleMovement[1] = 1
      }
      break;
    case 'KeyW':
      console.log('W key pressed')
      paddleMovement[0] = 2
      break;
    case 'KeyS':
      console.log('S key pressed')
      paddleMovement[0] = 1
      break;
    case 'Escape':
      console.log('Escape key pressed')
      // Stop the game if it's not stopped
      if (gameState !== 'stopped') {
        resetGame()
        // Play lose sound
        stopSoundEffects()
        soundEffects['pause'].play()
      }
    default:

  }
}

function onkeyup (e) {
  //console.log('Key up:', e.code)
  switch (e.code) {
    case 'ArrowUp':
      console.log('Up arrow released')
      if (gameMode !== 'bot') {
        paddleMovement[1] = 0
      }
      break;
      case 'ArrowDown':
      console.log('Down arrow released')
      if (gameMode !== 'bot') {
        paddleMovement[1] = 0
      }
      break;
    case 'KeyW':
      console.log('W key released')
      paddleMovement[0] = 0
      break;
    case 'KeyS':
      console.log('S key released')
      paddleMovement[0] = 0
      break;
    default:

  }
}

function onclick (e) {
  for (var i in buttons) {
    if (buttons[i].onclick && buttons[i].checkClick(e.offsetX, e.offsetY)) {
      buttons[i].onclick()
    }
  }
}

window.addEventListener('keydown', onkeydown)
window.addEventListener('keyup', onkeyup)
canvas.addEventListener('click', onclick)
