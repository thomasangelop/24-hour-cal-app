const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Setup a POST route to add a new event to the database
router.post('/', (req, res) => {
    const event = req.body;
    const sqlText = `
    INSERT INTO user1events ("start", "end", "text", "color") 
    VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText, [
            `${event.startYear}-${event.startMonth}-${event.startDay} 
            ${event.startHour}:${event.startMinute}:00-00 ${event.startAMPM}`, 
            `${event.endYear}-${event.endMonth}-${event.endDay} 
            ${event.endHour}:${event.endMinute}:00-00 ${event.endAMPM}`,
            `<div class="mbsc-bold">${event.title}</div> <div class="md-event-desc">${event.description}</div><div class="md-event-loc mbsc-txt-muted">
            <span class="mbsc-ic mbsc-ic-location"></span>${event.location}</div>`,
            `${event.color}`])
        .then((result) => {
            console.log(`Added to the database`, event);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

module.exports = router;