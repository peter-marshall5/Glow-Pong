function onkeydown (e) {
  //console.log('Key down:', e.code)
  switch (e.code) {
    case 'Space':
      console.log('Space pressed')
      if (gameState === 'gameover' || gameState === 'stopped') {
        startGame()
      }
      break;
    case 'ArrowUp':
      console.log('Up arrow pressed')
      paddleMovement[1] = 2
      break;
    case 'ArrowDown':
      console.log('Down arrow pressed')
      paddleMovement[1] = 1
      break;
    case 'KeyW':
      console.log('W key pressed')
      paddleMovement[0] = 2
      break;
    case 'KeyS':
      console.log('S key pressed')
      paddleMovement[0] = 1
      break;
    default:

  }
}

function onkeyup (e) {
  //console.log('Key up:', e.code)
  switch (e.code) {
    case 'ArrowUp':
      console.log('Up arrow released')
      paddleMovement[1] = 0
      break;
      case 'ArrowDown':
      console.log('Down arrow released')
      paddleMovement[1] = 0
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

window.addEventListener('keydown', onkeydown)
window.addEventListener('keyup', onkeyup)
