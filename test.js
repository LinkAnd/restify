function countPosBits(input){
  // your code here
  console.log(input);
 // var binary = parseInt(input, 2);
  var number = parseInt(input, 10);
  console.log(number);
  if(number === NaN){
  	return 0;
  }
  var index = 0;
  console.log(number);
  while(number != 0){
    index += parseInt(number % 2);
     number = number >> 1;
  }
  console.log(index);
  return index;
};
(countPosBits(43));
countPosBits("45 sss");
countPosBits("45");