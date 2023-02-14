const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
        if(token){
            const key = process.env.jwt_secret;
            const decoded = jwt.verify(token,key)
            console.log(decoded);
            req.params.id = decoded.id;
            next()
        }
    } catch (error) {
      throw new Error("Not Authorization expired, Please Login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async(req, res, next)=>{
    const {id} = req.params;
    try {
        const getUser = await User.findById(id);
        if(getUser.role == 'admin'){
            next()
        }else{
          throw new Error("User not admin")
        }
    } catch (error) {
        throw new Error(error)
    }

})

module.exports = {authMiddleware, isAdmin}