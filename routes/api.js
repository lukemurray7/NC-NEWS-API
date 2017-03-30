const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.route('/').get(function (request, response) {
    response.status(200).send({status: 'OK'});
});

router.route('/topics').get(controllers.getTopics);

router.route('/topics/:topic_name/articles').get(controllers.getTopicArticles);

router.route('/articles').get(controllers.getArticles);

router.route('/articles/:article_id/comments').get(controllers.getComments);

router.route('/users').get(controllers.getAllUsers);

router.route('/users/:username').get(controllers.getUser);

router.route('/articles/:article_id/comments').post(controllers.addComment);

router.route('/comments/:comment_id').delete(controllers.deleteComment);

router.route('/articles/:article_id').put(controllers.voteArticle);

module.exports = router;
