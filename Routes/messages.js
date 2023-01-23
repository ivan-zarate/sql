const express = require("express");
const { options1 } = require('../options1/sqlite3');
const knex = require('knex')(options1);
const validateBody = require("../middlewares/validateBody");
const moment = require("moment");
const chat = express.Router();

chat.post("/messages", express.json(), validateBody, async (req, res) => {

  try {
    const { email, texto } = req.body;
    const time = moment().format('lll');
    await knex("messages").insert({ timeStamp: time, author: email, text: texto });
    res.status(200);
  }
  catch (error) {
    return res.status(400).send({ error: error.message });
  }
})

module.exports = chat;