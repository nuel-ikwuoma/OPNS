const router = require('express').Router();

const {addNumber,sendCode,verifyCode,getNumber} = require('../controller/address');

router.post('/add',addNumber);
router.get('/send',sendCode);
router.get('/verify',verifyCode);

router.get('/get',getNumber);

module.exports = router;