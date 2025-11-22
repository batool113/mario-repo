
const Entity = require('./entity.js');

class Player extends Entity {
    constructor(x, y, input) {
        super(x, y, 32, 32);
        this.input = input;
        this.speed = 200; // pixels per second
        this.jumpForce = -400;
        this.friction = 0.8;
        this.isGrounded = false;
    }

    update(dt) {
        // Horizontal Movement
        if (this.input.isDown('ArrowRight')) {
            this.velX += this.speed * dt;
        } else if (this.input.isDown('ArrowLeft')) {
            this.velX -= this.speed * dt;
        } else {
            // Friction
            this.velX *= Math.pow(this.friction, dt * 60); // Frame-rate independent friction approximation
        }

        // Jumping
        if (this.input.isDown('Space') && this.isGrounded) {
            this.velY = this.jumpForce;
            this.isGrounded = false;
        }

        super.update(dt);
    }
}

module.exports = Player;
