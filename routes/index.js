import express from 'express';
const router = express.Router();


import userController from '../controller/userController';
import testController from '../controller/testController';


router.post('/user', userController.user);
router.post('/result', testController.result);
module.exports = router;