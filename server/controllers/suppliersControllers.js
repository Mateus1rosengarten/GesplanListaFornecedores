const suppliersDAO = require("../models/suppliersDAO");

module.exports = class SuppliersControllers {
  static async createSupplier(req, res) {
    try {
      const newUser = req.body;
      // newUser.created_at = new Date().toISOString();
      // newUser.fav = false;
      const newUserCreated = await suppliersDAO.createSupplier(newUser);

      
      return res
        .status(200)
        .json({
          dataObject: newUserCreated,
          message: "User created sucessfully in controller",
        });
    } catch (error) {
      res
        .status(400)
        .json({ message: "problem in createSupplier controller" + error });
    }
  }

  static async updateSupplier(req, res) {
    try {
      const userId = req.params.id;
      const newData = req.body;
      console.log('useriD',userId);
      console.log('newData',newData);
      newData.update_lastTime_at = new Date().toISOString();
      const userUpdated = await suppliersDAO.updateSupplier(userId, newData);

      return res
        .status(200)
        .json({
          dataObject: userUpdated,
          message: "User updated sucessfully in controller",
        });
    } catch (error) {
      res
        .status(400)
        .json({ message: "problem in updateSupplier controller" + error });
    }
  }

  static async updateFavouriteStatus(req,res) {
   try {
    console.log('req-body',req.body);
    console.log('req-query',req.params);
    const fav = req.body.fav;
    const userId = req.params.id;
    const favStatusUpdated = suppliersDAO.updateFavStatus(userId,fav);
    return res
        .status(200)
        .json({
          dataObject: favStatusUpdated,
          message: "User fav status updated sucessfully in controller",
        });

   }
   catch(error) {
    res.status(400).json({message:"problem in updateSupplier controller" + error})

   }

  }

  static async deleteSupplier(req, res) {
    try {
      
      const userIds = req.params.id.split(",");
      console.log('req.param',req.params)
      console.log('userids',userIds);
      const userDeleted = await suppliersDAO.deleteSupplier(userIds);
      res
        .status(200)
        .json({
          dataObject: userDeleted,
          message: "User/s deleted sucessfully",
        });
    } catch (error) {
      res
        .status(400)
        .json({ message: "problem in deleteSupplier controller" + error });
    }
  }

  static async getAllSuppliers(req, res) {
    try {
      const allUsers = await suppliersDAO.getAllSuppliers();
      res.status(200).json(allUsers);
    } catch (error) {
      res
        .status(400)
        .json({ message: "problem in getallSuppliers controller" + error });
    }
  }
};
