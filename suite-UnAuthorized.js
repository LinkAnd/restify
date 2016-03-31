/**
* DML
* endpoint = host
* routes : collection
*         route : part of url represent a service
          method : [PUT, POST, GET, DELETE]
          data   : json data to send
          status : statusCode of response
          test   : function return true or false
*/
module.exports = {
  'endpoint' : 'http://rcs.dev.riskdata.com:10000/api/v1/',
  'routes'    : [
        {
        'route'   : 'info/',
        'method'  : 'get',
        'data'    : null,
        'status' : 401,
        'test' : function(response){
           return response['CorrelationId'] !== null;
        }
      },
       {
        'route'   : 'Instrumentation/counters',
        'method'  : 'get',
        'data'    : null,
        'status' : 200,
        'test' : function(response){
           return response !== null;
        } 
      },
       {
        'route'   : 'Instrumentation/counters/counter',
        'method'  : 'get',
        'data'    : {'name':'Process|Page File Bytes'},
        'status' : 200,
        'test' : function(response){
          return response['CategoryName'] === 'Process';
        } 
      },
      {
        'route'   : 'Instrumentation/UI/',
        'method'  : 'get',
        'data'    : null,
        'status' : 200,
        'test' : function(response){
           return response != null;
        }
      },
      {
        'route'   : 'Risk/',
        'method'  : 'post',
        'data'    : {"request":null},
        'status' : 401,
        'test' : function(response){
           return response['CorrelationId'] !== null;
        }
      },
   ]
};