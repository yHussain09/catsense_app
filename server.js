'use strict';

const
    app = require('./app')(),
    config = require('./configs');

app.create(config);
app.start();











// const express = require('express');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
// const error = require('http-errors');

// // This will be our application entry. We'll setup our server here.
// const http = require('http');

// // Set up the express app
// const app = express();

// // Log requests to the console.
// app.use(logger('dev'));

// // Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Models
// const models = require('./app/models');

// // Sync Database
// models.sequelize.sync({ force: true }).then(function(){
//     console.log('DB Sync...');
// }).catch(function(err){
//     console.error(err, 'DB Sync failed...');
// })



// // Require our routes into the application
// require('./routes')(app);
// // Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//     message: 'rest api is start and running...',
// }));

// const port = parseInt(process.env.PORT, 10) || 3000;
// app.set('port', port);
// const server = http.createServer(app);
// server.listen(port);
// module.exports = app;