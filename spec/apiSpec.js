process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const _ = require('underscore');

const request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // gets rid of deprecations error

const seed = require('../seed/test.seed');

const PORT = require('../config').PORT[process.env.NODE_ENV];

const ROOT = `http://localhost:${PORT}/api`;

// server (we need to get the server up and running!)

require('../server');

before(done => {
    mongoose.connection.once('connected', () => {
        mongoose.connection.db.dropDatabase(() => {
            console.log('Dropped DB');
            seed(() => {
                done();
            });
        });
    });
});

describe('API ROUTES', () => {
    describe('GET /api', () => {
        it('should return the status is OK', (done) => {
            request(ROOT) // callback based library (either error or response) (like axious, then and catch)
                .get('/')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.eql({ status: 'OK' });
                    expect(response.body.status).to.equal('OK');
                    done();
                });
        });
    });
    describe('GET /api/topics', () => {
        it('should return the topics', (done) => {
            request(ROOT) // callback based library (either error or response) (like axious, then and catch)
                .get('/topics')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    const topics = response.body.topics.map(function (topic) {
                        return topic.title;
                    });
                    const football = _.contains(topics, 'Football');
                    const cooking = _.contains(topics, 'Cooking');
                    const cats = _.contains(topics, 'Cats');
                    expect(football).to.equal(true);
                    expect(cooking).to.equal(true);
                    expect(cats).to.equal(true);
                    done();
                });
        });
    });
    describe('GET /api/articles', () => {
        it('should return the topics', (done) => {
            request(ROOT) // callback based library (either error or response) (like axious, then and catch)
                .get('/topics')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect

                    done();
                });
        });
    });
});

