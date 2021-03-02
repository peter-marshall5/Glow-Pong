// Handles sound effects

// Object to store sound effects
let soundEffects = {}
// Stores how many sound effects loaded so far
let soundEffectsLoaded = 0

class SoundEffect {
  constructor(url, name) {
    soundEffects[name] = this
    this.name = name
    this.url = url
    // Create media element
    this.audioElement = new Audio()
    // Set src property to URL of sound effect
    this.audioElement.src = url
  }

  play() {
    // Play the sound
    this.audioElement.play()
  }

  stop() {
    // Pause the sound
    this.audioElement.pause()
    // Seek back to the start
    this.audioElement.currentTime = 0
  }
}

function stopSoundEffects () {
  // Run for each sound effect
  for (let i in soundEffects) {
    // Stop the sound effect
    soundEffects[i].stop()
  }
}

new SoundEffect('assets/sounds/border_hit.ogg', 'borderHit')
new SoundEffect('assets/sounds/goal', 'goal')
new SoundEffect('assets/sounds/menu_cancel.ogg', 'menuCancel')
new SoundEffect('assets/sounds/menu_select.ogg', 'menuSelect')
new SoundEffect('assets/sounds/pause.ogg', 'pause')
new SoundEffect('assets/sounds/placing_puck.ogg', 'placingBall')
new SoundEffect('assets/sounds/puck_hit1.ogg', 'ballHit1')
new SoundEffect('assets/sounds/puck_hit2.ogg', 'ballHit2')
new SoundEffect('assets/sounds/show_level.ogg', 'showLevel')
