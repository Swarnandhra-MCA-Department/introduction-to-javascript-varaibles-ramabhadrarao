import fs from "node:fs";

const weights = {
  "studentName is a string": 10,
  "age is a number": 10,
  "isEnrolled is a boolean": 10,
  "score is a bigint": 10,
  "id is a symbol": 10,
  "favoriteColors is an array of strings": 10,
  "profile is an object with name & age": 15,
  "nothing is null": 10,
  "notDefined is undefined": 5,
  "PI is a constant number": 10
};

const gradeScale = [
  { min: 90, letter: "S (Superior)", points: 10 },
  { min: 80, letter: "A (Excellent)", points: 9 },
  { min: 70, letter: "B (Very Good)", points: 8 },
  { min: 60, letter: "C (Good)", points: 7 },
  { min: 50, letter: "D (Average)", points: 6 },
  { min: 40, letter: "E (Pass)", points: 5 },
  { min: 0,  letter: "F (Fail)", points: 0 }
];

const data = JSON.parse(fs.readFileSync("results.json", "utf8"));
const results = data.testResults?.[0]?.assertionResults ?? [];

let earned = 0;
let total = 0;

for (const [name, weight] of Object.entries(weights)) {
  total += weight;
  const pass = results.find(r => r.title === name && r.status === "passed");
  if (pass) earned += weight;
}

const percent = Math.round((earned / total) * 100);
const tier = gradeScale.find(g => percent >= g.min);

const summary = [
  `Autograde: ${earned}/${total} (${percent}%)`,
  `Letter: ${tier.letter} | Points: ${tier.points}`,
].join("\n");

console.log(summary);

fs.writeFileSync(process.env.GITHUB_STEP_SUMMARY || "GRADE_SUMMARY.md", "### " + summary.replace(/\n/g, "\n\n"));
