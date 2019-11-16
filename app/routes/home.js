'use strict';

const
    express = require('express'),
    homeController = require('../controllers/homeController');

let router = express.Router();

// router.get('/', homeController.index);
router.get('/admin', homeController.admin);
router.get('/client', homeController.client);
router.get('/staff', homeController.staff);
// router.get('/info', homeController.info);

module.exports = router;