class Sprite {
  constructor(x, y, width, height, color, blurRadius, blurColor) {
    this.position = {x: x, y: y}
    this.size = {w: width, h: height}
    this.color = color || spriteColor
    this.blurRadius = blurRadius || 0
    this.blurColor = blurColor || null
  }

  move(x, y, mode) {
    if (mode === 'add') {
      this.position.x += x
      this.position.y += y
    } else {
      if (typeof x === 'number') {
        this.position.x = x
      }
      if (typeof y ==='number') {
        this.position.y = y
      }
    }
  }

  resize(width, height, mode) {
    if (mode === 'add') {
      this.size.w += width
      this.size.h += height
    } else {
      if (typeof x === 'number') {
        this.size.w = width
      }
      if (typeof y ==='number') {
        this.size.h = height
      }
    }
  }

  color(color) {
    this.color = color
  }

  checkCollision(otherSprite) {
    return new Collision(this, otherSprite).checkCollision()
  }

  checkWallCollision(top, bottom, left, right) {
    if (this.position.x <= left ||
    this.position.x + this.size.w >= right ||
    this.position.y <= top ||
    this.position.y + this.size.h >= bottom) {
      return true
    }
    return false
  }

  checkLeftPass(left) {
    if(this.position.x <= left) {
      return true
    }
    return false
  }
  checkRightPass(right) {
    if(this.position.x + this.size.w >= right) {
      return true
    }
    return false
  }

  // Checks that a sprite is within the top and bottom of the play area
  checkBounds(top, bottom) {
    if(this.position.y <= top ||
    this.position.y + this.size.h > bottom) {
      return false
    }
    return true
  }

  // Checks if a sprite is between two points on the Y axis
  checkVerticalCollision(top, bottom) {
    if (typeof top === 'object') {
      bottom = top.position.y + top.size.h
      top = top.position.y
    }
    if(this.position.y < bottom &&
    this.position.y + this.size.h > top) {
      return true
    }
    return false
  }

  draw() {
    drawSprite(this)
  }
}
