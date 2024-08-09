const { MongoClient } = require("mongodb");
const SuppliersDAO = require("./suppliersDAO");
const {Client} = require('pg');
const { Portal } = require("@chakra-ui/react");

module.exports.initDB = async function initDB() {

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'suppliersGesplan',
    password: '1131',
    port: '5432',
})

client.connect().then(() => console.log('Conected to PostgresSQL'))
.catch(error => console.log('Error Connecting to DB,',error));  


  // const URI =
  //   "mongodb+srv://MateusRosengarten:D3PqFqCn07JY3XPI@cluster0.gb7ngqj.mongodb.net/?retryWrites=true&w=majority";
  // const DB = "suppliersList";

  // MongoClient.connect(URI)
  //   .then(async (connection) => {
  //     const database = connection.db(DB);
  //     await SuppliersDAO.injectDB(database);

  //     console.log("DB was connected sucesfully");
  //     return;
  //   })
  //   .catch((error) => {
  //     console.log("DB connection error:", error);
  //     process.exit(1);
  //   });
};
