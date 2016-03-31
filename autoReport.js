var _ = require('lodash');
var url = "http://rcs.dev.riskdata.com/resources/portfolios/";
var portfolios = ["Portfolio Europe", "DIVERSIFIED"];
var request = require('request');

_.forEach(portfolios, function(portfolio){
	var urlPortFolio = url+encodeURIComponent(portfolio);
	console.log(urlPortFolio);
	request.get(urlPortFolio, function(err, res){
		console.log(res);
	});
});