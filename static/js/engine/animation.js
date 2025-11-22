class Animation {
    constructor(frames, frameDuration) {
        this.frames = frames;
        this.frameDuration = frameDuration;
        this.timer = 0;
        this.currentFrameIndex = 0;
    }

    update(dt) {
        this.timer += dt;
        while (this.timer >= this.frameDuration) {
            this.timer -= this.frameDuration;
            this.currentFrameIndex++;
            if (this.currentFrameIndex >= this.frames.length) {
                this.currentFrameIndex = 0;
            }
        }
    }

    getCurrentFrame() {
        return this.frames[this.currentFrameIndex];
    }

    reset() {
        this.timer = 0;
        this.currentFrameIndex = 0;
    }
}

if (typeof module !== 'undefined') {
    module.exports = Animation;
}
