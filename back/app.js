const express = require('express');

const app = express();

const useMiddleware = require('./middleware/index');

const useErrorHandlers = require('./middleware/error-handlers');

const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');


useMiddleware(app);

app.use('/main', mainRouter);
app.use('/auth', authRouter);

useErrorHandlers(app);

module.exports = app;
