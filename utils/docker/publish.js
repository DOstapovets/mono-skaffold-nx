const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];
const projectPath = path.join('apps', projectName);
const dockerfile = path.join(projectPath, "Dockerfile");
const imageName = `ghcr.io/dostapovets/mono-skaffold-nx-${projectName}`;

if (!projectName) {
  console.error("Please provide the project name as an argument.");
  process.exit(1);
}
// Read package.json
const packageJsonPath = path.join(projectPath, "package.json");
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

if (!version) {
  console.error("No version field found in package.json");
  process.exit(1);
}

// Split version into major, minor, patch
const [major, minor] = version.split(".");

// Print as shell export statements
execSync(
  `docker build -f ${dockerfile} . --tag ${imageName}:latest --target production`,
  { stdio: 'inherit' }
);

execSync(
  `docker image tag ${imageName}:latest ${imageName}:${version}`,
  { stdio: 'inherit' }
);
execSync(
  `docker image tag ${imageName}:latest ${imageName}:${major}`,
  { stdio: 'inherit' }
);
execSync(
  `docker image tag ${imageName}:latest ${imageName}:${major}.${minor}`,
  { stdio: 'inherit' }
);

if (process.env.INPUT_IS_DEFAULT === 'true') {
  execSync(
    `docker push ghcr.io/dostapovets/mono-skaffold-nx-${projectName}:latest`,
    { stdio: 'inherit' }
  );
}
execSync(
  `docker push ghcr.io/dostapovets/mono-skaffold-nx-${projectName}:${version}`,
  { stdio: 'inherit' }
);
execSync(
  `docker push ghcr.io/dostapovets/mono-skaffold-nx-${projectName}:${major}`,
  { stdio: 'inherit' }
);
execSync(
  `docker push ghcr.io/dostapovets/mono-skaffold-nx-${projectName}:${major}.${minor}`,
  { stdio: 'inherit' }
);
console.log(`Docker image ${imageName}:${version} built and pushed successfully.`);
console.log(`Docker image ${imageName}/${major} built and pushed successfully.`);
console.log(`Docker image ${imageName}/${major}:${minor} built and pushed successfully.`);
