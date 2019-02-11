
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

const jobsRouter = require('./routes/jobs.router')

//const wsRouter = require('./routes/ws.router')

const p2pRouter = require('./routes/p2p.router')

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
app.use('/api/jobs', jobsRouter)
app.use('/api/p2p', p2pRouter)
//app.use('/api/ws', wsRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
