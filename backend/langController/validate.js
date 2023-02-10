let validatePython = [
  "import os",
  "import subprocess",
  "from os import",
  "from subprocess import",
];
let validateCpp = ["popen", "fork", "system(", "unistd.h"];
let validateC = ["fork", "system("];
let validateJava = [
  "Process",
  "getRuntime()",
  "exec(",
  "ProcessBuilder",
  "start()",
];

const validate = (code, blacklist) => {
  let result = true;
  blacklist.forEach((ele) => {
    if (code.includes(ele)) {
      result = false;
      console.log("this code contains malicious content");
      return;
    }
  });
  return result;
};

module.exports = {
  validate,
  validatePython,
  validateCpp,
  validateC,
  validateJava,
};
