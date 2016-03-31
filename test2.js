function drink(Promise, friend, pints){
// console.log(Promise);
  
  Promise.reselve = function(toto){
    console.log("sucess");
  }
  
  friend.drink();
  
}

function Person(name){
  this.name = name;
}

Person.prototype = {
  name: null
};

Person.prototype.drink = function(){
  if (maximumReached())
    return Promise.reject({});

  count++;
  return Promise.resolve({});
}