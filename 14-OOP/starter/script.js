'use strict';


// CONSTRUCTOR FUNCTIONS

// function createCheckDigit(membershipId) {
//   parseInt(membershipId, 10);
//   if(membershipId < 10) {
//     return membershipId;
//   }
//   const lastDigit = membershipId % 10;
//   const remainingNum = Math.floor(membershipId / 10);
//   return createCheckDigit(lastDigit + createCheckDigit(remainingNum));
// }
// console.log(createCheckDigit("55555"));


function createCheckDigit (membershipId) {
  if (membershipId.toString().length == 1) return membershipId;
  let New = membershipId.toString().split("").reduce((accumulate, current) => accumulate + Number(current), 0);

  return createCheckDigit(New);

};

console.log(createCheckDigit('55555')); //5
