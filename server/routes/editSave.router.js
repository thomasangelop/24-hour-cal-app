const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup UPDATE to edit a specific pref
router.put('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Update request for id', reqId); 
    const pref = req.body;
    const sqlText = `
        UPDATE userpreferences 
            SET person_id=$2,
            type_name=$3,
            time_duration=$4,
            days_out_of_the_week=$5
        WHERE id=$1`;
    pool.query(sqlText, [reqId, pref.person_id, pref.type_name, pref.time_duration, pref.days_out_of_the_week])
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