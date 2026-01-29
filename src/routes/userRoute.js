const express=require('express');
const { registerController, loginController, getCurrentUser } = require('../controller/authController');
const { refreshController } = require('../controller/authController');
const { logoutController } = require('../controller/authController');
const isProtected = require('../middleware/authMiddleware');

const router=express.Router();

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/refresh",refreshController)
router.post("/logout",logoutController)
router.get("/me",isProtected,getCurrentUser);
module.exports=router;