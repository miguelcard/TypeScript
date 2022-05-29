// basic types:

// string, boolean, number, 
// any -> can be anything, ex: assign a string, then a boolean
// arrays: number[], boolean[] ...etc

let id: number = 5;
let isDone: boolean = true;
let firstName: string = 'Miguel';

let nArray: number[] = [1,3,4,5,7,10];
nArray.push(2);

// here this array could have ANY types: 
let anyArray: any[] = [1, true, 'three'];

// but with a TUPLE you can specify exact types:
let person: [number, boolean, string] = [24, true, 'Miguel'];

// array of Tuple
let tupleArray: [number, boolean, string][];
tupleArray = [
    [22, true, 'Lalita'], 
    [24, true, 'Miguel']
];


/** _________________________Other types_____________________________________ */

// Union -> can be of one type or another:
let productId: string | number;
productId = '22';
productId = 22;

// ENUM -> set of constants
enum Directions {
    up,     //0
    down,   //1
    left,   //2
    right   //3
}
console.log(Directions.up); // by default gets values 0, 1, 2, ...

// if first onw = 1, then the others get default values accordingly
enum Directions2 {
    up = 1,
    down,   //2
    left,   //3
    right   //4
}

// set to string values instead
enum Directions3{
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right'
}

console.log(Directions3.left); // gives a string = 'left'


/** _____________________________________OOP_____________________________________________ */

// Objects -> set types to each field
// opt 1
const user: {id:number, name:string} = {
    id: 1,
    name: 'Hedilberto'
}

//opt 2 cleaner:
type User = {
    id:number, 
    name:string
}
const user2: User = {
    id: 2,
    name: 'Ernest'
}

// Type Assertion -> like casting the type:
let cId: any = 111;
// Options: (any of the 3 work, but the last 2 are declared in the other variable side, would be useful for passing it to methods)
let customerId: number = cId;
let customerId2 = <number> cId;
let customerId3 = cId as number;


// ___________________________________________Interfaces -> like structure to an object__________________

interface UserInterface {
    id:number, 
    name:string
}

const user3: UserInterface = {
    id: 2,
    name: 'Ernest'
}

/* Note: guy from vid would use an interface over a type to Describe objects (just preference) 
    but there are differences: 
    
    type: can be used with primitives and unions, 
    inderface: can't do that       ex:*/

type Point = string | number;
let p1 : Point = 'A Point';
let p2 : Point = 1;

// interface PointInterface = string | number; // Not valid!

// TYPE can also be EXTENDED like this:
type Animal = {
    readonly legs: number;
    diet?: string
}

type Mascot = Animal & {
    breed: string;
    owner: string;
}

// then the mascot object is composed also by the animal one
let myDog: Mascot = {
    legs: 4,
    breed: 'Doberman',
    owner: 'me'
}

// Interface can be EXTENDED just with the 'extended' keyword (Cleaner in my view):

interface WorkerInt extends Person2 {
    company: string
}

// An interface can also extend a type and a type can extend an Interface "with &"

/* interface: Allows you to specify OPTIONAL and READ-ONLY properties - > TYPE lets you do the same actually*/

interface HouseInterface {
    readonly id: number   // readonly prop
    address: number
    owner: string
    garden?: boolean      // optional prop
}

let myHouse: HouseInterface =
{
    id: 1,
    address: 99,
    owner: 'me',
    // garden: true     // is optional 
}

// myHouse.id = 2;      // not allowed, is readonly


/**_________________________________Functions____________________________________________ */

// fcn syntax: same as JS but defining typesd for args and (optional) rturn type (defaults to any)
// function name(params:type): returnType {}
function addNumbers(x:number, y:number): number {
    return x + y;
}

// you can also use 'void' as return type
function printMessage(message :string | number): void {
    console.log(message);
}

// Interfaces with Functions:

// defining method signature in interface
interface OperationInterface {
    (x: number, y:number): number
}

const addOperation: OperationInterface = (x: number, y: number): number => (x + y);     // like a class overriding the method signature of an interface
const substractOperation: OperationInterface = (x: number, y: number): number => (x - y);

let sum :number = addOperation(1 , 2);


// ALSO if we want to assign a function type and specify argumetns and return type to a variable (without an Interface):

function add(a:number, b: number): number {
    return a + b;
}

// lets define this can ONLY be a function and take certain parameters. the arrow is the return type
let addValues: (a: number, b: number) => number;
addValues = add;
// addValues = printMessage;  this gives error, printMessage has another signature or return type
addValues(8,8);

//____Callback function, a function that is passed as an argument
function functionWithCallbackFunction(number:number, callBack: (a: number, b: number) => number) {
    callBack(number, number);
}

functionWithCallbackFunction(1, (a,b) => { 
    return a + b;
});


//__________________________________________Classes_________________________________________________

class Person {

    protected id: number
    private bankAccount: number
    name: string
    // public lastName: string   // public: same as leaving it with no access modifier 

    constructor(id: number, name: string, bankaAcc: number){
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

// Access Modifiers (3 SAME AS JAVA):   public   private   protected
// protected: only access on extenging classes (same as java, but java also has the same package thing)

// ____Class and Interfaces______implement interface___________________

// given an interface which defines what a class should look like:
interface PersonInterface {
    id: number
    name: string
    register(): void
}

// class implementing this interface:
class Person2 implements PersonInterface {

    id: number
    name: string
    // public lastName: string   // public: same as leaving it with no access modifier 

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }

    register() {
        console.log(`${this.name} is registered`);
    }
}

// _____________________________Extend a class:__________________________

class Student extends Person2{

    university: string

    constructor(id: number, name: string, university: string){
        super(id, name);
        this.university = university;
    }

    enrollInUni(uni: string): void{
        this.university = uni;
        console.log(` student ${this.name} is now enrolled in university ${this.university}`);
    }
}

const harvardStud = new Student(2, 'Homer', 'Harvard');
harvardStud.enrollInUni('MIT')


//___________________________________Generics: Build reusable components______________________________

/* situation: we can have a function that creates an array of any[] type, BUT then the array stays with type any[] 
i.e. you can push any type to it, ex: */
function getArray( items: any[]): any[] {
    return new Array().concat(items);
}

let numArray = getArray([1,2,3,4]);
let stringArray = getArray(['java', 'css', 'html']);

numArray.push('Helllo'); // gives no error, even though this is a numbers array!


// SOLUTION: __________use Generics:______________________
function getArray2<T>(items: T[]): T[] {
    return new Array().concat(items);
}

let numArray2 = getArray2([1,2,3,4]);
let stringArray2 = getArray2(['java', 'css', 'html']);
//or
let numArray3 = getArray2<number>([1,2,3,4]);

// numArray2.push('Helllo');  // gives error! good, it should -> this makes code more robust
// TRY TO NEVER USE "ANY"



/*_________________________________the UNKNOWN and NEVER types_____________________________________*/

// we can have a variable of which we are not sure about the type yet:
let userInput: unknown;
userInput = 5;
userInput = 'Hello';

let userName: string;
// userName = userInput;                -> not allowed, cant assign type 'uknown' to string
if(typeof userInput === 'string'){
    userName = userInput;               // -> you have to check the type, and then its allowed
}

/* unkown vs any = unknown is more restrictive, any just lets you do anything
 in short choose unknown over any when possible*/


// ________________________________________NEVER Type:  For Functions!
// you should use it for functions that really NEVER return anything, and is more clear in the code, ex: an error throwing function:
function throwError(message: string, code: number):never {
    throw {message: message, code: code};
}

throwError('An error has occured :)', 500);

