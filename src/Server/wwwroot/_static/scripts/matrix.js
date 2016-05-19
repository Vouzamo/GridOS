// namespace
var vouzamo = vouzamo || {};

function Matrix2D() {
    this.minX = 0;
    this.maxX = 0;
    this.minY = 0;
    this.maxY = 0;
    this.matrix = [];
    this.initialize();
}

Matrix2D.prototype = {
    constructor: Matrix2D,

    clearAll: function() {
        this.matrix = [];
    },

    clear: function(x, y) {
        this.set(x, y, null);
    },

    set: function (x, y, data) {
        if (this.matrix === null || this.matrix === undefined) {
            this.matrix = [];
        }

        if (this.matrix[x] === null || this.matrix[x] === undefined) {
            this.matrix[x] = [];
        }

        this.matrix[x][y] = data;
        this.updateBounds(x, y);
    },

    resetBound: function() {
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
    },

    updateBounds: function(x, y) {
        this.minX = Math.min(this.minX, x);
        this.maxX = Math.max(this.maxX, x);
        this.minY = Math.min(this.minY, y);
        this.maxY = Math.max(this.maxY, y);
    },

    get: function(x, y) {
        if (this.matrix !== null && this.matrix !== undefined) {
            if (this.matrix[x] !== null && this.matrix[x] !== undefined) {
                if (this.matrix[x][y] !== null && this.matrix[x][y] !== undefined) {
                    return this.matrix[x][y];
                }
            }
        }

        return null;
    },

    getAll: function () {
        var all = [];

        for (var x = this.minX; x <= this.maxX; x++) {
            for (var y = this.minY; y <= this.maxY; y++) {
                var item = this.get(x, y);
                if (item !== null) {
                    all.push(item);
                }
            }
        }

        return all;
    },

    move: function (x1, y1, x2, y2) {
        var source = this.get(x1, y1);
        var target = this.get(x2, y2);
        if (target === null || target === undefined) {
            this.clear(x1, y1);
            this.set(x2, y2, source);
            this.updateBounds(x1, y1);
            this.updateBounds(x2, y2);
        }
    },

    swap: function(x1, y1, x2, y2) {
        var firstItem = this.get(x1, y1);
        var secondItem = this.get(x2, y2);

        this.set(x1, y1, secondItem);
        this.set(x2, y2, firstItem);

        this.updateBounds(x1, y1);
        this.updateBounds(x2, y2);
    },

    isEmpty: function(x, y) {
        var item = this.get(x, y);

        return item === null || item === undefined;
    },

    initialize: function () {
        
    }
}