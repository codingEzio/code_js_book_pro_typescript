/* ---------- Valid in JS, but not supported in TS ---------- */
var radius = 4;
var area = Math.PI * radius * radius;
with (Math) {
    area2 = PI * radius * radius;
}
/* ---------- Type safety checking ---------- */
var my_degree = 10;
my_degree = "Hmm";
/* ---------- Scope ---------- */
var globalScope = 1;
{
    var blockScope = 2;
    globalScope = 100;
    nestedBlockScope = 300;
    {
        var nestedBlockScope = 3;
        globalScope = 1000;
        blockScope = 2000;
    }
}
// This'll produce much reasonable values
//  If in plain JavaScript,
//  the output would be '300, 1000, err'
console.log(nestedBlockScope); // beyond its original scope
console.log(globalScope); // this one is reasonable though
console.log(blockScope); // still reasonable
var firstName = "Scarlet";
{
    var firstName_1 = "Witch";
    console.log("firstName: " + firstName_1);
}
console.log("firstName: " + firstName);
/* ---------- Constants ---------- */
var myName = "Lily";
var aSequence = [1, 3, 5];
aSequence.push(7, 9, 11); // cannot be re-assign, but mutable!
console.log(aSequence);
/* ---------- Type annotations ---------- */
var four = 4; // do use this one
var FOUR = 4;
var theNames = ['Alex', 'John', 'Wiley'];
// param & return-val 
var sayHello;
sayHello = function (name) {
    return 'Hello' + name;
};
// object type annotation
var person;
person = {
    name: 'Mark',
    age: 300
};
/* ---------- Type annotations :: Advanced ---------- */
// There're still plenty of other types though
var in_undf;
var in_null;
var in_func; // not returning anything
var in_eror; // e.g. throw new Error(msg)
var sherlock = {
    NAME: 'Bendict',
    AGE: 120
};
console.log(sherlock);
var waston = {
    NAME: 'Martin',
    AGE: 65
};
/* ---------- Enumeration ---------- */
var VehicleTypes;
(function (VehicleTypes) {
    VehicleTypes[VehicleTypes["Bike"] = 0] = "Bike";
    VehicleTypes[VehicleTypes["Bus"] = 1] = "Bus";
    VehicleTypes[VehicleTypes["Car"] = 2] = "Car";
    VehicleTypes[VehicleTypes["Lorry"] = 3] = "Lorry";
    VehicleTypes[VehicleTypes["Van"] = 4] = "Van";
})(VehicleTypes || (VehicleTypes = {}));
// Kinda like 'Index | Array[Index]'
var theType = VehicleTypes.Bike;
var theTypeName = VehicleTypes[theType];
console.log(theType, theTypeName);
var BoxSize;
(function (BoxSize) {
    BoxSize[BoxSize["Small"] = 0] = "Small";
    BoxSize[BoxSize["Medium"] = 1] = "Medium";
})(BoxSize || (BoxSize = {}));
(function (BoxSize) {
    BoxSize[BoxSize["Large"] = 3] = "Large";
    BoxSize[BoxSize["XLarge"] = 4] = "XLarge";
    BoxSize[BoxSize["XXLarge"] = 5] = "XXLarge";
})(BoxSize || (BoxSize = {}));
