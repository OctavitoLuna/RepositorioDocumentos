const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/categories', forumController.getCategories);

router.get('/comments/:categoria', forumController.getCommentsByCategory);

router.post('/comments', forumController.createComment);

module.exports = router;
