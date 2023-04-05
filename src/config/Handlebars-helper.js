module.exports = {
    add: function (a, b) {
        return a*1 + b*1;
    },
    sub: function (a, b) {
        return a - b;
    },
    forn: function (n, block) {
        let accum = '';
        for (let i = 1; i <= n; i++) {
            // Thêm biến @index vào context
            let index = i;
            const context = Object.assign({}, block.hash, { index });
            accum += block.fn(context);
        }
        return accum;
    },
    ifcond:function(v1, operator, v2, options ){
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    }
}