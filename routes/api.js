const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.route('/').get(function (request, response) {
    response.status(200).send({status: 'OK'});
});

// can seperate all the different routes into different route files, ie:

// topics routes
router.route('/topics').get(controllers.getTopics);

router.route('/topics/:topic_name/articles').get(controllers.getTopicArticles);


// articles routes

router.route('/articles').get(controllers.getArticles);


router.route('/articles/:article_id').put(controllers.voteArticle);

// user routes

router.route('/users').get(controllers.getAllUsers);

router.route('/users/:username').get(controllers.getUser);

// comments routes

router.route('/comments/:comment_id').delete(controllers.deleteComment);

router.route('/comments/:comment_id').put(controllers.voteComment);

router.route('/articles/:article_id/comments').get(controllers.getComments);

router.route('/articles/:article_id/comments').post(controllers.addComment);

module.exports = router;
