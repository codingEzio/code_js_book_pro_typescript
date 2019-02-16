/* ---------- Valid in JS, but not supported in TS ---------- */

const radius = 4;
const area = Math.PI * radius * radius

with (Math) {
    area2 = PI * radius * radius
}

/* ---------- Type safety checking ---------- */

let my_degree = 10;
my_degree = "Hmm";

/* ---------- Scope ---------- */

let globalScope = 1;
{
    let blockScope = 2;
    globalScope = 100;
    nestedBlockScope = 300;

    {
        let nestedBlockScope = 3;
        globalScope = 1000;
        blockScope = 2000;
    }
}

// This'll produce much reasonable values
//  If in plain JavaScript,
//  the output would be '300, 1000, err'
console.log(nestedBlockScope)  // beyond its original scope
console.log(globalScope)  // this one is reasonable though
console.log(blockScope) // still reasonable

let firstName = "Scarlet";
{
    let firstName = "Witch";
    console.log(`firstName: ${firstName}`);
}
console.log(`firstName: ${firstName}`);

/* ---------- Constants ---------- */

const myName = "Lily";
const aSequence = [1, 3, 5];

aSequence.push(7, 9, 11);  // cannot be re-assign, but mutable!

console.log(aSequence);

/* ---------- Type annotations ---------- */

let four: number = 4;  // do use this one
let FOUR: Number = 4;

const theNames: string[] = ['Alex', 'John', 'Wiley'];

// param & return-val 
let sayHello: (name: string) => string;

sayHello = function (name: string) {
    return 'Hello' + name;
}

// object type annotation
let person: { name: string; age: number };

person = {
    name: 'Mark',
    age: 300
}

/* ---------- Type annotations :: Advanced ---------- */

// There're still plenty of other types though
let in_undf: undefined;
let in_null: null;
let in_func: (name: string) => void;  // not returning anything
let in_eror: (msg: string) => never;  // e.g. throw new Error(msg)

/* ---------- When <Type annotations> gets too complex ---------- */

// Option one :: Interface

interface NormalPerson {
    NAME: string;
    AGE: number;
}

const sherlock: NormalPerson = {
    NAME: 'Bendict',
    AGE: 120,
}

console.log(sherlock);

// Option two :: Type Alias

type NormalPersonType = {
    NAME: string;
    AGE: number;
}

const waston: NormalPersonType = {
    NAME: 'Martin',
    AGE: 65
}

/* ---------- Enumeration ---------- */

enum VehicleTypes {
    Bike,
    Bus,
    Car,
    Lorry,
    Van
}

// Kinda like 'Index | Array[Index]'
const theType = VehicleTypes.Bike;
const theTypeName = VehicleTypes[theType];

console.log(theType, theTypeName);

// All (enum) declarations with the same name 
//  will contribute toward a single one (all combined)
enum BoxSize {
    Small,
    Medium,
}

enum BoxSize {
    // If you're going to define multiple enums,
    //  for the 1st item, you need (& must) to indicate its value.
    Large = 3,
    XLarge,
    XXLarge
}

