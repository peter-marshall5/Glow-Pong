// Handles sound effects

// Context for web audio
let actx = new AudioContext()
// Gain node to set global volume
let volume = actx.createGain()
volume.connect(actx.destination)
// Object to store sound effects
let soundEffects = {}
// Stores how many sound effects loaded so far
let soundEffectsLoaded = 0

class SoundEffect {
  constructor(url, name) {
    soundEffects[name] = this
    this.name = name
    this.url = url
  }

  load() {
    return fetch(this.url)
      .then(response => response.arrayBuffer())
      .then(data => actx.decodeAudioData(data))
      .then(buffer => this.buffer = buffer)
  }

  play(n) {
    // Create buffer source
    this.source = actx.createBufferSource()
    // Set the audio buffer
    this.source.buffer = this.buffer
    // Connect to gain node
    this.source.connect(volume)
    // Play the sound
    this.source.start(actx.currentTime, n || 0.007)
  }

  stop() {
    if (this.source) {
      // Stop the sound
      this.source.stop()
    }
  }
}

function stopSoundEffects () {
  // Run for each sound effect
  for (let i in soundEffects) {
    // Stop the sound effect
    soundEffects[i].stop()
  }
}

function loadSoundEffects () {
  for (let i in soundEffects) {
    // Load the sound effect
    soundEffects[i].load()
  }
}

new SoundEffect('assets/sounds/border_hit.ogg', 'borderHit')
new SoundEffect('assets/sounds/goal.ogg', 'goal')
new SoundEffect('assets/sounds/menu_cancel.ogg', 'menuCancel')
new SoundEffect('assets/sounds/menu_select.ogg', 'menuSelect')
new SoundEffect('assets/sounds/pause.ogg', 'pause')
new SoundEffect('assets/sounds/placing_puck.ogg', 'placingBall')
new SoundEffect('assets/sounds/puck_hit1.ogg', 'ballHit1')
new SoundEffect('assets/sounds/puck_hit2.ogg', 'ballHit2')
new SoundEffect('assets/sounds/show_level.ogg', 'showLevel')
new SoundEffect('assets/sounds/winner.ogg', 'winner')
loadSoundEffects()
