const { MongoClient } = require("mongodb");
const SuppliersDAO = require("./suppliersDAO");

module.exports.initDB = async function initDB() {
  const URI =
    "mongodb+srv://MateusRosengarten:D3PqFqCn07JY3XPI@cluster0.gb7ngqj.mongodb.net/?retryWrites=true&w=majority";
  const DB = "suppliersList";

  MongoClient.connect(URI)
    .then(async (connection) => {
      const database = connection.db(DB);
      await SuppliersDAO.injectDB(database);

      console.log("DB was connected sucesfully");
      return;
    })
    .catch((error) => {
      console.log("DB connection error:", error);
      process.exit(1);
    });
};
