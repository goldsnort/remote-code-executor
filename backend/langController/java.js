const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

const java = (fileName, input, res) => {
  console.log("this java file runs");
  fs.writeFile(`${fileName}.txt`, input, (err) => {
    if (err) {
      console.log(err);
      res.json({ err: err.stdout });
    }
    exec(`docker run -d -it java:v1 sh`).then((response) => {
      const container_id = response.stdout.substring(0, 12);
      console.log(container_id);
      exec(
        `docker cp ${fileName}.java ${container_id}:/usr/java/test.java && docker cp ${fileName}.txt ${container_id}:/usr/java`
      )
        .then(() => {
          exec(
            `docker exec -t ${container_id} sh -c "javac test.java && java test<${fileName}.txt"`
          )
            .then((resp) => {
              console.log(resp);
              res.status(201).json(resp);
              exec(
                `docker rm -f ${container_id} && rm ${fileName}.java && rm ${fileName}.txt`
              ).then(() => {
                console.log("container and files removed");
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({ stderr: err.stdout });
              exec(
                `docker rm -f ${container_id} && rm ${fileName}.java && rm ${fileName}.txt`
              ).then(() => {
                console.log("container and files removed");
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.json({ stderr: err.stderr });
          exec(
            `docker rm -f ${container_id} && rm ${fileName}.java && rm ${fileName}.txt`
          ).then(() => {
            console.log("container and files removed");
          });
        });
    });
  });
};

module.exports = java;
