const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { accessChat } = require('../Controllers/chatControllers');


const router = express.Router();
router.route('/').post(protect,accessChat)
// router.route('/').get(protect,fetchChat)
// router.route('/group').post(protect,createGropuChat);
// router.route('/rename').put(protect,renameGrop);
// router.route('/groupremove').put(protect,removeFromGroup);
// router.route('/groupadd').put(protect,addToGroup);

module.exports = router;