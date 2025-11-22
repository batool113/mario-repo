class Physics {
    constructor(gravity = 0) {
        this.gravity = gravity;
    }

    applyGravity(entity, dt) {
        entity.velY += this.gravity * dt;
    }

    checkCollision(entity1, entity2) {
        return (
            entity1.x < entity2.x + entity2.width &&
            entity1.x + entity1.width > entity2.x &&
            entity1.y < entity2.y + entity2.height &&
            entity1.y + entity1.height > entity2.y
        );
    }

    resolveCollision(entity, obstacle) {
        if (!this.checkCollision(entity, obstacle)) return;

        const overlapX = (entity.width + obstacle.width) / 2 - Math.abs((entity.x + entity.width / 2) - (obstacle.x + obstacle.width / 2));
        const overlapY = (entity.height + obstacle.height) / 2 - Math.abs((entity.y + entity.height / 2) - (obstacle.y + obstacle.height / 2));

        if (overlapX < overlapY) {
            // Resolve X
            if (entity.x < obstacle.x) {
                entity.x -= overlapX;
            } else {
                entity.x += overlapX;
            }
            entity.velX = 0;
        } else {
            // Resolve Y
            if (entity.y < obstacle.y) {
                entity.y -= overlapY;
            } else {
                entity.y += overlapY;
            }
            entity.velY = 0;
        }
    }
}

module.exports = Physics;
