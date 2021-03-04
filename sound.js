// Handles sound effects

// Context for web audio
const actx = new AudioContext()
// Gain node to set global volume
const volume = actx.createGain()
volume.connect(actx.destination)
// Object to store sound effects
const soundEffects = {}

class SoundEffect {
  constructor (url, name) {
    this.name = name
    this.url = url
  }

  load () {
    return fetch(this.url)
      .then(response => response.arrayBuffer())
      .then(data => actx.decodeAudioData(data))
      .then((buffer) => this.setBuffer(buffer))
  }

  play (n) {
    // Create buffer source
    this.source = actx.createBufferSource()
    // Set the audio buffer
    this.source.buffer = this.buffer
    // Connect to gain node
    this.source.connect(volume)
    // Play the sound
    this.source.start(actx.currentTime, n || 0.007)
  }

  stop () {
    if (this.source) {
      // Stop the sound
      this.source.stop()
    }
  }

  setBuffer (buffer) {
    this.buffer = buffer
  }
}

function stopSoundEffects () {
  // Run for each sound effect
  for (const i in soundEffects) {
    // Stop the sound effect
    soundEffects[i].stop()
  }
}

function loadSoundEffects () {
  for (const i in soundEffects) {
    // Load the sound effect
    soundEffects[i].load()
  }
}

function addSoundEffect (url, name) {
  soundEffects[name] = new SoundEffect(url, name)
}

addSoundEffect('assets/sounds/border_hit.ogg', 'borderHit')
addSoundEffect('assets/sounds/goal.ogg', 'goal')
addSoundEffect('assets/sounds/menu_cancel.ogg', 'menuCancel')
addSoundEffect('assets/sounds/menu_select.ogg', 'menuSelect')
addSoundEffect('assets/sounds/pause.ogg', 'pause')
addSoundEffect('assets/sounds/placing_puck.ogg', 'placingBall')
addSoundEffect('assets/sounds/puck_hit1.ogg', 'ballHit1')
addSoundEffect('assets/sounds/puck_hit2.ogg', 'ballHit2')
addSoundEffect('assets/sounds/show_level.ogg', 'showLevel')
addSoundEffect('assets/sounds/winner.ogg', 'winner')
loadSoundEffects()

window.stopSoundEffects = stopSoundEffects
