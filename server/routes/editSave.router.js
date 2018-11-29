const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool.js');

// Setup UPDATE to edit a specific pref
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let reqId = req.params.id;
    console.log('Update request for id', reqId); 
    const pref = req.body;
    const sqlText = `
        UPDATE userpreferences 
            SET person_id=$1,
            type_name=$2,
            time_duration=$3,
            days_out_of_the_week=$4
        WHERE id=$5
        `;
    pool.query(sqlText, [pref.person_id, pref.type_name, pref.time_duration, pref.days_out_of_the_week, reqId])
    .then((result) => {
        console.log(`Added to the database`, pref);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
    })
})

module.exports = router;