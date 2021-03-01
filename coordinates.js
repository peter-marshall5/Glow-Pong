// The game runs on a 400x225 coordinate system
// It stays in a 16:9 aspect ratio
// and scales to the user's screen

function convertCoords(x, y) {
  return {x: x / 400 * cWidth, y: y / 225 * cHeight}
}

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
}

function random (min, max) {
  // Difference between minimum and maximum values
  const delta = max - min
  return Math.floor(Math.random() * delta) + min
}
