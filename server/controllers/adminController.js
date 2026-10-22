const { User } = require("../models/models")

class AdminController{
    async dashboard(req,res){
        return res.status(200).json({success:true, message:'вы зашли как администратор'})
    }
}

module.exports = new AdminController()