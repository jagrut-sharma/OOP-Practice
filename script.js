'use strict';

// Coding Challenge - 4:

// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.make, this.speed);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(this.make, this.speed);
    return this;
  }

  get speedUS() {
    return Number((this.speed / 1.6).toFixed(2));
  }

  set speedUS(speedInUS) {
    this.speed = speedInUS * 1.6;
    console.log(this.make, this.speed);
  }
}

class EVCL extends CarCl {
  // Private classfield
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeTo(chargeLevel) {
    this.#charge = chargeLevel;
    console.log(`Battery level is at ${this.#charge}`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} and is currently at ${
        this.#charge
      }%.`
    );
    return this;
  }

  getBattery() {
    return this.#charge;
  }
}

const bmw = new CarCl('BMW', 120, 85);
const mercedes = new EVCL('Mercedes', 95, 91);
const tata = new EVCL('TATA', 91, 23);

tata
  .accelerate()
  .brake()
  .accelerate()
  .chargeTo(60)
  .brake()
  .brake()
  .accelerate()
  .chargeTo(100);

console.log(tata.getBattery());

// console.log(tata.#charge); // gives error
/*
class Account {
  // 1) Public Class Fields:
  local = navigator.language; // still everything works => These properties are available in all 'instances' and not the prototype

  // 2) Private Class Fields:
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.local = navigator.language;

    console.log(`Thanks for opening an account with us!`);
  }

  // 3.) Public methods:

  // Public interface

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  getMovements() {
    return this.#movements;
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved!`);
      return this;
    }
  }

  // 4) Private Method:
  // #approveLoan(val){
  //   return true;
  // }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1); // Account {owner: 'Jonas', currency: 'EUR', pin: 1111, movements: [], local: 'en-US'}

// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdrawal(140);
acc1.requestLoan(1000);

// Accessing things we shouldn't:
console.log(acc1); // Account {owner: 'Jonas', currency: 'EUR', pin: 1111, movements: [250, -140, 1000], local: 'en-US'}
// After adding class fields => Account {local: 'en-US', owner: 'Jonas', currency: 'EUR', #movements: Array(3), #pin: 1111}
console.log(acc1._pin); // 1111 => People can access but they will know through this convention that this should not be edited
// console.log(acc1.#pin); // Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class (at script.js:57:17)
console.log(acc1._approveLoan(100));

console.log(acc1.getMovements()); // [250, -140, 1000]
// console.log(acc1.#movements); // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class (at script.js:59:17) => Can't access it.
acc1.deposit(300).deposit(500).withdrawal(35).requestLoan(1000).withdrawal(700);
console.log(acc1.getMovements()); // [250, -140, 1000, 300, 500, -35, 1000, -700]
/*
const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge() {
    console.log(2037 - this.birthYear);
  },
};

const sarah = Object.create(PersonProto);
// console.log(sarah); // {}
// sarah.init('Sarah', 1998);
// console.log(sarah); // {firstName: 'Sarah', birthYear: 1998}
// sarah.calcAge(); // 39
// console.log(sarah.__proto__); // {init: ƒ, calcAge: ƒ}

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Hi, I'm ${this.firstName} and I am pursuing ${this.course}`);
};

StudentProto.calcAge = function () {
  console.log(
    `I am ${
      2037 - this.birthYear
    } years old, but as a student I feel much older`
  );
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Web Development');

console.log(jay);
jay.introduce(); // Hi, I'm Jay and I am pursuing Web Development
jay.calcAge(); // I am 27 years old, but as a student I feel much older => Overwrites calcAge in PersonProto

// Inheritance between Classes using Object.create:

/*
class PersonCl {
  // constructor function needs to be written using constructor keyword

  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // All functions defined outside contructor will automatically go into prototype

  calcAge() {
    console.log(2037 - this.birthYear);
  }

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

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // call to super needs to happen first as it is responsible for creatig this keyword.
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`Hi, I'm ${this.fullName} and I am pursuing ${this.course}`);
  }

  calcAge() {
    console.log(
      `I am ${
        2037 - this.birthYear
      } years old, but as a student I feel much older`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2016, 'CSE');
console.log(martha); // StudentCl {_fullName: 'Martha Jones', birthYear: 2016, course: 'CSE'}
martha.introduce(); // Hi, I'm Martha Jones and I am pursuing CSE
console.log(martha.age); // 21
martha.calcAge(); // I am 21 years old, but as a student I feel much older

// Here, as parameters are same -> we do not even need to call the super function => It automatically happens
/* class StudentCl extends PersonCl {
}

const jack = new StudentCl('Jack Sparrow', 2004);
console.log(jack);
console.log(jack.fullName); */

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// To link the prototype chain
EV.prototype = Object.create(Car.prototype);
// To make a EV's instance the EV construcor function that was reset to Car due to Object.create()
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`Battery currently at ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed}, with a charge of ${this.charge}%`
  );
};

// console.dir(EV.prototype.constructor);

const tata = new EV('TATA', 90, 80);
console.log(tata);

const tesla = new EV('Tesla', 110, 90);
console.log(tesla);

tata.accelerate();
tata.brake();
tata.accelerate();
tata.chargeBattery(90);

tesla.accelerate();
tata.accelerate();

/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi, I'm ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2009, 'CS');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true => Would have given false if Object.create was not used to link prototype chain.
console.log(mike instanceof Object); // true

console.dir(Student.prototype.constructor); // ƒ Person(firstName, birthYear)
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // ƒ Student(firstName, birthYear, course)

/*
// Coding Challenge - 2:

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.make, this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.make, this.speed);
  }

  get speedUS() {
    return Number((this.speed / 1.6).toFixed(2));
  }

  set speedUS(speedInUS) {
    this.speed = speedInUS * 1.6;
    console.log(this.make, this.speed);
  }

  // set speed(sample) {
  //   this._speed = sample * 1.5;
  // }

  // get speed() {
  //   return this._speed;
  // }
}

const bmw = new CarCl('BMW', 120);
const mercedes = new CarCl('Mercedes', 95);

console.log(bmw, mercedes);

bmw.brake(); // BMW 115
mercedes.brake(); // Mercedes 90
mercedes.accelerate(); // Mercedes 100
mercedes.accelerate(); // Mercedes 110

const ford = new CarCl('Ford', 120);
console.log(ford); // CarCl {make: 'Ford', speed: 120}
console.log(ford.speedUS); // 75
ford.speedUS = 80; // Ford 128

/*
// Object.Create METHOD TO CREATE CLASS

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven); // return empty object with PersonProto as prototype.
steven.name = 'Steven';
steven.birthYear = 1970;
console.log(steven); // {name: 'Steven', birthYear: 1970}
steven.calcAge(); // 67

console.log(PersonProto === steven.__proto__); // true => PersonProto is assigned as a prototype to steven

// Using init function as a replacement of constructor function
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1980);
sarah.calcAge(); // 57
console.log(sarah); // {firstName: 'Sarah', birthYear: 1980}

/*
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

PersonCl.hey(); // Hey There. Hope you are doing well.
// harsh.hey(); // gives error as harsh.hey is not a function => hey() is not present in the prototype but instead attached to construcor function and is only available there.

PersonCl.namastey(); // Namastey, I'm a person
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

console.log(harsh.__proto__ === PersonCl.prototype); // true


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
