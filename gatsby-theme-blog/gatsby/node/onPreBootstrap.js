"use strict";

const fs = require("fs-extra");

module.exports = ({ reporter }, options) => {
  const authorsPath = options.authorsPath || "content/authors";
  const contentPath = options.contentPath || "content/posts";

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }

  if (!fs.existsSync(authorsPath)) {
    reporter.info(`creating the ${authorsPath} directory`);
    fs.mkdirSync(authorsPath);
  }
};
