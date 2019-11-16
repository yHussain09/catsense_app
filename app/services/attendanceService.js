const Attendance = require('../models/').Attendance

function createAttendance (attendance) {
  return Attendance
    .create({
      storeId: attendance.storeId,
      activityId: attendance.activityId,
      userId: attendance.userId,
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      createdBy: attendance.createdBy,
      createdAt: attendance.createdAt,
      updatedBy: attendance.updatedBy,
      updatedAt: attendance.updatedAt
    })
}

function getAllAttendances () {
  return Attendance.findAll()
}

function getAttendanceById (attendanceId) {
  return Attendance.findByPk( attendanceId, {
    include: ['store', 'activity', 'user']
  })
}

function updateAttendanceById (attendance, attendanceId) {
  return Attendance
    .update({
        storeId: attendance.storeId,
      activityId: attendance.activityId,
      userId: attendance.userId,
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      createdBy: attendance.createdBy,
      createdAt: attendance.createdAt,
      updatedBy: attendance.updatedBy,
      updatedAt: attendance.updatedAt
    }, {
      where: {
        attendanceId: attendanceId
      }
    })
}

function deleteAttendanceById (attendanceId) {
  return Attendance
    .destroy({
      where: {
        attendanceId: attendanceId
      }
    })
}

module.exports = {
  createAttendance: createAttendance,
  getAllAttendances: getAllAttendances,
  getAttendanceById: getAttendanceById,
  updateAttendanceById: updateAttendanceById,
  deleteAttendanceById: deleteAttendanceById
}
