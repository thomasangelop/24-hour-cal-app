const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Setup a POST route to add a new pref to the database
router.post('/', (req, res) => {
    const pref = req.body;
    const sqlText = `
    INSERT INTO user1events ("start", "end", "text", "color") 
    VALUES ($1, $2, $3, $4)`;
        ('2018-11-28 12:00:00-00', 
        '2018-11-28 13:00:00-00', 
        'Text Test <div class="md-event-desc">NOT BOLD DESCRIPTION</div><div class="md-event-loc mbsc-txt-muted"><span class="mbsc-ic mbsc-ic-location"></span>Office</div>'
        , 'ffffff')
    pool.query(sqlText, [`asdfasdfasdf${pref.person_id}`, pref.type_name, pref.start_date, pref.end_date, pref.time_duration, pref.days_out_of_the_week])
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