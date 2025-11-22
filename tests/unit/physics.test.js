
const Physics = require('../../static/js/engine/physics.js');
const Entity = require('../../static/js/engine/entity.js');

describe('Physics', () => {
    let physics;
    let entity;

    beforeEach(() => {
        physics = new Physics();
        entity = new Entity(0, 0, 32, 32);
    });

    test('should apply gravity to entity', () => {
        physics.gravity = 10;
        entity.velY = 0;

        physics.applyGravity(entity, 1);

        expect(entity.velY).toBe(10);
    });

    test('should detect collision between two overlapping entities', () => {
        const entity1 = new Entity(0, 0, 32, 32);
        const entity2 = new Entity(10, 10, 32, 32);

        expect(physics.checkCollision(entity1, entity2)).toBe(true);
    });

    test('should not detect collision between non-overlapping entities', () => {
        const entity1 = new Entity(0, 0, 32, 32);
        const entity2 = new Entity(100, 100, 32, 32);

        expect(physics.checkCollision(entity1, entity2)).toBe(false);
    });

    test('should detect collision when touching edges', () => {
        const entity1 = new Entity(0, 0, 32, 32);
        const entity2 = new Entity(32, 0, 32, 32);
        // AABB usually excludes exact edge touching, but let's define our expectation.
        // Usually < is used, so touching is NOT collision.
        expect(physics.checkCollision(entity1, entity2)).toBe(false);
    });

    test('should resolve collision by pushing entity out', () => {
        const entity = new Entity(10, 10, 32, 32);
        const wall = { x: 30, y: 10, width: 32, height: 32 }; // Overlap on right side

        // Move entity into wall
        entity.velX = 5;

        const collision = physics.checkCollision(entity, wall);
        expect(collision).toBe(true);

        physics.resolveCollision(entity, wall);

        expect(physics.checkCollision(entity, wall)).toBe(false);
        expect(entity.x).toBe(wall.x - entity.width); // Should be pushed to the left
        expect(entity.velX).toBe(0); // Velocity should be zeroed
    });
});
