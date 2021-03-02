// Handles loading of images and button events

let images = {}
let buttons = {}

class ImageLoader {
  constructor(url, name) {
    images[name] = this
    this.url = url
    this.name = name
    this.img = new Image()
    this.onclick = null
  }

  load() {
    this.img.src = this.url
  }
}

class Button {
  constructor(url, name, x, y, width, height) {
    buttons[name] = this
    this.name = name
    this.img = new ImageLoader(url, name)
    this.x = x
    this.y = y
    this.w = width
    this.h = height
    this.hidden = false
  }

  checkClick(x, y) {
    if (this.hidden) {
      return false
    }
    let coordMap = {
      start: convertCoords(this.x, this.y),
      size: convertCoords(this.w, this.h)
    }
    const center = (canvas.width / 2) - (coordMap.size.x / 2)
    if (center + coordMap.start.x < x &&
      center + coordMap.start.x + coordMap.size.x > x &&
      coordMap.start.y < y &&
      coordMap.start.y + coordMap.size.y > y) {
        return true
      }
      return false
  }

  draw() {
    if (this.hidden) {
      return
    }
    drawButton(this)
  }
}

function loadImages () {
  for (let i in images) {
    images[i].load()
  }
}

function disableButtons () {
  for (let i in buttons) {
    buttons[i].hidden = true
  }
}

function enableButtons () {
  for (let i in buttons) {
    buttons[i].hidden = false
  }
}

new Button('assets/images/endless.png', 'freeplay', 0, 90, 100, 23)
new Button('assets/images/first_to_10.png', 'firstTo10', 0, 118, 100, 23)
new Button('assets/images/play_against_bot.png', 'bot', 0, 146, 100, 23)
loadImages()
