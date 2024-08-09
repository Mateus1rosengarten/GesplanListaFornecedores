const {Pool} = require('pg')


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'suppliersGesplan',
  password: '1131',
  port: '5432',
})

module.exports = class SuppliersDAO {
  

  static async createSupplier(supplierData) {
    const client = await pool.connect();
    try {
      const columns = Object.keys(supplierData).join(', ');
      const values = Object.values(supplierData);
      const placeholders = values.map((_,index) => `$${index + 1}`).join(', ');
      const {rows} = await client.query(`INSERT INTO suppliers (${columns}) VALUES (${placeholders}) RETURNING *`,values)
      console.log('row',rows)
      
      return rows[0];
    } catch (error) {
      console.log('ERROR IN CREATE-DAO',error);
    }
    finally{
      if(client) {
        client.release();
      }
    }
  }

  static async updateSupplier(supplierID, newData) {
    try {
      const client = await pool.connect();
      const values = [
        newData.namesupplier,
        newData.emailsupplier,
        newData.numbersupplier,
        newData.kindofsupplier,
        newData.detailsupplier,
        supplierID
      ]
      const {rows} = await client.query(`UPDATE suppliers SET
      namesupplier = $1, 
      emailsupplier = $2, 
      numbersupplier = $3,
      kindofsupplier = $4,
      detailsupplier = $5
      WHERE id = $6 
      RETURNING *`,values)
      client.release();
      return rows;
    } catch (error) {
      console.log("ERROR IN UPDATE-DAO", error);
    }
  }

  static async updateFavStatus(supplierID,favStatus) {
    try {
      const client = await pool.connect();
      const values = [favStatus,supplierID];
      const {rows} = await client.query(`UPDATE suppliers SET
      fav = $1 WHERE id = $2`, values);
      client.release();
      
    } catch (error) {
      console.log('Error in updateFavStatus DAO',error);
      
    };
  };


  static async deleteSupplier(suppliersIDArray) {
    try {
      const client = await pool.connect();
      const formatedIds = suppliersIDArray.map((_,index) => `$${index + 1}`).join(', ');
      console.log('suppliersarray2',suppliersIDArray)
      console.log('formatedIds',formatedIds)
      const {rows} = await client.query(`DELETE FROM suppliers WHERE id IN (${formatedIds}) RETURNING *`,suppliersIDArray)
      client.release();
      return rows;
    } catch (error) {
      console.log("ERROR IN DELETE DAO", error);
    }
  }

  static async getAllSuppliers() {
    try {
    const client = await pool.connect();
    const {rows} = await client.query('SELECT * FROM suppliers');
    client.release();
    return rows;
    }
    catch(error) {
      console.log('ERROR IN GETALLSUPPLIER DAO',error)

    }
  }
};
