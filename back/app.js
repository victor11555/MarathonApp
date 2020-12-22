const express = require('express');

const app = express();

const useMiddleware = require('./middleware/index');

const useErrorHandlers = require('./middleware/error-handlers');

const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const marathonRouter = require('./routes/marathon');
const feedbackRouter = require('./routes/feedback');


useMiddleware(app);

app.use('/main', mainRouter);
app.use('/auth', authRouter);
app.use('/marathon', marathonRouter);
app.use('/feedback', feedbackRouter);

useErrorHandlers(app);

module.exports = app;
