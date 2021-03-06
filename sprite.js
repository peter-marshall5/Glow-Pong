// Handles sprite objects

const sprites = []

class Sprite {
  constructor (x, y, width, height, color, blurRadius, blurColor, flashColor) {
    this.position = { x: x, y: y }
    this.size = { w: width, h: height }
    this.color = color || window.spriteColor
    this.blurRadius = blurRadius || 0
    this.blurColor = blurColor || null
    this.hidden = false
    this.flashing = false
    this.flashIntensity = 0
    this.flashColor = flashColor || this.color
    sprites.push(this)
  }

  move (x, y, mode) {
    if (mode === 'add') {
      this.position.x += x
      this.position.y += y
    } else {
      if (typeof x === 'number') {
        this.position.x = x
      }
      if (typeof y === 'number') {
        this.position.y = y
      }
    }
  }

  resize (width, height, mode) {
    if (mode === 'add') {
      this.size.w += width
      this.size.h += height
    } else {
      if (typeof x === 'number') {
        this.size.w = width
      }
      if (typeof y === 'number') {
        this.size.h = height
      }
    }
  }

  color (color) {
    this.color = color
  }

  checkCollision (otherSprite) {
    // Remove this
  }

  checkWallCollision (top, bottom, left, right) {
    if (this.position.x <= left ||
    this.position.x + this.size.w >= right ||
    this.position.y <= top ||
    this.position.y + this.size.h >= bottom) {
      return true
    }
    return false
  }

  checkLeftPass (left) {
    if (this.position.x <= left) {
      return true
    }
    return false
  }

  checkRightPass (right) {
    if (this.position.x + this.size.w >= right) {
      return true
    }
    return false
  }

  // Checks if a sprite is between two points on the Y axis
  checkVerticalCollision (top, bottom) {
    if (typeof top === 'object') {
      bottom = top.position.y + top.size.h
      top = top.position.y
    }
    if (this.position.y < bottom &&
    this.position.y + this.size.h > top) {
      return true
    }
    return false
  }

  flash () {
    this.flashing = true
  }

  draw () {
    window.drawSprite(this)
  }
}

window.sprites = sprites
window.Sprite = Sprite
