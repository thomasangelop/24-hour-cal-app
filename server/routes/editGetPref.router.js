const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup GET to get a specific pref
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Edit request for id', reqId);
    let sqlText = 'SELET * FROM userpreferences WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); 
        })
})

module.exports = router;