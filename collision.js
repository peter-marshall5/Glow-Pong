class Collision {
  constructor(sprite1, sprite2) {
    this.sprite1 = sprite1
    this.sprite2 = sprite2
  }

  checkCollision() {
    const x1 = this.sprite1.position.x
    const y1 = this.sprite1.position.y
    const x2 = this.sprite2.position.x
    const y2 = this.sprite2.position.y

    const w1 = this.sprite1.size.w
    const h1 = this.sprite1.size.h
    const w2 = this.sprite2.size.w
    const h2 = this.sprite2.size.h

    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2 ) {
      return true
    }
    return false
  }
}
