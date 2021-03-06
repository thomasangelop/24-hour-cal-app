
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const prefRouter = require('./routes/pref.router');
const newPrefRouter = require('./routes/newPref.router');
const deletePref = require('./routes/deletePref.router');
const editGetPref = require('./routes/editGetPref.router');
const editSave = require('./routes/editSave.router');
const eventRouter = require('./routes/event.router');
const newOneTimeEvent = require('./routes/newOneTimeEvent.router');
const deleteEvent = require('./routes/deleteEvent.router');
const editEvent = require('./routes/editEvent.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/pref', prefRouter);
app.use('/api/newPref', newPrefRouter);
app.use('/api/delete', deletePref);
app.use('/api/editget', editGetPref);
app.use('/api/editsave', editSave);
app.use('/api/event', eventRouter);
app.use('/api/newOneTimeEvent', newOneTimeEvent);
app.use('/api/deleteevent', deleteEvent);
app.use('/api/editevent', editEvent)




// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
