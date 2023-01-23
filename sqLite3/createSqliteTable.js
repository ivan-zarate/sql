const {options1}= require('../options1/sqlite3');
const knex= require('knex')(options1);

knex.schema.createTable("messages", table=>{
    table.increments("id");
    table.string("timeStamp");
    table.string("author");
    table.string("text");
})
.then (()=>console.log("table created"))
.catch((err)=>{console.log(err);throw err})
.finally(()=>{
    console.log("closed connection");
    knex.destroy();
})