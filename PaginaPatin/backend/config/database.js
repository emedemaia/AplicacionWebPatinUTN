require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.connection.on("connected", () => {
    console.log("Mongo está conectado exitosamente !!!");
  });

  module.exports = { mongoose }