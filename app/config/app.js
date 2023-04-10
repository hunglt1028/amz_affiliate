module.exports ={
    port:8080,
    ip:'192.168.100.113',
    app:{
        id:'amz_affiliate',
        title: 'amazon affiliate',
        domain:'http://localhost',
    },
    sitemap_type:'file',
    db:require('./database'),
    jwt:{
        secret: 'kendz2810',
        expiration:'24'
    },
    session:{
        secret:'kendz2810'
    }
};