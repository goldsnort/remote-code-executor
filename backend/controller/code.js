const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cpp = require("../langController/cpp");
const python = require("../langController/python");
const java = require("../langController/java");
const {
  validateCpp,
  validatePython,
  validateJava,
  validate,
} = require("../langController/validate");

exports.code = (req, res) => {
  console.log("there was a request made at /code route");
  const code = req.body.code;
  const lang = req.body.lang;
  const input = req.body.input;

  switch (lang) {
    case "cpp":
      {
        console.log("there was a cpp request");
        let fileName = uuidv4();
        if (validate(code, validateCpp)) {
          fs.writeFile(`${fileName}.${lang}`, code, (err) => {
            if (err) {
              console.log(err);
              res.json({ err: err });
            } else {
              cpp(fileName, input, res);
            }
          });
        } else {
          res.json({ err: "This file contains malicious code" });
        }
      }
      break;

    case "python":
      {
        let fileName = uuidv4();
        if (validate(code, validatePython)) {
          fs.writeFile(`${fileName}.py`, code, (err) => {
            if (err) {
              console.log(err);
              res.json({ err: err });
            } else {
              python(fileName, input, res);
            }
          });
        } else {
          res.json({ err: "This file contains malicious code" });
        }
      }
      break;

    case "java":
      {
        let fileName = uuidv4();
        if (validate(code, validateJava)) {
          fs.writeFile(`${fileName}.java`, code, (err) => {
            if (err) {
              console.log(err);
              res.json({ err: err.stdout });
            } else {
              java(fileName, input, res);
            }
          });
        } else {
          res.json({ err: "This file contains malicious code" });
        }
      }
      break;

    default:
      break;
  }
};
