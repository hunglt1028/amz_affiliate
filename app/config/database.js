const dbname='amz_affiliate';
module.exports ={
    host:"127.0.0.1",
    user:"root",
    password:"root",
    dbname:dbname,
    dialect: "mysql",
    backup:{
        port:3000,
        autoBackupPath:'/web/amz_affiliate/autobackup',
        removeOldBackup:true,
        keepLastDaysBackup:7,
        database:dbname,
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
};