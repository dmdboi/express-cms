const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const gateway = require("../middleware/check-auth")


router.get('/signup', gateway.checkNotAuthenticated, userController.getSignup);
router.post('/signup', gateway.checkNotAuthenticated, userController.postSignup);

router.get('/login', gateway.checkNotAuthenticated, userController.getLogin);
router.post('/login', gateway.checkNotAuthenticated, userController.postLogin);

router.get('/logout', gateway.checkAuthenticated, userController.logout);

module.exports = router;
