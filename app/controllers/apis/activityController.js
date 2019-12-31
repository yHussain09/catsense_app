'use strict';

const express = require('express');

const ActivityService = require('../../services/ActivityService');

const router = express.Router();

// create a new Activity
router.post('/', (req, res) => {
  const { organizationId, activityStatusId, name, description, days, startDate, endDate, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityService.createActivity({ organizationId, activityStatusId, name, description, days, startDate, endDate, createdBy, createdAt, updatedBy, updatedAt })
    .then(activity => res.status(201).send(activity))
    .catch(error => res.status(400).send(error))
})

// get all Activity.
router.get('/', (req, res) => {
  ActivityService.getAllActivitys(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(activity => res.status(200).send(activity))
    .catch(error => res.status(400).send(error));
})

// get all activities {activityId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  ActivityService.getActivityDataCombo()
    .then(activity => res.status(200).send(activity))
    .catch(error => res.status(400).send(error));
});

// get all activitiesByOrgaCode {activityId, name} for data combo.
router.get('/dataComboByOrga', (req, res) => {
  ActivityService.getActivityDataComboByOrga(req.session.user.organizationId)
    .then(activity => res.status(200).send(activity))
    .catch(error => res.status(400).send(error));
});

// get Activity by id
router.get('/:id', (req, res) => {
  ActivityService.getActivityById(req.params.id)
    .then(activity => res.status(200).send(activity))
    .catch(error => res.status(400).send(error));
})

// update Activity by id
router.put('/:id', (req, res) => {
  const { organizationId, activityStatusId, name, description, days, startDate, endDate, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityService.updateActivityById({ organizationId, activityStatusId, name, description, days, startDate, endDate, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(activity => res.status(200).send(activity))
    .catch(error => res.status(400).send(error))
})

// delete Activity by id
router.delete('/:id', (req, res) => {
  ActivityService.deleteActivityById(req.params.id)
    .then(activity => res.status(200).send(activity))
    .catch(error => res.status(400).send(error))
})

module.exports = router
