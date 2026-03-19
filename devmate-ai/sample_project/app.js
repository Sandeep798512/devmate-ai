const { multiply } = require("./utils");

function add(a, b) {
  return a + b;
}

// Intentional bug
console.log(add(2, "3")); 

console.log(multiply(2, 3));