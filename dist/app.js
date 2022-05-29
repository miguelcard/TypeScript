"use strict";
// basic types:
// string, boolean, number, 
// any -> can be anything, ex: assign a string, then a boolean
// arrays: number[], boolean[] ...etc
let id = 5;
let isDone = true;
let firstName = 'Miguel';
let nArray = [1, 3, 4, 5, 7, 10];
nArray.push(2);
// here this array could have ANY types: 
let anyArray = [1, true, 'three'];
// but with a TUPLE you can specify exact types:
let person = [24, true, 'Miguel'];
// array of Tuple
let tupleArray;
tupleArray = [
    [22, true, 'Lalita'],
    [24, true, 'Miguel']
];
/** _________________________Other types_____________________________________ */
// Union -> can be of one type or another:
let productId;
productId = '22';
productId = 22;
// ENUM -> set of constants
var Directions;
(function (Directions) {
    Directions[Directions["up"] = 0] = "up";
    Directions[Directions["down"] = 1] = "down";
    Directions[Directions["left"] = 2] = "left";
    Directions[Directions["right"] = 3] = "right"; //3
})(Directions || (Directions = {}));
console.log(Directions.up); // by default gets values 0, 1, 2, ...
// if first onw = 1, then the others get default values accordingly
var Directions2;
(function (Directions2) {
    Directions2[Directions2["up"] = 1] = "up";
    Directions2[Directions2["down"] = 2] = "down";
    Directions2[Directions2["left"] = 3] = "left";
    Directions2[Directions2["right"] = 4] = "right"; //4
})(Directions2 || (Directions2 = {}));
// set to string values instead
var Directions3;
(function (Directions3) {
    Directions3["up"] = "up";
    Directions3["down"] = "down";
    Directions3["left"] = "left";
    Directions3["right"] = "right";
})(Directions3 || (Directions3 = {}));
console.log(Directions3.left); // gives a string = 'left'
/** _____________________________________OOP_____________________________________________ */
// Objects -> set types to each field
// opt 1
const user = {
    id: 1,
    name: 'Hedilberto'
};
const user2 = {
    id: 2,
    name: 'Ernest'
};
// Type Assertion -> like casting the type:
let cId = 111;
// Options: (any of the 3 work, but the last 2 are declared in the other variable side, would be useful for passing it to methods)
let customerId = cId;
let customerId2 = cId;
let customerId3 = cId;
const user3 = {
    id: 2,
    name: 'Ernest'
};
let p1 = 'A Point';
let p2 = 1;
let myHouse = {
    id: 1,
    address: 99,
    owner: 'me',
    // garden: true     // is optional 
};
// myHouse.id = 2;      // not allowed, is readonly
/**_________________________________Functions____________________________________________ */
// fcn syntax: same as JS but defining typesd for args and (optional) rturn type (defaults to any)
// function name(params:type): returnType {}
function addNumbers(x, y) {
    return x + y;
}
// you can also use 'void' as return type
function printMessage(message) {
    console.log(message);
}
const addOperation = (x, y) => (x + y); // like a class overriding the method signature of an interface
const substractOperation = (x, y) => (x - y);
let sum = addOperation(1, 2);
// ALSO if we want to assign a function type and specify argumetns and return type to a variable (without an Interface):
function add(a, b) {
    return a + b;
}
// lets define this can ONLY be a function and take certain parameters. the arrow is the return type
let addValues;
addValues = add;
// addValues = printMessage;  this gives error, printMessage has another signature or return type
addValues(8, 8);
//____Callback function, a function that is passed as an argument
function functionWithCallbackFunction(number, callBack) {
    callBack(number, number);
}
functionWithCallbackFunction(1, (a, b) => {
    return a + b;
});
//__________________________________________Classes_________________________________________________
class Person {
    // public lastName: string   // public: same as leaving it with no access modifier 
    constructor(id, name, bankaAcc) {
        this.id = id;
        this.name = name;
        this.bankAccount = bankaAcc;
    }
    register() {
        console.log(`${this.name} is registered`);
    }
}
const pepe = new Person(1, 'Pepe', 103982);
pepe.register();
// class implementing this interface:
class Person2 {
    // public lastName: string   // public: same as leaving it with no access modifier 
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        console.log(`${this.name} is registered`);
    }
}
// _____________________________Extend a class:__________________________
class Student extends Person2 {
    constructor(id, name, university) {
        super(id, name);
        this.university = university;
    }
    enrollInUni(uni) {
        this.university = uni;
        console.log(` student ${this.name} is now enrolled in university ${this.university}`);
    }
}
const harvardStud = new Student(2, 'Homer', 'Harvard');
harvardStud.enrollInUni('MIT');
//___________________________________Generics: Build reusable components______________________________
/* situation: we can have a function that creates an array of any[] type, BUT then the array stays with type any[]
i.e. you can push any type to it, ex: */
function getArray(items) {
    return new Array().concat(items);
}
let numArray = getArray([1, 2, 3, 4]);
let stringArray = getArray(['java', 'css', 'html']);
numArray.push('Helllo'); // gives no error, even though this is a numbers array!
// SOLUTION: __________use Generics:______________________
function getArray2(items) {
    return new Array().concat(items);
}
let numArray2 = getArray2([1, 2, 3, 4]);
let stringArray2 = getArray2(['java', 'css', 'html']);
//or
let numArray3 = getArray2([1, 2, 3, 4]);
// numArray2.push('Helllo');  // gives error! good, it should -> this makes code more robust
// TRY TO NEVER USE "ANY"
/*_________________________________the UNKNOWN and NEVER types_____________________________________*/
// we can have a variable of which we are not sure about the type yet:
let userInput;
userInput = 5;
userInput = 'Hello';
let userName;
// userName = userInput;                -> not allowed, cant assign type 'uknown' to string
if (typeof userInput === 'string') {
    userName = userInput; // -> you have to check the type, and then its allowed
}
/* unkown vs any = unknown is more restrictive, any just lets you do anything
 in short choose unknown over any when possible*/
// NEVER Type:  For Functions!
// you shoul use it for functions that really NEVER return anything, and is more clear in the code, ex: an error throwing function:
function throwError(message, code) {
    throw { message: message, code: code };
}
throwError('An error has occured', 500);
// see debugging in VS code: 3:11
