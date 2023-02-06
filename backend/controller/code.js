const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cpp = require("../langController/cpp");
const python = require("../langController/python");
const {
  validateCpp,
  validatePython,
  validate,
} = require("../langController/validate");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

exports.code = (req, res) => {
  const code = req.body.code;
  const lang = req.body.lang;
  const input = req.body.input;

  switch (lang) {
    case "cpp":
      {
        let fileName = uuidv4();
        fs.writeFile(`${fileName}.${lang}`, code, (err) => {
          if (err) {
            console.log(err);
            res.json({ err: err });
          } else {
            // TODO: validate the incoming code here
            if (validate(code, validateCpp)) {
              // run the incoming code here
              cpp(fileName, input, res);
            } else {
              res.json({ err: "This file contains malicious code" });
              exec(`rm ${fileName}.cpp`).then(() => {
                console.log("files deleted");
              });
            }
          }
        });
      }
      break;
    case "python":
      {
        let fileName = uuidv4();
        fs.writeFile(`${fileName}.py`, code, (err) => {
          if (err) {
            console.log(err);
            res.json({ err: err });
          } else {
            // TODO: validate the incoming code here
            if (validate(code, validatePython)) {
              // run the incoming code here
              python(fileName, input, res);
            } else {
              res.json({ err: "This file contains malicious code" });
              exec(`rm ${fileName}.py`).then(() => {
                console.log("files deleted");
              });
            }
          }
        });
      }
      break;
      break;

    default:
      break;
  }
};
