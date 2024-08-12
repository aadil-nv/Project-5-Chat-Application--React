const express = require('express');
const { registerUser }= require('../Controllers/userControllers');
const { authUser,allUsers }= require('../Controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router();

router.route('/').post(registerUser);//todo - Rendering HomePage

router.route('/login').post(authUser);//todo - Autherising User Credentials

router.route('/').get(protect,allUsers)


module.exports = router;