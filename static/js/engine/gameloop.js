class GameLoop {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isRunning = false;
        this.lastTime = 0;
        this.fps = 60;
        this.frameTime = 1000 / this.fps;

        // Game Components
        this.physics = new Physics(900); // Gravity 900
        this.input = new Input();
        this.level = new Level(32);
        this.player = new Player(100, 100, this.input);

        // Simple test level
        const map = [];
        for (let r = 0; r < 15; r++) {
            const row = [];
            for (let c = 0; c < 25; c++) {
                if (r === 13 || r === 14) row.push(1); // Floor
                else if (r === 10 && c > 10 && c < 15) row.push(1); // Platform
                else row.push(0);
            }
            map.push(row);
        }
        this.level.load(map);
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

        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds

        if (deltaTime >= 0) { // Always update, cap max dt if needed
            this.update(Math.min(deltaTime, 0.1));
            this.render();
            this.lastTime = currentTime;
        }

        requestAnimationFrame((time) => this.loop(time));
    }

    update(dt) {
        // Apply Gravity
        this.physics.applyGravity(this.player, dt);

        // Update Player (Movement & Input)
        this.player.update(dt);

        // Collision Detection & Resolution
        // 1. Check Level Collisions
        this.checkLevelCollisions();

        // 2. Keep player in bounds (simple)
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.y > 600) { // Reset if falls off
            this.player.x = 100;
            this.player.y = 100;
            this.player.velY = 0;
        }
    }

    checkLevelCollisions() {
        const startCol = Math.floor(this.player.x / this.level.tileSize);
        const endCol = Math.floor((this.player.x + this.player.width) / this.level.tileSize);
        const startRow = Math.floor(this.player.y / this.level.tileSize);
        const endRow = Math.floor((this.player.y + this.player.height) / this.level.tileSize);

        this.player.isGrounded = false;

        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                if (this.level.isSolid(c * this.level.tileSize, r * this.level.tileSize)) {
                    const obstacle = {
                        x: c * this.level.tileSize,
                        y: r * this.level.tileSize,
                        width: this.level.tileSize,
                        height: this.level.tileSize
                    };

                    if (this.physics.checkCollision(this.player, obstacle)) {
                        this.physics.resolveCollision(this.player, obstacle);

                        // Check if grounded (collision was below player)
                        if (this.player.y + this.player.height === obstacle.y) {
                            this.player.isGrounded = true;
                        }
                    }
                }
            }
        }
    }

    render() {
        // Clear canvas with blue sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Level
        this.ctx.fillStyle = '#8B4513'; // Ground color
        if (this.level && this.level.map) {
            for (let r = 0; r < this.level.map.length; r++) {
                for (let c = 0; c < this.level.map[0].length; c++) {
                    if (this.level.map[r][c] === 1) {
                        this.ctx.fillRect(
                            c * this.level.tileSize,
                            r * this.level.tileSize,
                            this.level.tileSize,
                            this.level.tileSize
                        );
                    }
                }
            }
        } else {
            console.error("Level map missing!");
        }

        // Render Player
        if (this.player) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        } else {
            console.error("Player missing!");
        }
    }
}