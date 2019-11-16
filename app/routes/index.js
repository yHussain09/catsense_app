'use strict';

const
    apiRoute = require('./apis'),
    homeRoute = require('./home'),
    errorRoute = require('./error'),
    userService = require('../services/userService');

function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    // server.get('/', function (req, res) {
    //     res.redirect('/home');
    // });

    server.get('/', (req, res, next) => {
        let user = req.session.user;
        if(user){
            switch(req.session.user.role.name){
                case 'ADMIN':
                        // res.status(200).send('LOGIN AS ADMIN...');
                        res.redirect('/home/admin');
                        break;
                case 'CLIENT':
                        // res.status(200).send('LOGIN AS CLIENT...');
                        res.redirect('/home/client');
                        break;
                case 'STAFF':
                        // res.status(200).send('LOGIN AS STAFF...');
                        res.redirect('/home/staff');
                        break;
                default:
                        res.render('login');        

            }
            // res.redirect('/home');
            // res.render('home');
            return;
        }
        res.render('login');
    });

    // post login data.
    server.post('/login', (req, res, next) =>{
      userService.getUserByUsername(req.body.username)
        .then(user => {
            if(user.length === 0){
                res.status(404).send('User not found!...');
            }
            if(userService.isUserValid(req.body.password, user[0].password)){
                req.session.user = user[0];
                switch(user[0].role.name){
                    case 'ADMIN':
                            // res.status(200).send('LOGIN AS ADMIN...');
                            res.redirect('/home/admin');
                            break;
                    case 'CLIENT':
                            res.redirect('/home/client');
                            break;
                    case 'STAFF':
                            res.redirect('/home/staff');
                            break;
                    default:
                            res.render('login');        
    
                }
                // res.redirect('/')
                // next();
            }
            // res.status(404)
            
        })
        .catch(error => res.status(404).send(error))
    });

    // get register view.
    server.get('/register', (req, res, next) =>{
        res.render('register');
    });
    
    // get login view.
    server.get('/login', (req, res, next) =>{
        if(req.session.user){ 
            res.redirect('/');
        }
        res.render('login');
    });

    // post register data.
    server.post('/register', (req, res, next) =>{
        const { organizationId, roleId, username, password, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
        userService.createUser({ organizationId, roleId, username, password, active, createdBy, createdAt, updatedBy, updatedAt })
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error))
    });

    // logout
    server.get('/logout', (req, res, next) => {
        if(req.session.user){
            req.session.destroy(function(){
                res.redirect('/');
            });
        }
    });

    // get session
    server.get('/getSession', (req, res, next) => {
        if(req.session){
            res.send(req.session);
        }else{

        }
    });

    server.use('/api', apiRoute);
    server.use('/home', homeRoute);
    server.use('/error', errorRoute);
}

module.exports = {
    init: init
};