let gameLoop;

window.addEventListener('DOMContentLoaded', () => {
    gameLoop = new GameLoop();
    
    if (gameLoop.init('gameCanvas')) {
        gameLoop.start();
        console.log('Game loop started successfully!');
    } else {
        console.error('Failed to initialize game canvas');
    }
});