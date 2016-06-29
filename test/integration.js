var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;
var pHandler = require('persistenceHandler');
var tHelp= require('twitterHelpers');

chai.use(chaiHttp);

describe('getInfluentialTweeters', function () {
    it('should list ALL influential tweeters of hashtag "tweet" on /influential/tweeter GET', function (done) {
        var commonHashTag = "tweeter";
        chai.request(server)
            .get('/influential/' + commonHashTag)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('results');
                res.body.results.should.be.a('string');
                done();
            });
    });
});

describe('countHashtagQueries', function () {
    it('should list 2 queries of a fake hashtag x on /list/x GET', function (done) {
        var ts = new Date().getTime();
        var fakeHashTag = "test_api_ep_" + ts;
        var fileName = tHelp.getFileName(fakeHashTag);
        chai.request(server)
            .get('/influential/' + fakeHashTag)
            .end(function (err, res) {
                chai.request(server)
                    .get('/influential/' + fakeHashTag)
                    .end(function (err, res) {
                        chai.request(server)
                            .get('/list/' + fakeHashTag)
                            .end(function (err, res) {
                                res.should.have.status(200);
                                res.should.be.json;
                                res.body.should.be.a('object');
                                res.body.should.have.property('results');
                                res.body.results.should.be.a('object');
                                expect(Object.keys(res.body.results)).to.have.length(2);
                                done();
                            });
                    });
            });
    });

});