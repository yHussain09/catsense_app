'use strict'

const express = require('express');

const UserStoreService = require('../../services/userStoreService');

const router = express.Router();

// create a new UserStore
router.post('/', (req, res) => {
  const { userId, storeId, createdBy, createdAt, updatedBy, updatedAt } = req.body;
  UserStoreService.createUserStore({ userId, storeId, createdBy, createdAt, updatedBy, updatedAt })
    .then(activityStore => res.status(201).send(activityStore))
    .catch(error => res.status(400).send(error));
});

// get all UserStore.
router.get('/', (req, res) => {
  UserStoreService.getAllUserStores(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(userStore => res.status(201).send(userStore))
    .catch(error => res.status(400).send(error));
});

// get UserStore by id
router.get('/:id', (req, res) => {
  UserStoreService.getUserStoreById(req.params.id)
    .then(userStore => res.status(200).send(userStore))
    .catch(error => res.status(400).send(error));
});

// update UserStore by id
router.put('/:id', (req, res) => {
  const { userId, storeId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  UserStoreService.updateUserStoreById({ userId, storeId, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(userStore => res.status(200).send(userStore))
    .catch(error => res.status(400).send(error));
});

// delete UserStore by id
router.delete('/:id', (req, res) => {
  UserStoreService.deleteUserStoreById(req.params.id)
    .then(userStore => res.status(200).send(userStore))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
