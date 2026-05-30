const fs = require("fs");
const path = require("path");

module.exports = function () {
  const seriesDir = path.join(__dirname, "series");
  const result = {};
  if (fs.existsSync(seriesDir)) {
    fs.readdirSync(seriesDir)
      .filter(f => f.endsWith(".json"))
      .forEach(f => {
        const data = JSON.parse(fs.readFileSync(path.join(seriesDir, f), "utf8"));
        result[data.id] = data;
      });
  }
  return result;
};
