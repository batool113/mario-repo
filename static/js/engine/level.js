class Level {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.map = [];
        this.width = 0;
        this.height = 0;
    }

    load(mapData) {
        this.map = mapData;
        this.height = mapData.length * this.tileSize;
        this.width = mapData[0].length * this.tileSize;
    }

    getTileAt(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);

        if (row < 0 || row >= this.map.length || col < 0 || col >= this.map[0].length) {
            return null;
        }

        return this.map[row][col];
    }

    isSolid(x, y) {
        const tile = this.getTileAt(x, y);
        return tile === 1; // Assuming 1 is solid
    }
}

if (typeof module !== 'undefined') {
    module.exports = Level;
}
