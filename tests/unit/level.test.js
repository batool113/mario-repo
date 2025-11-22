
const Level = require('../../static/js/engine/level.js');

describe('Level', () => {
    let level;
    const tileSize = 32;
    const mapData = [
        [0, 0, 0],
        [1, 0, 1],
        [1, 1, 1]
    ];

    beforeEach(() => {
        level = new Level(tileSize);
        level.load(mapData);
    });

    test('should load map data correctly', () => {
        expect(level.width).toBe(3 * tileSize);
        expect(level.height).toBe(3 * tileSize);
    });

    test('should return correct tile at position', () => {
        // (0,0) is 0 (empty)
        expect(level.getTileAt(0, 0)).toBe(0);
        // (0, 32) is 1 (solid) - row 1, col 0
        expect(level.getTileAt(0, 32)).toBe(1);
        // (32, 32) is 0 (empty) - row 1, col 1
        expect(level.getTileAt(32, 32)).toBe(0);
    });

    test('should handle out of bounds checks', () => {
        expect(level.getTileAt(-10, 0)).toBe(null);
        expect(level.getTileAt(1000, 0)).toBe(null);
    });

    test('should identify solid tiles', () => {
        // Assuming 1 is solid, 0 is not
        expect(level.isSolid(0, 32)).toBe(true);
        expect(level.isSolid(0, 0)).toBe(false);
    });
});
