const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

const py = (fileName, input, res) => {
  console.log("this py file runs");
  fs.writeFile(`${fileName}.txt`, input, (err) => {
    if (err) {
      console.log(err);
      res.json({ err: err });
    }
    exec(`docker run -d -it py:v1 sh`).then((response) => {
      const container_id = response.stdout.substring(0, 12);
      console.log(container_id);
      exec(
        `docker cp ${fileName}.py ${container_id}:/usr/py && docker cp ${fileName}.txt ${container_id}:/usr/py`
      )
        .then(() => {
          exec(
            `docker exec -t ${container_id} sh -c "python3 ${fileName}.py<${fileName}.txt"`
          )
            .then((resp) => {
              console.log(resp);
              res.status(201).json(resp);
              exec(
                `docker rm -f ${container_id} && rm ${fileName}.py && rm ${fileName}.txt`
              ).then(() => {
                console.log("container and files removed");
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({ stderr: err.stderr });
              exec(
                `docker rm -f ${container_id} && rm ${fileName}.py && rm ${fileName}.txt`
              ).then(() => {
                console.log("container and files removed");
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.json({ stderr: err.stderr });
          exec(
            `docker rm -f ${container_id} && rm ${fileName}.py && rm ${fileName}.txt`
          ).then(() => {
            console.log("container and files removed");
          });
        });
    });
  });
};

module.exports = py;
