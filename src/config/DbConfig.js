const dbname='amz_affiliate';
module.exports ={
    url:'mongodb://localhost:27017/'+dbname,
    options:{
        server:{socketOptions:{keepAlive:1, connectTimeoutMS:30000}},
        replset: {socketOptions:{keepAlive:1, connectTimeoutMS:3000}},
    },
    backup:{
        port:3000,
        autoBackupPath:'/web/amz_affiliate/autobackup',
        removeOldBackup:true,
        keepLastDaysBackup:7,
        database:dbname,
    },
};