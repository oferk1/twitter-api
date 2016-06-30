var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;
var tHelp = require('twitterHelpers');

chai.use(chaiHttp);

describe('getInfluentialTweeters', function () {

    //Positive Test
    it('should list TOP 5 influential tweeters of hashtag "tweeter" on /influential/tweeter GET', function (done) {
        var commonHashTag = "dog";
        chai.request(server)
            .get('/influential/' + commonHashTag)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('results');
                res.body.results.should.be.a('string');
                expect(res.body.results).to.not.be.empty;
                done();
            });
    });

    // Negative Test
    it('should list NO influential tweeters of a fake hashtag on /influential/fakehashtag GET', function (done) {
        var ts = new Date().getTime();
        var fakeHashTag = "test_api_ep_" + ts;
        chai.request(server)
            .get('/influential/' + fakeHashTag)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('results');
                res.body.results.should.be.a('string');
                expect(res.body.results).to.be.empty;
                done();
            });
    });
});

describe('countHashtagQueries', function () {

    // Positive Test
    it('should create 2 queries of a fake hashtag x and then list them on /list/x GET', function (done) {
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

    // Negative Test
    it('should list NO queries on /list/fakeHashtag GET', function (done) {
        var ts = new Date().getTime();
        var fakeHashTag = "test_api_ep_" + ts;
        var fileName = tHelp.getFileName(fakeHashTag);
        chai.request(server)
            .get('/list/' + fakeHashTag)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('results');
                res.body.results.should.be.a('object');
                expect(res.body.results).to.be.empty;
                done();
            });
    });

});
