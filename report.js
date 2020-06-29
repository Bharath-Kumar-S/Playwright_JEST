(async () => {
  const path = require("path");
  const fs = require("fs-extra");

  try {
    await fs.copy(
      path.resolve(__dirname, `allure-report/history`),
      path.resolve(__dirname, `allure-results/history`)
    );
  } catch (e) {
    console.log(e);
  }
})();
