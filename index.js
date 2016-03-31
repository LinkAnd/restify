var supertest = require('supertest');
var _         = require('lodash');
var request   = require('request');
var async     = require('async');
var fs        = require('fs');
var yamljs    = require('yamljs');

/**
* Permit to count error etc
*/ 
var status = {
  "ok" : [],
  "fail" : [],
};

test = null;

if(process.argv[2]){
   test = yamljs.load(process.argv[2]);
}else{
  console.error('need a test suite file');
  return false;
}

/**
* finish display
*/
function finish(){
  var totalAssert = 0;
  _.forEach(test.routes, function(route){
    totalAssert = totalAssert + _.size(route.asserts);
  });
  var state = (status.ok.length === totalAssert ) ? "Success" : "Failed";

  if(state === "Failed"){
    console.error("Test suite : %s", state);
    console.error('ok : %d, fail : %d', status.ok.length, status.fail.length);
  }else{
    console.log("Test suite : %s", state);
    console.log('ok : %d, fail : %d', status.ok.length, status.fail.length, status.warning.length);
  }  
};

function urlInject(url, data){
  _.forEach(data, function(value, index){
    console.log(value);
    console.log(index);
  });
}

/**
* Create filter
*/
function createFilter(type, response, property, value){
  if(type === "equals"){
    return function(){
      return eval(property+"==="+value);
    };
  }
  if(type === "moreThan"){
    return function(){
      return eval(property+">"+value);
    };
  }
}

/*
* body of async behavior
*/
function execTest(routeTest, next){
  console.log(JSON.stringify(routeTest.data));
  var url = test.endpoint+routeTest.url;
  if(routeTest.injectData === "url"){
    url = urlInject(url, routeTest.data);
  }
  return request[routeTest.method](url, JSON.stringify(routeTest.data), function(err, response){
      console.log("route : "+routeTest.name);
      response.body = JSON.parse(response.body);
      _.forEach(routeTest.asserts, function(assert){
         var filter = createFilter(assert.filter.type, response, assert.filter.property, assert.filter.value);
         if(filter()){
          status.ok.push({"name":routeTest.name, "stats":{}});
          console.log("OK : "+assert.message);
         }else{
          status.fail.push({"name":routeTest.name, "stats":{}});
          console.log("fail : "+assert.message);
          console.log(response.body);
         }
      });
     next();
  });
};

console.log('Running test endpoint : '+test.endpoint);
console.log('test : '+_.size(test.routes)+' route(s)');

/*
* let's do it
*/
async.each(test.routes, function(row, next){
    execTest(row, next);
}, function(err){
  if(err)
    console.log(err);
  else
    finish();
});