const [x, y] = [5, 7];
const z = x + y;
console.log(`Sum of x and y is z=${z}}`);

const [A, B] = ["Hello ", "World!"];
const C = A + B;
console.log(`A concat. with B is C=${C}`);

function SumNPrint(x1, x2) {
  let x3 = x1 + x2;
  console.log(`x3 is \`${x3}\``);
}

SumNPrint(x, y);
SumNPrint(A, B);

if (C.length > z) console.log(C);
else if (z > C.length) console.log(z);
else console.log("good job!");

const L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
const L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(A) {
  for (let i = 0; i < A.length; i++) {
    if (A[i] === "Banana") window.alert(`found the Banana in ${i}`);
  }
}
findTheBanana(L1);
findTheBanana(L2);

function findTheBananaEach(A) {
  for (item in A) {
    if (item === "Banana") window.alert(`We found a bananna in the array`);
  }
}
findTheBananaEach(L1);
findTheBananaEach(L2);

function greetingFunc() {
  const d = new Date();
  const h = d.getHours();

  let greeting;
  if (h < 12) greeting = "Good morning";
  else if (h < 18) greeting = "Good afternoon";
  else if (h < 20) greeting = "Good evening";
  if (20 < h < 24 || h < 5) greeting = "Good night";

  const el = document.getElementById("greeting");
  if (el) el.innerHTML = greeting;
}
greetingFunc();
