"use strict";

// Value of this is always window at global level
console.log(this);

const sayHi = function () {
  // in strict mode, value of this is "undefined"
  // in normal mode it is window
  console.log("In method sayHi, value of this is: " + this);
};
sayHi();

/* Can't assign this at execution time, it is automatically assigned
at run time.
this = sayHi; */

// -------------------------------- Inside an object method --------------------------

// 'this' inside method points to the object it belongs to
let newObject = {
  method(){
    return this;
  }
}
console.log(newObject.method() === newObject);


// Inside constructor function, this points to the new {} that is being constructed
let ObjectCreator = function () {
  this.name = "crow"
}
// 'this' inside prototype method points to the object the prototype belongs to
ObjectCreator.prototype.sayName = function(){
  console.log(this.name);
}
let anotherNewObject = new ObjectCreator();
anotherNewObject.sayName();


// -------------------------------- The bind method ----------------------------------
let obj = {
  a: "a",
};

const printA = function () {
  console.log(this.a);
};

// Binding a function to an object makes a copy and permanently replaces all
// 'this' in the copy to the bound object.
let boundPrintA = printA.bind(obj);
boundPrintA();


// -------------------------------- Classes and this ----------------------------------
/**
 * 👉🏼 Classes are functions under the hood. 'this' in constructor
 * refers to {} created by the constructor and assigns its properties just
 * like 'this' in constructor functions.
 * 👉🏼 Methods are added to the prototype of the {} created by the
 * constructor.
 * 👉🏼 Static methods belong to the class itself. Not to the {} or its prototype.
 */
class Car {
  constructor(manufacturer) {
    this.manufacturer = manufacturer;
  }

  getManufacturer() {
    return this.manufacturer;
  }

  static sayManufacturer() {
    console.log(this.manufacturer);
  }
}

class Mercedes extends Car {
  constructor() {
    // Must call super inside constructor
    // OR have no constructor
    // OR return any object
    // OTHERWISE it'll give an error
    super("Mercedes");
  }
}

// ------------------------------ Arrow functions and this ------------------------------

// Arrow functions bind 'this' once to the lexical context it's created in.
// 'this' then becomes immutable.
// Will print 'window'
const anArrowFunction = () => {
  console.log(this);
};
anArrowFunction();

let myObject = {};
myObject.anArrowFunction = anArrowFunction;
// Will still print 'window'
myObject.anArrowFunction();

// Attempts to use bind won't work. Will still print 'window'
anArrowFunction.bind(myObject)();

// An arrow function's 'this' is only bound once. And then it never changes.
let anotherObject = {
  method: function () {
    let foo = () => {
      return this;
    };
    return foo;
  },
};

// The 'this' returned by anotherObject.method() still points to anotherObject
// even though it has been called from global context
const methodCopy = anotherObject.method();
console.log( methodCopy() === anotherObject);
