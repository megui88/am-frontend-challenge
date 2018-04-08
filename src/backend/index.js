const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(logger(app.get('env') === 'development' ? 'dev' : 'tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(routes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    const message = app.get('env') === 'development' ? err.message : '';

    // render the error page
    res.status(err.status || err.statusCode || 500);
    res.json({error: message});
});
app.listen(3001, function() {
    console.log('Almundo Examen backend app listening on port 3001!');
});
