// assignment 3: simple JavaScript calculator

// store only valid numeric results for summary table
let validResults = [];

// simple table styling
document.write(`
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h2 { margin-top: 30px; }
    table { border-collapse: collapse; width: 100%; max-width: 800px; margin-top: 12px; }
    th, td { border: 1px solid #333; padding: 10px; text-align: center; }
    th { background: #f2f2f2; }
    .error { color: #b00020; font-weight: bold; }
  </style>
`);

document.write("<h2>Calculator Results</h2>");
document.write("<table>");
document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");

while (true) {
  // prompt for x. if cancel, exit loop.
  let xInput = prompt("Enter the first number (x):");
  if (xInput === null) break;

  // prompt for operator. if cancel, exit loop.
  let operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) break;

  // prompt for y. if cancel, exit loop.
  let yInput = prompt("Enter the second number (y):");
  if (yInput === null) break;

  // convert inputs to numbers
  let x = Number(xInput);
  let y = Number(yInput);

  let result;
  let isError = false;

  // validate numbers
  if (isNaN(x) || isNaN(y)) {
    result = "Error: x and y must be numeric.";
    isError = true;
  } else {
    // validate operator and compute
    switch (operator) {
      case "+":
        result = x + y;
        break;
      case "-":
        result = x - y;
        break;
      case "*":
        result = x * y;
        break;
      case "/":
        if (y === 0) {
          result = "Error: division by zero.";
          isError = true;
        } else {
          result = x / y;
        }
        break;
      case "%":
        if (y === 0) {
          result = "Error: modulus by zero.";
          isError = true;
        } else {
          result = x % y;
        }
        break;
      default:
        result = "Error: invalid operator.";
        isError = true;
    }
  }

  // save valid numeric results only (exclude errors)
  if (!isError && typeof result === "number" && !isNaN(result) && isFinite(result)) {
    validResults.push(result);
  }

  // write row
  document.write("<tr>");
  document.write("<td>" + xInput + "</td>");
  document.write("<td>" + operator + "</td>");
  document.write("<td>" + yInput + "</td>");

  if (isError) {
    document.write('<td class="error">' + result + "</td>");
  } else {
    document.write("<td>" + result + "</td>");
  }

  document.write("</tr>");
}

document.write("</table>");

// summary table
document.write("<h2>Summary (Valid Results Only)</h2>");
document.write("<table>");
document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");

if (validResults.length === 0) {
  document.write('<tr><td colspan="4" class="error">No valid results to summarize.</td></tr>');
} else {
  let total = 0;
  let min = validResults[0];
  let max = validResults[0];

  for (let i = 0; i < validResults.length; i++) {
    let val = validResults[i];
    total += val;
    if (val < min) min = val;
    if (val > max) max = val;
  }

  let avg = total / validResults.length;

  document.write("<tr>");
  document.write("<td>" + min + "</td>");
  document.write("<td>" + max + "</td>");
  document.write("<td>" + avg + "</td>");
  document.write("<td>" + total + "</td>");
  document.write("</tr>");
}

document.write("</table>");
