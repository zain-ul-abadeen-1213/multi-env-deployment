const app = require("./app");

if (app() !== "ok") {
  console.error("Tests FAILED");
  process.exit(1);
}
console.log("Tests PASSED");
