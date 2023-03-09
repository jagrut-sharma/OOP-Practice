'use strict';

// SETTERS/GETTERS AND STATIC METHODS:

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(num) {
    this.movements.push(num);
    console.log(this);
  },
};

console.log(account.latest);

account.latest = 50; // The calue is just assigned instead of calling the method. Since it acts like a peoperty and not a method

console.log(`---------------------------------------------------------`);
class PersonCl {
  // constructor function needs to be written using constructor keyword

  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // All functions defined outside contructor will automatically go into prototype

  get age() {
    return 2037 - this.birthYear;
  }

  // Set useful for DATA VALIDATION: => Setting a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  greet() {
    console.log(`Hi, this is ${this.firstName}.`);
  }

  // static functions => only attached to constructor function => not accessible to prototype

  static namastey() {
    console.log(`Namastey, I'm a person`);
  }
}

const harsh = new PersonCl('Harsh Mohite', 1996);
console.log(harsh);
console.log(harsh.fullName); // Harsh Mohite

const walter = new PersonCl('Walter White', 1950);
console.log(walter); // _fullName will be missing.

console.log(Array.from(document.querySelectorAll('h1'))); // [h1] => converts array like structure into an array.
// console.log([1, 2, 3].from()); // Gives `tyoe error: .from is not a function`

PersonCl.hey = function () {
  console.log(`Hey There. Hope you are doing well.`);
};

PersonCl.hey();
// harsh.hey(); // gives error as harsh.hey is not a function => hey() is not present in the prototype but instead attached to construcor function and is only available there.

PersonCl.namastey();
// harsh.namastey(); // gives type error: harsh.namastey is not a function.

/*
// ES6 Classes:

// Class Expression:

const Individual = class {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  getAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hi! My name is ${this.firstName}`);
  }
};

const swastik = new Individual('Swastik', 1999);
console.log(swastik);

// Class Declaration:

class PersonCl {
  // constructor function needs to be written using constructor keyword

  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // All functions defined outside contructor will automatically go into prototype

  getAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hi, this is ${this.firstName}.`);
  }
}

const harsh = new PersonCl('Harsh', 1995);
console.log(harsh);

harsh.getAge(); // 41
harsh.greet(); // Hi! My name is Harsh

console.log(harsh.__proto__ === PersonCl.prototype);


/*
// CODING CHALLENGE -1 :

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1);
console.log(car2);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

Car.prototype.hasABS = true;

car1.brake(); // 115
car1.brake(); // 110
car2.brake(); // 90
car2.accelerate(); // 100
car2.accelerate(); // 110

console.log(car1.hasABS); // true

/*
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
*/
