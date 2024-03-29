'use strict'

const express = require('express');
const organizationController = require('../../../controllers/apis/organizationController');
const roleController = require('../../../controllers/apis/roleController');
const userController = require('../../../controllers/apis/userController');
const attendanceController = require('../../../controllers/apis/attendanceController');
const productTypeController = require('../../../controllers/apis/productTypeController');
const measurementUnitController = require('../../../controllers/apis/measurementUnitController');
const productController = require('../../../controllers/apis/productController');
const countryController = require('../../../controllers/apis/countryController');
const cityController = require('../../../controllers/apis/cityController');
const areaController = require('../../../controllers/apis/areaController');
const storeController = require('../../../controllers/apis/storeController');
const activityStatusController = require('../../../controllers/apis/activityStatusController');
const activityController = require('../../../controllers/apis/activityController');
const activityProductController = require('../../../controllers/apis/activityProductController');
const activityStoreController = require('../../../controllers/apis/activityStoreController');
const activityUserController = require('../../../controllers/apis/activityUserController');
const userStoreController = require('../../../controllers/apis/userStoreController');
const customerTypeController = require('../../../controllers/apis/customerTypeController');
const customerController = require('../../../controllers/apis/customerController');
const activityDataController = require('../../../controllers/apis/activityDataController');


const router = express.Router();

router.use('/organizations', organizationController);
router.use('/roles', roleController);
router.use('/users', userController);
router.use('/attendance', attendanceController);
router.use('/productTypes', productTypeController);
router.use('/measurementUnits', measurementUnitController);
router.use('/products', productController);
router.use('/countries', countryController);
router.use('/cities', cityController);
router.use('/areas', areaController);
router.use('/stores', storeController);
router.use('/activityStatus', activityStatusController);
router.use('/activities', activityController);
router.use('/activityProducts', activityProductController);
router.use('/activityStores', activityStoreController);
router.use('/activityUsers', activityUserController);
router.use('/userStores', userStoreController);
router.use('/customerTypes', customerTypeController);
router.use('/customers', customerController);
router.use('/activityData', activityDataController);


module.exports = router;
