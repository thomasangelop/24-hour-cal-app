const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlText = `SELECT projects.id, projects.name, projects.description, 
    projects.thumbnail, projects.website, projects.github, projects.date_completed, 
    tags.name AS tag_name FROM projects JOIN tags ON projects.tag_id=tags.id ORDER 
    BY projects.name;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;