'use strict';

const
    express = require('express'),
    // expressHandlebars = require('express-handlebars'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    Sequelize = require('sequelize'),
    session = require('express-session'),
    
    bcrypt = require('bcrypt'),

    
    models = require('./models');



module.exports = function() {
    let server = express(),
        // dbConnect,
        // dbDisConnect,
        Sequelize,
        create,
        start;

    // dbConnect = function(database, username, password, host, dialect){
    //     const sequelize = new Sequelize(database, username, password, {
    //         host: host,
    //         dialect:  dialect 
    //       });
        
    //       sequelize.authenticate()
    //         .then(() => {
    //             console.log('Database Connection has been established successfully...');
    //         })
    //         .catch(err => {
    //             console.error('Unable to connect to the database:', err);
    //         });
    // };

    // dbDisConnect = function(){
    //     sequelize.close();
    // };

    create = function(config) {
        let routes = require('./routes');

        // Server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('viewDir', config.viewDir);
        server.set('publicDir', config.publicDir);

        // Returns middleware that parses json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));

        // Log requests to the console.
        server.use(logger('dev'));

        // Setup view engine
        // server.engine('.hbs', expressHandlebars({
        //     defaultLayout: 'default',
        //     layoutsDir: config.viewDir + '/layouts',
        //     extname: '.hbs'
        // }));
        // server.set('views', server.get('viewDir'));
        // server.set('view engine', '.hbs');
        
        // serve static files.
        server.use(express.static(server.get('publicDir')));

        // template engine.
        server.set('views', server.get('viewDir'));    
        server.set('view engine', 'pug');

        // session
        server.use(session({
            secret : 'bigcat_catsense_app',
            resave : false,
            saveUninitialized : false,
            cookie : {
                maxAge : 60 * 1000 * 30
            }
        }));

        // Set up routes
        routes.init(server);
    };

    start = function() {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
        
        // Sync Database
        // models.sequelize.sync({ force: true }).then(function(){
        //     console.log('DB Sync...');
        // }).catch(function(err){
        //     console.error(err, 'DB Sync failed...');
        // });
    };

    return {
        create: create,
        start: start,
        Sequelize: Sequelize
        // dbConnect: dbConnect,
        // dbDisConnect : dbDisConnect
    };
};