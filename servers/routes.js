const express = require('express'); 

console.log(`Location: routes.js - BEGIN`);

function eRoutes() {
    const router = express.Router();
    var rots = require('./repository/repository.routes.js')(router);
    return router;
}

module.exports = eRoutes;

console.log(`Location: routes.js - END`);


/*
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>res.json({username:'bryan~~~'}));
router.get('/photo', (req, res)=>res.json({username:'dev group. bryan'}));

module.exports = router;
*/