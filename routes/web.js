let router = require('express').Router();
let homepageController = require('../controllers/HomepageController');
let authController = require('../controllers/AuthController');
let autoValidator = require('../validator/AutoValidator');
let pagesController = require('../controllers/PagesController');
let rolPermission = require('../middlewares/authentication');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

router.get('/', homepageController.index);

// Authentication routes
router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/reset-password', authController.password);

//Pages
router.get('/dashboard', rolPermission(['Admin', 'Usuario']) ,pagesController.dashboard);
router.get('/users', rolPermission(['Admin']), pagesController.users);
router.get('/error', pagesController.error);

//POST REGISTRO
router.post('/register', autoValidator.store, 
    authController.registerUser);

//POST LOGIN
router.post('/login', authController.getUser);

//POST RESET PASSWORD
router.post('/reset-password', authController.resetPassword);


module.exports = router;
