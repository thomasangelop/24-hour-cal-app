const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// Setup a POST route to add a new events to the database
router.post('/', rejectUnauthenticated, (req, res) => {
    const events = req.body;
    console.log('what is events?:', events);
    const sqlText = `
    INSERT INTO user1events (person_id, "title", "description", "location", "start", "end", "text", "color") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    pool.query(sqlText, [
            `${req.user.id}`,
            // `${events.person_id}`,
            `${events.title}`,
            `${events.description}`,
            `${events.location}`,
            `${events.startYear}-${events.startMonth}-${events.startDay} 
            ${events.startHour}:${events.startMinute}:00-00 ${events.startAMPM}`, 
            `${events.endYear}-${events.endMonth}-${events.endDay} 
            ${events.endHour}:${events.endMinute}:00-00 ${events.endAMPM}`,
            `<div class="mbsc-bold">${events.title}</div> <div class="md-events-desc">${events.description}</div><div class="md-events-loc mbsc-txt-muted">
            <span class="mbsc-ic mbsc-ic-location"></span>${events.location}</div>`,
            `${events.color}`])
        .then((result) => {
            console.log(`Added to the database`);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            alert(`Error creating new event ${sqlText}`, error)
            res.sendStatus(500); // Good server always responds
        })
})

module.exports = router;