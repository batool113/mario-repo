class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = 0;
        this.velY = 0;
    }

    update(dt) {
        this.x += this.velX * dt;
        this.y += this.velY * dt;
    }
}

module.exports = Entity;
