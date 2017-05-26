var Q = require('q')

var Person = function() {}
Person.prototype.Say = function () {
    console.log('Pserson say')
}
Person.prototype.Salary = 50000;
var Programmer = function () {}
Programmer.prototype = new Person()
Programmer.prototype.WriteCode = function () {
    console.log('Programmer wirte code')
}

// Programmer.prototype.Salary = 500;

var p = new Programmer()
p.Say()
p.WriteCode()
Person.prototype.Salary = 500;
console.log(p.Salary)