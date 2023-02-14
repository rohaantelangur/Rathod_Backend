const express = require("express");
const { createUser, loginUserCtrl, getallUser, getUser, deleteUser, updateUser } = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

//register user
router.post('/register', createUser)
//login in user
router.post('/login', loginUserCtrl)
// get all users
router.get('/all-users',authMiddleware, isAdmin, getallUser)
//get single user need to pass req.params.id
router.get('/get-users',authMiddleware ,getUser)
//delete single user need to pass req.params.id
router.delete('/:id', deleteUser)
//Update a user
router.put('/update-user/:id', updateUser)
module.exports = router