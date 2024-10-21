let data;
let genderFilter = "Male";

let ageMin = Infinity;
let ageMax = -Infinity;

let sleepDurationMin = Infinity;
let sleepDurationMax = -Infinity;

let qualityOfSleepMin = Infinity;
let qualityOfSleepMax = -Infinity;

let stressLevelMin = Infinity;
let stressLevelMax = -Infinity;

let genderButton;

function preload() {
  data = loadTable("./Sleep_health_and_lifestyle_dataset.csv", "csv", "header");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  genderButton = createButton(`${genderFilter} Showed`);
  genderButton.position(windowWidth - 120, 60);
  genderButton.mousePressed(toggleGender);

  for (let i = 0; i < data.getRowCount(); i++) {
    let age = data.getNum(i, "Age");
    let sleepDuration = data.getNum(i, "Sleep Duration");
    let qualityOfSleep = data.getNum(i, "Quality of Sleep");
    let stressLevel = data.getNum(i, "Stress Level");

    ageMin = min(ageMin, age);
    ageMax = max(ageMax, age);

    sleepDurationMin = min(sleepDurationMin, sleepDuration);
    sleepDurationMax = max(sleepDurationMax, sleepDuration);

    qualityOfSleepMin = min(qualityOfSleepMin, qualityOfSleep);
    qualityOfSleepMax = max(qualityOfSleepMax, qualityOfSleep);

    stressLevelMin = min(stressLevelMin, stressLevel);
    stressLevelMax = max(stressLevelMax, stressLevel);
  }

  // let numberOfDataPoints = data.getRowCount();
  // console.log(`Number of data points: ${numberOfDataPoints}`);
}

function draw() {
  background(255);

  for (let i = 0; i < data.getRowCount(); i++) {
    let gender = data.getString(i, "Gender");
    let personId = data.getNum(i, "Person ID");

    let age = data.getNum(i, "Age");
    let sleepDuration = data.getNum(i, "Sleep Duration");
    let qualityOfSleep = data.getNum(i, "Quality of Sleep");
    let stressLevel = data.getNum(i, "Stress Level");

    let x = map(personId, 0, data.getRowCount(), 0, width);
    let h = map(sleepDuration, sleepDurationMin, sleepDurationMax, 0, 600);
    let w = map(qualityOfSleep, qualityOfSleepMin, qualityOfSleepMax, 0, 7);
    let a = map(stressLevel, stressLevelMin, stressLevelMax, 0, 255);

    // if (gender !== genderFilter) {
    //   a = a * 0.3; // Reduce alpha 
    // }

    if (gender === "Male") {
      fill(30, 30, 255, a);
    } else if (gender === "Female") {
      fill(255, 30, 30, a);
    }

    rect(x, height - h, w, h);

    // Draw small square and age for the selected gender
    if (gender === genderFilter) {
      let squareSize = 10;
      let squareY = height - h - 20; // Position above the rect

      if (gender === "Male") {
        fill(30, 30, 255);
      } else if (gender === "Female") {
        fill(255, 30, 30);
      }

      rect(x, squareY, squareSize, squareSize);
      fill(0);
      textSize(6);
      textAlign(CENTER);
      text(age, x + squareSize / 2+0.5, squareY - 5);
    }
  }

  noLoop();
}

function toggleGender() {
  genderFilter = genderFilter === "Male" ? "Female" : "Male";
  genderButton.html(`${genderFilter} Showed`);
  redraw();
}
