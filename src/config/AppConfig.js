module.exports ={
    port:80,
    ip:'192.168.100.113',
    app:{
        id:'amz_affiliate',
        title: 'amazon affiliate',
        domain:'http://localhost',
    },
    sitemap_type:'file',
    db:require('./DbConfig'),
    jwt:{
        secret: 'kendz2810',
        expiration:'24'
    },
    session:{
        secret:'kendz2810'
    }
};