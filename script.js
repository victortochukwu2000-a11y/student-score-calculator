// Get every row in the table body
const rows = document.querySelectorAll("#scoreTable tbody tr");

// Convert an input's value to a number, keep it between 0 and max
function readScore(input, max) {
  let score = Number(input.value);

  if (isNaN(score) || score < 0) {
    score = 0;
  } else if (score > max) {
    score = max;
  }

  return score;
}

// Work out the grade from the total
function getGrade(total) {
  if (total >= 70) {
    return "A";
  } else if (total >= 60) {
    return "B";
  } else if (total >= 50) {
    return "C";
  } else if (total >= 45) {
    return "D";
  } else if (total >= 40) {
    return "E";
  } else {
    return "F";
  }
}

// Recalculate Total and Grade for one row
function updateRow(row) {
  const caInputs = row.querySelectorAll(".ca");
  const examInput = row.querySelector(".exam");

  let total = 0;

  caInputs.forEach(function (input) {
    total += readScore(input, 10);
  });

  total += readScore(examInput, 70);

  const grade = getGrade(total);

  // DOM manipulation: update the Total and Grade cells
  row.querySelector(".total").textContent = total;

  const gradeCell = row.querySelector(".grade");
  gradeCell.textContent = grade;
  gradeCell.className = "grade grade-" + grade;
}

// Listen for typing in every score input
rows.forEach(function (row) {
  const inputs = row.querySelectorAll(".score");

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      updateRow(row);
    });
  });

  // Set the starting Total and Grade
  updateRow(row);
});
