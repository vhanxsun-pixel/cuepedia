const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  eleventyConfig.addFilter("localize", function (obj, lang) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj["en"] || obj;
  });

  eleventyConfig.addFilter("formatPrice", function (range) {
    if (!range) return "";
    return `$${range.min} - $${range.max}`;
  });

  eleventyConfig.addFilter("getBrand", function (brandId) {
    const brandFile = path.join(__dirname, "src/_data/brands", `${brandId}.json`);
    if (fs.existsSync(brandFile)) {
      return JSON.parse(fs.readFileSync(brandFile, "utf8"));
    }
    return null;
  });

  eleventyConfig.addFilter("getSeries", function (seriesId) {
    const seriesFile = path.join(__dirname, "src/_data/series", `${seriesId}.json`);
    if (fs.existsSync(seriesFile)) {
      return JSON.parse(fs.readFileSync(seriesFile, "utf8"));
    }
    return null;
  });

  eleventyConfig.addFilter("getSeriesByBrand", function (brandId) {
    const seriesDir = path.join(__dirname, "src/_data/series");
    if (!fs.existsSync(seriesDir)) return [];
    return fs.readdirSync(seriesDir)
      .filter(f => f.startsWith(brandId + "-") && f.endsWith(".json"))
      .map(f => JSON.parse(fs.readFileSync(path.join(seriesDir, f), "utf8")));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
