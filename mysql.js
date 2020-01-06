const mysql = require("mysql")
var pool

module.exports = {
    
    // create singleton connection pool
    getPool: function(){

        if (pool) return pool
        pool = mysql.createPool({
            connectionLimit: process.env.MYSQL_CONN_LIMIT,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        })
        return pool

    },

    // promisify query function
    query: function(queryStr, params){

        if (!pool) {
            this.getPool()
        }
        
        return new Promise((resolve, reject) => {
            pool.query( queryStr, params, (error, result)=>{

                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })


        })


    }

}
