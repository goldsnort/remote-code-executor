const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cpp = require("../langController/cpp");

exports.code = (req, res) => {
  console.log(req.body);
  const code = req.body.code;
  const lang = req.body.lang;
  const input = req.body.input;

  switch (lang) {
    case "cpp":
      const fileName = uuidv4();
      fs.writeFile(`${fileName}.${lang}`, code, (err) => {
        if (err) {
          console.log(err);
          res.json({ err: err });
        } else {
          // TODO: validate the incoming code here
          // run the incoming code here
          cpp(fileName, input, res);
        }
      });
      break;

    default:
      break;
  }
};
