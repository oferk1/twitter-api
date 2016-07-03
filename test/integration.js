var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;
var tHelp = require('twitterHelpers');

chai.use(chaiHttp);

describe('getInfluentialTweeters', function () {

    //Positive Test
    //--------------
    //Description: this test will make an api call to twitter and make sure results in the correct json format are returned
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
    //---------------
    //  Description: this test will make an api call to twitter of a tag that has no results at al ,and 
    //  make sure results in the correct json format are returned

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
    //---------------
    //Description: this test will TWO consequential api calls to twitter, and then make a "list" api call 
    //  in order the make sure that it returns the result of the two previous api calls.
    it('Should perform 2 synced queries, and then perform the list query and check that it contains both of them', function (done) {
        var ts = new Date().getTime();
        var fakeHashTag = "test_api_ep_" + ts;
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
    //---------------
    //Description: this test will make a |list" api calls to twitter that is supposed to return no results
    //  and then make sure the jsons are correct 
    it('should list NO queries on /list/fakeHashtag GET', function (done) {
        var ts = new Date().getTime();
        var fakeHashTag = "test_api_ep_" + ts;
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
