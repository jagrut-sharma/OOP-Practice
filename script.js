'use strict';

const Person = function (firstName, lastName, birthYear) {
  this.firstName = firstName;
  //   this.nameFirst = firstName; // Can rename properties as well.
  this.lastName = lastName;
  this.birthYear = birthYear;

  // NEVER DO THIS
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 'Schmedtmann', 1991);
console.log(jonas);

// Difference between constructor function and regular function is that constructor function is called using 'new' keyword. What happens is as follows:
// 1. New epmty object {} is created.
// 2. function is called and {} created in step-1 is assigned 'this' keyword.
// 3. {} is linked to prototype => will study later.
// 4. function automatically returns object created in step-1. If no value is added in it => returns an empty object.

const jagrut = new Person('Jagrut', 'Sharma', 1996);
const jack = new Person('Jack', 'Sparrow', 1987);

console.log(jagrut, jack);

console.log(jagrut instanceof Person);
