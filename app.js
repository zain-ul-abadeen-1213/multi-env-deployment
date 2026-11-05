// Sample application used to demonstrate multi-environment deployment.
// The application itself is intentionally tiny — the subject of this
// project is the deployment pipeline, not the app.
function app() {
  return "ok";
}

if (require.main === module) {
  console.log("Sample App — running, status:", app());
}

module.exports = app;
