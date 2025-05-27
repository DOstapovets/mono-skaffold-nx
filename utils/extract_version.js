const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide the project name as an argument.");
  process.exit(1);
}
// Read package.json
const packageJsonPath = path.join('apps', projectName, "package.json");
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

if (!version) {
  console.error("No version field found in package.json");
  process.exit(1);
}

// Split version into major, minor, patch
const [major, minor, patch] = version.split(".");

// Print as shell export statements
console.log(`export VERSION=${version}`);
console.log(`export VERSION_MAJOR=${major}`);
console.log(`export VERSION_MINOR=${minor}`);
