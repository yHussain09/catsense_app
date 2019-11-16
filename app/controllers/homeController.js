'use strict'

// function index (req, res) {
//   res.render('index', {
//     user: req.session.user,
//     title: 'Home'
//   })
// }

function admin (req, res) {
  res.render('admin-dashboard', {
    user: req.session.user,
    title: 'Admin Dashboard'
  })
}

function client (req, res) {
  res.render('client-dashboard', {
    user: req.session.user,
    title: 'Client Dashboard'
  })
}

function staff (req, res) {
  res.render('staff-dashboard', {
    user: req.session.user,
    title: 'Staff Dashboard'
  })
}

// function info (req, res) {
//   res.render('home/info', {
//     title: 'More info'
//   })
// }

module.exports = {
  // index: index,
  // info: info,
  admin: admin,
  client: client,
  staff: staff
}
