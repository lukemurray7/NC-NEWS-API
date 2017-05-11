const topicsModel = require('../models/topics');
const articlesModel = require('../models/articles');
const commentsModel = require('../models/comments');
const usersModel = require('../models/users');
const async = require('async');

function getTopics (request, response) {
    topicsModel.find({}, function (error, topics) {
        if (error) {
            return response.status(500).send({error: error});
        }
        response.status(200).send({topics});
    });

}

function getArticles (request, response) {

    async.waterfall([
        function (next) {
            articlesModel.find({}, function (error, articles) {
                if (error) {
                    return next(error);
                }
                next(null, articles);
            });
        },
        function (articles, next) {

            async.mapSeries(articles, function (article, done) {
                commentsModel.find({
                    belongs_to: article._id
                }, function (error, comments) {
                    if (error) {
                        return done(error);
                    }
                    article = article.toObject();
                    article.comments = comments.length;
                    done(null, article);
                });
            }, function (error, results) {
                if (error) return next(error);
                next(null, results);
            });

        }


    ],
        function (error, results) {
            if (error) {
                return response.status(500).send({error: error});
            }
            response.status(200).send({results});
        });

}

// *****************************************

// need to include getArticleByID controller

// *****************************************

function getTopicArticles (request, response, next) {
    articlesModel.find({
        belongs_to: request.params.topic_name
    }, function (error, articles) {
        if (error) {
            return next(error);
        }
        response.status(200).send({articles});
    });
}

function getComments (request, response) {
    commentsModel.find({
        belongs_to: request.params.article_id
    }, function (error, comments) {
        if (error) {
            return response.status(500).send({error});
        }
        // if (comments.length) response.status(204).send({reason: 'NO CONTENT FOUND, CHECK URL'});
        response.status(200).send({comments});
    });
}

function getAllUsers (request, response) {
    usersModel.find({}, function (error, users) {
        if (error) {
            return response.status(500).send({error});
        }
        response.status(200).send({users});
    });
}

function getUser (request, response) {
    usersModel.find({
        username: request.params.username
    }, function (error, user) {
        if (error) {
            return response.status(500).send({error});
        }
        response.status(200).send({user});
    });
}

function addComment (request, response) {
    var newComment = {
        belongs_to: request.params.article_id,
        body: request.body.comment,
        created_by: 'northcoder',
        votes: 0,
    };
    commentsModel.create([newComment], function (error, comment, next) {
        if (error) {
            return response.status(500).send({error});
        }
        response.status(200).send({comment});
    });
}

function deleteComment (request, response) {

    // need to add in a check if the user is northcoders, currently can only delete commments by northcoders, but if a comment is deleted by someone else its a sucess, should be error.

    commentsModel.remove({
        _id: request.params.comment_id
    }, function (error, comment) {
        if (error) {
            return response.status(500).send({error});
        }
        response.status(200).send({remove: 'success'});
    });
}

function voteArticle (request, response, next) {
    let newVote = {};
    if (request.query.vote === 'up') {
        newVote = {
            $inc: {votes: 1}
        };
    }
    if (request.query.vote === 'down') {
        newVote = {
            $inc: {votes: -1}
        };
    }
    articlesModel.findByIdAndUpdate(
        {_id: request.params.article_id},
        newVote,
        {new: true},
        (error, article) => {
        if (error) {
            return next(error);
        }
        response.status(201).send({article});
    });
}

function voteComment (request, response) {
    var query = request.query.vote;
    if (query === 'up') {
        newVote = {
            $inc: {votes: 1}
        };
    }
    if (query === 'down') {
        newVote = {
            $inc: {votes: -1}
        };
    }
    commentsModel.update({
        _id: request.params.comment_id
    }, newVote, function (error, comment, next) {
        if (error) {
            return response.status(500).send({error});
        }
        response.status(200).send({updated: comment});
    });
}

module.exports = {
    getTopics,
    getArticles,
    getTopicArticles,
    getComments,
    getAllUsers,
    getUser,
    addComment,
    deleteComment,
    voteArticle,
    voteComment
};