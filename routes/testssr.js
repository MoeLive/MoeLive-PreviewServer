'use strict'
var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();
var path = require('path');

import React from 'react';
import { renderToString } from 'react-dom/server';
import template from '../frontend/component/body.js';
import App from '../frontend/app.js';
router.use(useragent.express());

router.get('/*', function (req, res, next) {
    const appString = renderToString(<App req={req}/>);
  
    res.send(template({
      body: appString,
      title: 'Hello World from the server'
    }));
})

module.exports = router;