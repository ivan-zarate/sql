const { options1 } = require('../options1/sqlite3');
const knex = require('knex')(options1);

const messages = [
    { author: "zombie@hotmail.com", timeStamp: "December 26th 2022, 11:57:05 pm", text: "asdsa" },
    { author: "tati@telmex.com", timeStamp: "Dec 27, 2022 12:00 AM", text: "tres!!" },
    { author: "tati@telmex.com", timeStamp: "Dec 27, 2022 12:08 AM", text: "asdad" },
    { author: "tati@telmex.com", timeStamp: "Dec 27, 2022 12:20 AM", text: "asdad" },
    { author: "tati@telmex.com", timeStamp: "Dec 27, 2022 12:29 AM", text: "asdad" },
]

knex("messages").insert(messages)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        console.log("closed connection");
        knex.destroy();
    })
