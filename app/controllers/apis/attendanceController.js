'use strict'

const express = require('express')

const AttendanceService = require('../../services/attendanceService')

const router = express.Router()

// create a new Attendance
router.post('/', (req, res) => {
  const { storeId, activityId, userId, checkIn, checkOut, createdBy, createdAt, updatedBy, updatedAt } = req.body
  AttendanceService.createAttendance({ storeId, activityId, userId, checkIn, checkOut, createdBy, createdAt, updatedBy, updatedAt })
    .then(attendance => res.status(201).send(attendance))
    .catch(error => res.status(400).send(error))
})

// get all Attendance.
router.get('/', (req, res) => {
  AttendanceService.getAllAttendances()
    .then(attendance => res.status(201).send(attendance))
    .catch(error => res.status(400).send(error))
})

// get Attendance by id
router.get('/:id', (req, res) => {
  AttendanceService.getAttendanceById(req.params.id)
    .then(attendance => res.status(200).send(attendance))
    .catch(error => res.status(400).send(error))
})

// update Attendance by id
router.put('/:id', (req, res) => {
  const { storeId, activityId, userId, checkIn, checkOut, createdBy, createdAt, updatedBy, updatedAt } = req.body
  AttendanceService.updateAttendanceById({ storeId, activityId, userId, checkIn, checkOut, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(Attendance => res.status(200).send(Attendance))
    .catch(error => res.status(400).send(error))
})

// delete Attendance by id
router.delete('/:id', (req, res) => {
  AttendanceService.deleteAttendanceById(req.params.id)
    .then(attendance => res.status(200).send(attendance))
    .catch(error => res.status(400).send(error))
})

module.exports = router
