const { createPool } = require("mysql");

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "grand_horizon",
    connectioLimit: 10
})

pool.query(`select * from bmwi where model='BMW ix'`,(err,result,field)=>{
    if(err) return console.log("error",err)
    return console.log(result);

})