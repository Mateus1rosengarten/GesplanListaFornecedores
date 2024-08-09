require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const SuppliersControllers = require("./controllers/suppliersControllers");
const {Pool} = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});



const connectDB = async () => {
  const client = await pool.connect();
  try { 
  const {rows} = await client.query('SELECT current_user');
  const currentUser = rows[0]['current_user'];
  console.log('usuario:',currentUser);
  }
  catch(error) {
    console.log('error',error)
  }
  finally{
    client.release();
  };
};

connectDB();




app.use(cors());
app.use(express.json());


app.get("/show", SuppliersControllers.getAllSuppliers);
app.post("/create", SuppliersControllers.createSupplier);
app.post("/update/:id", SuppliersControllers.updateSupplier);
app.post("/updateFav/:id" ,SuppliersControllers.updateFavouriteStatus);
app.delete("/delete/:id", SuppliersControllers.deleteSupplier);

app.listen(3000, async () => {
  console.log("Server running or port 3000");
});

module.exports = pool;
