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
console.log(jonas); // Person {firstName: 'Jonas', lastName: 'Schmedtmann', birthYear: 1991}

// Difference between constructor function and regular function is that constructor function is called using 'new' keyword. What happens is as follows:
// 1. New epmty object {} is created.
// 2. function is called and {} created in step-1 is assigned 'this' keyword.
// 3. {} is linked to prototype => Creates a __proto__ property and assigns the prototype property of construction function to __proto__ ==> Will study later
// 4. function automatically returns object created in step-1. If no value is added in it => returns an empty object.

const jagrut = new Person('Jagrut', 'Sharma', 1996);
const jack = new Person('Jack', 'Sparrow', 1987);

console.log(jagrut, jack);
// Person {firstName: 'Jagrut', lastName: 'Sharma', birthYear: 1996}, Person {firstName: 'Jack', lastName: 'Sparrow', birthYear: 1987}

console.log(jagrut instanceof Person); // true

// PROTOTYPES:

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype);

jonas.calcAge(); // 46 - since jonas is calling, the this keyword will be set to jonas instance.
jack.calcAge(); // 50 - since jonas is calling, the this keyword will be set to jack instance.

console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(harsh)); // Gives error as harsh is not defined
console.log(Person.prototype.isPrototypeOf(Person)); // false => proves that it is not prototype property of Person instead prototype that will be accessible by different instances created using Person Constructor function

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, jack.species);

console.log(jonas.hasOwnProperty('firstName')); // true => own property of jonas obj
console.log(jonas.hasOwnProperty('species')); // false => not own property => present in prototype
