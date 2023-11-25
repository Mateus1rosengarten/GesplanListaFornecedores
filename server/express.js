const express = require("express");
const app = express();
const cors = require("cors");
const SuppliersControllers = require("./controllers/suppliersControllers");
const { initDB } = require("./models/DBinit");

initDB();

// Midlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/show", SuppliersControllers.getAllSuppliers);
app.post("/create", SuppliersControllers.createSupplier);
app.post("/update/:id", SuppliersControllers.updateSupplier);
app.delete("/delete/:id", SuppliersControllers.deleteSupplier);

app.listen(3000, async () => {
  console.log("Server running or port 3000");
});
