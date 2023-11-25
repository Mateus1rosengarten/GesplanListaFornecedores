const { ObjectId } = require("mongodb");

let suppliersCollection;

module.exports = class SuppliersDAO {
  static async injectDB(connection) {
    if (!connection) {
      console.log("No MongoDb connection");
      return;
    }

    try {
      suppliersCollection = await connection.collection("suppliersList");
      console.log("Connected to suppliersList collection");
    } catch (error) {
      console.log("Couldnt connect to suppliersList colllection" + error);
    }
  }

  static async createSupplier(supplierData) {
    try {
      const result = await suppliersCollection.insertOne({ ...supplierData });
      return result;
    } catch (error) {
      console.log("ERROR IN CREATE-DAO", error);
    }
  }

  static async updateSupplier(supplierID, newData) {
    try {
      const result = await suppliersCollection.updateOne(
        {
          _id: new ObjectId(supplierID),
        },
        {
          $set: newData,
        }
      );
      return result;
    } catch (error) {
      console.log("ERROR IN UPDATE-DAO", error);
    }
  }

  static async deleteSupplier(suppliersIDArray) {
    try {
      const result = await suppliersCollection.deleteMany({
        _id: { $in: suppliersIDArray.map((id) => new ObjectId(id)) },
      });

      return result;
    } catch (error) {
      console.log("ERROR IN DELETE-DAO", error);
    }
  }

  static async getAllSuppliers() {
    const allPets = await suppliersCollection.find({}).toArray();
    return allPets;
  }
};
