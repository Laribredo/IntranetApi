
const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'localhost', user: 'root', password:'123456', database:'intranet'});

try{
    pool.getConnection().then(() =>{
        console.log("banco conectado com sucesso")
    }).catch(err =>{
        console.log(err)
    })
}catch(err){
    console.log(err);
    
}

module.exports = pool.getConnection();