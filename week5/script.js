// number variable 0 - infinity dont use quotes
let a = 100;
let b = parseInt("20");
console.log(a, b);
let c = a + b;
console.log(c);
let grade = 80;
if (grade > 70) {
  console.log("Yay, you got HD");
} else {
  console.log("Sorry you just passed the course");
}

let weather = "sunny";
if (weather === "sunny") {
  console.log("what a nice pleasant sunny weather");
} else {
  console.log("Sorry no sun today");
}
// + addition as well as joining
// - subtract
// * multiplication
// / devision

// string variable
const myName = "Vanessa Fan";
console.log(myName);
const myCity = "Melbourne";
const msg = `
<h1>I live in ${myCity}</h1>
<p>I love this city</p>
`;
console.log(msg);

// boolen variable TRUE FALSE
let isThisSunday = false;
let isItAfternoon = true;

// objects
const myStudentRecord = {
  name: "Jenny",
  id: 1234,
  course: "0ART013",
  isLocal: false,
};
console.log(myStudentRecord);
console.log(myStudentRecord.course);

// arrays
// let sName1 = "Rohit";
// let sName2 = "Jimmy";
// let sName3 = "Ivy";

let sNames = ["Rohit", "Jimmy", "Ivy"];
console.log(sNames[0]);

let numbers = [2, 4, 6, 8, 10];
console.log(numbers[3]);
