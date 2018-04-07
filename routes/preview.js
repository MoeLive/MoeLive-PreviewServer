var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();
var path = require('path');

router.use(useragent.express());

router.get('/',function(req,res,next){

    res.sendFile(path.resolve('views/preview.html' ));

})

module.exports = router;