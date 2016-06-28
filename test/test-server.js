var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');

var should = chai.should();

chai.use(chaiHttp);



describe('influential', function() {
    it('should list ALL influential tweeters on /influential/x GET', function(done) {
        chai.request(server)
            .get('/influential/haiku')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
});