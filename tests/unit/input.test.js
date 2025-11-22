
const Input = require('../../static/js/engine/input.js');

describe('Input', () => {
    let input;
    let map = {};

    beforeEach(() => {
        // Mock document.addEventListener
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        input = new Input();
    });

    test('should track key presses', () => {
        // Simulate keydown
        map.keydown({ code: 'ArrowRight' });
        expect(input.isDown('ArrowRight')).toBe(true);
    });

    test('should track key releases', () => {
        // Simulate keydown then keyup
        map.keydown({ code: 'ArrowLeft' });
        expect(input.isDown('ArrowLeft')).toBe(true);

        map.keyup({ code: 'ArrowLeft' });
        expect(input.isDown('ArrowLeft')).toBe(false);
    });
});
