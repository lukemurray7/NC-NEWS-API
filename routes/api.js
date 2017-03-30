const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.route('/').get(function (request, response) {
    response.status(200).send({status: 'OK'});
});

router.route('/topics').get(controllers.getTopics);

router.route('/topics/:topic_name/articles').get(controllers.getTopicArticles);

router.route('/articles').get(controllers.getArticles);

module.exports = router;
