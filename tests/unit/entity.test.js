
const Entity = require('../../static/js/engine/entity.js');

describe('Entity', () => {
    test('should initialize with correct properties', () => {
        const entity = new Entity(10, 20, 32, 32);
        expect(entity.x).toBe(10);
        expect(entity.y).toBe(20);
        expect(entity.width).toBe(32);
        expect(entity.height).toBe(32);
        expect(entity.velX).toBe(0);
        expect(entity.velY).toBe(0);
    });

    test('should update position based on velocity', () => {
        const entity = new Entity(0, 0, 32, 32);
        entity.velX = 5;
        entity.velY = 10;
        
        // Simulate 1 second (dt = 1)
        entity.update(1);
        
        expect(entity.x).toBe(5);
        expect(entity.y).toBe(10);
    });

    test('should update position correctly with different delta time', () => {
        const entity = new Entity(0, 0, 32, 32);
        entity.velX = 100;
        entity.velY = 50;
        
        // Simulate 0.1 second
        entity.update(0.1);
        
        expect(entity.x).toBe(10);
        expect(entity.y).toBe(5);
    });
});
