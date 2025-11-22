
const Goomba = require('../../static/js/engine/enemy.js');

// Mock Entity and Physics classes if needed, or use real ones if they are simple enough.
// For this test, we'll assume Goomba extends Entity and we test its specific logic.

describe('Goomba', () => {
    let goomba;

    beforeEach(() => {
        goomba = new Goomba(100, 100);
    });

    test('should initialize with correct properties', () => {
        expect(goomba.x).toBe(100);
        expect(goomba.y).toBe(100);
        expect(goomba.width).toBe(32);
        expect(goomba.height).toBe(32);
        expect(goomba.velX).toBeLessThan(0); // Starts moving left
        expect(goomba.isDead).toBe(false);
    });

    test('should move in current direction', () => {
        const initialX = goomba.x;
        goomba.update(0.1);
        expect(goomba.x).toBeLessThan(initialX); // Moved left
    });

    test('should reverse direction on wall collision', () => {
        goomba.velX = -50;
        goomba.resolveCollision({ x: 0, y: 100, width: 32, height: 32 }, 'left'); // Hit wall on left
        expect(goomba.velX).toBe(50); // Should reverse to right

        goomba.resolveCollision({ x: 200, y: 100, width: 32, height: 32 }, 'right'); // Hit wall on right
        expect(goomba.velX).toBe(-50); // Should reverse to left
    });

    test('should die when stomped', () => {
        goomba.stomp();
        expect(goomba.isDead).toBe(true);
        expect(goomba.velX).toBe(0);
    });
});
