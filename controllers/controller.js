const topicsModel = require('../models/topics');
const articlesModel = require('../models/articles');

function getTopics (request, response) {
    topicsModel.find({}, function (error, topics) {
        if (error) {
            return response.status(500).send({error: error});
        }
        response.status(200).send({topics});
    })

}

function getArticles (request, response) {
    articlesModel.find({}, function (error, articles){
        if (error) {
            return response.status(500).send({error: error});
        }
        response.status(200).send({articles});
    })
}

function getTopicArticles (request, response) {
    articlesModel.find({
        belongs_to: request.params.topic_name 
    }, function (error, articles) {
        if (error) {
            return response.status(500).send({error})
        }
        response.status(200).send({articles});
    })
}

module.exports = {
    getTopics,
    getArticles,
    getTopicArticles
}