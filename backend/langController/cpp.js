const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

// TODO: UPDATE THE RUNNING COMMAND
// TODO: REMOVE THE DEL FROM THE DELETION COMMANDS AND REPLACE WITH RM

const cpp = (fileName, input, res) => {
  console.log("this cpp file runs");
  fs.writeFile(`${fileName}.txt`, input, (err) => {
    if (err) {
      console.log(err);
      res.json({ err: err });
    }
    exec(`g++ ${fileName}.cpp -o a && a<${fileName}.txt`)
      .then((resp) => {
        console.log(resp);
        res.status(201).json(resp);
      })
      .then(() => {
        exec(`del ${fileName}.cpp && del ${fileName}.txt && del a.exe`).then(
          () => {
            console.log("execution files removed");
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.json({ stderr: err.stderr });
        exec(`del ${fileName}.cpp && del ${fileName}.txt && del a`).then(() => {
          console.log("execution files removed");
        });
      });
  });
};

module.exports = cpp;
