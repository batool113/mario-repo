
const Player = require('../../static/js/engine/player.js');
const Input = require('../../static/js/engine/input.js');

// Mock Input
jest.mock('../../static/js/engine/input.js');

describe('Player', () => {
    let player;
    let mockInput;

    beforeEach(() => {
        mockInput = new Input();
        // Reset mock implementation for each test
        mockInput.isDown = jest.fn().mockReturnValue(false);

        player = new Player(0, 0, mockInput);
    });

    test('should accelerate right when Right key is pressed', () => {
        mockInput.isDown.mockImplementation((key) => key === 'ArrowRight');

        player.update(1);

        expect(player.velX).toBeGreaterThan(0);
    });

    test('should accelerate left when Left key is pressed', () => {
        mockInput.isDown.mockImplementation((key) => key === 'ArrowLeft');

        player.update(1);

        expect(player.velX).toBeLessThan(0);
    });

    test('should apply friction when no key is pressed', () => {
        player.velX = 10;

        player.update(1);

        expect(player.velX).toBeLessThan(10);
    });

    test('should jump when Space is pressed and grounded', () => {
        mockInput.isDown.mockImplementation((key) => key === 'Space');
        player.isGrounded = true;

        player.update(1);

        expect(player.velY).toBeLessThan(0); // Negative Y is up
        expect(player.isGrounded).toBe(false);
    });

    test('should NOT jump when Space is pressed and NOT grounded', () => {
        mockInput.isDown.mockImplementation((key) => key === 'Space');
        player.isGrounded = false;

        player.update(1);

        expect(player.velY).toBe(0);
    });
});
