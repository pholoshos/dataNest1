const express  = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('config file')
})

router.get('/apis',(req,res)=>{
    res.send('get')
})

// create a new account/ user
router.post('/apis',(req,res)=>{
    res.send('create')
})


module.exports = router;