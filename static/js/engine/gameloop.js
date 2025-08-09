class GameLoop {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isRunning = false;
        this.lastTime = 0;
        this.fps = 60;
        this.frameTime = 1000 / this.fps;
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        return this.canvas && this.ctx;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.loop();
        }
    }

    stop() {
        this.isRunning = false;
    }

    loop(currentTime = performance.now()) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        
        if (deltaTime >= this.frameTime) {
            this.update(deltaTime);
            this.render();
            this.lastTime = currentTime;
        }

        requestAnimationFrame((time) => this.loop(time));
    }

    update(deltaTime) {
        // Game logic updates go here
    }

    render() {
        // Clear canvas with blue sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}