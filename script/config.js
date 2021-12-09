const path = require("path");
const CWD = process.cwd();
const DIST_DIR = path.resolve(CWD, "dist");
const ES_DIR = path.resolve(CWD, DIST_DIR, "es");
const SRC_DIR = path.resolve(CWD, "src");
module.exports = {
  CWD,
  DIST_DIR,
  ES_DIR,
  SRC_DIR,
};
