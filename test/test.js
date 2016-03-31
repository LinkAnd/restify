var supertest = require('supertest');
var should    = require('should');

describe('a test', function(){
   it("redirect", function(done){
   	  supertest.agent('http://rcs.dev.riskdata.com/')
   	  .get('/')
   	  .expect(302, done);
   });
   it('login',function(done){
   	  supertest.agent('http://rcs.dev.riskdata.com:10002')
   	  .get('/api/v1/Login/Login.html')
   	  .expect(200, done);
   });
});


describe('get documentation for 10000', function(){
	var info = {};
	it('docuementation load', function(done){
		supertest.agent('http://rcs.dev.riskdata.com:10000')
		.get('/swagger/docs/v1')
		.set('Accept', 'application/json')
	      .expect(200)
	      .end(function(err, res){
	        if (err) return done(err);
	        console.log(res);
	      });

	});
});