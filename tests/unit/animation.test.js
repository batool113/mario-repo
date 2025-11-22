
const Animation = require('../../static/js/engine/animation.js');

describe('Animation', () => {
    let animation;
    const frames = [0, 1, 2, 3];
    const frameDuration = 0.1; // 100ms per frame

    beforeEach(() => {
        animation = new Animation(frames, frameDuration);
    });

    test('should initialize with correct properties', () => {
        expect(animation.frames).toEqual(frames);
        expect(animation.frameDuration).toBe(frameDuration);
        expect(animation.timer).toBe(0);
        expect(animation.currentFrameIndex).toBe(0);
    });

    test('should return current frame', () => {
        expect(animation.getCurrentFrame()).toBe(0);
    });

    test('should advance frame after duration', () => {
        animation.update(0.15); // Advance 1.5 frames
        expect(animation.currentFrameIndex).toBe(1);
        expect(animation.getCurrentFrame()).toBe(1);
    });

    test('should loop back to start', () => {
        animation.update(0.45); // Advance 4.5 frames (0 -> 1 -> 2 -> 3 -> 0)
        expect(animation.currentFrameIndex).toBe(0);
        expect(animation.getCurrentFrame()).toBe(0);
    });

    test('should reset animation', () => {
        animation.update(0.2);
        expect(animation.currentFrameIndex).toBe(2);

        animation.reset();
        expect(animation.currentFrameIndex).toBe(0);
        expect(animation.timer).toBe(0);
    });
});
