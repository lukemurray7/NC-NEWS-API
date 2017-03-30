const topicsModel = require('../models/topics');
const articlesModel = require('../models/articles');
const commentsModel = require('../models/comments');
const usersModel = require('../models/users');

function getTopics(request, response) {
    topicsModel.find({}, function (error, topics) {
        if (error) {
            return response.status(500).send({ error: error });
        }
        response.status(200).send({ topics });
    })

}

function getArticles(request, response) {
    articlesModel.find({}, function (error, articles) {
        if (error) {
            return response.status(500).send({ error: error });
        }
        response.status(200).send({ articles });
    })
}

function getTopicArticles(request, response, next) {
    articlesModel.find({
        belongs_to: request.params.topic_name
    }, function (error, articles) {
        if (error) {
            return next(error);
        }
        response.status(200).send({ articles });
    })
}

function getComments(request, response) {
    commentsModel.find({
        belongs_to: request.params.article_id
    }, function (error, comments) {
        if (error) {
            return response.status(500).send({ error });
        }
        response.status(200).send({ comments });
    });
}

function getAllUsers(request, response) {
    usersModel.find({}, function (error, users) {
        if (error) {
            return response.status(500).send({ error });
        }
        response.status(200).send({ users });
    })
}

function getUser(request, response) {
    usersModel.find({
        username: request.params.username
    }, function (error, user) {
        if (error) {
            return response.status(500).send({ error });
        }
        response.status(200).send({ user })
    })
}

module.exports = {
    getTopics,
    getArticles,
    getTopicArticles,
    getComments,
    getAllUsers,
    getUser
}