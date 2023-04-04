module.exports={
    add:function(a, b) {
        return a + b;
    },
    forn: function(n, block){
        let accum='';
        for (let i = 1; i <= n; i++) {
             // Thêm biến @index vào context
             let index = i;
             const context = Object.assign({}, block.hash, {index});
            accum +=block.fn(context);
        }
        return accum;
    }
}