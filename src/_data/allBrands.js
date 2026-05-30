const fs = require("fs");
const path = require("path");

module.exports = function () {
  const brandsDir = path.join(__dirname, "brands");
  const result = {};
  if (fs.existsSync(brandsDir)) {
    fs.readdirSync(brandsDir)
      .filter(f => f.endsWith(".json"))
      .forEach(f => {
        const data = JSON.parse(fs.readFileSync(path.join(brandsDir, f), "utf8"));
        result[data.id] = data;
      });
  }
  return result;
};
