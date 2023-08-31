const router = require('express').Router();

const {addNumber,getNumber} = require('../controller/address');

router.post('/add',addNumber);
router.get('/get',getNumber);

module.exports = router;