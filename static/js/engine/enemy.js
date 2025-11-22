
// Node.js support or Browser fallback
// Node.js support or Browser fallback
const EnemyBase = (typeof Entity !== 'undefined') ? Entity : require('./entity.js');

class Goomba extends EnemyBase {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.velX = -50; // Move left by default
        this.isDead = false;
    }

    update(dt) {
        if (this.isDead) return;
        super.update(dt);
    }

    resolveCollision(obstacle, side) {
        if (this.isDead) return;

        if (side === 'left' || side === 'right') {
            this.velX *= -1; // Reverse direction
        }
    }

    stomp() {
        this.isDead = true;
        this.velX = 0;
    }
}

if (typeof module !== 'undefined') {
    module.exports = Goomba;
}
