class Input {
    constructor() {
        this.keys = {};

        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    isDown(code) {
        return !!this.keys[code];
    }
}

if (typeof module !== 'undefined') {
    module.exports = Input;
}
