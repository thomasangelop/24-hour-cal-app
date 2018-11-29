const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// Setup a POST route to add a new pref to the database
router.post('/', rejectUnauthenticated, (req, res) => {
    const pref = req.body;
    const sqlText = `INSERT INTO userpreferences (person_id, type_name, start_date, 
        end_date, time_duration, days_out_of_the_week) 
        VALUES ($1, $2, $3, $4, $5, $6)`;
    
    pool.query(sqlText, [pref.person_id, pref.type_name, pref.start_date, pref.end_date, pref.time_duration, pref.days_out_of_the_week])
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