const baseURL = "http://localhost:3001";

function handleCode(code, input) {
  fetch(`${baseURL}/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code: code, input: input }),
  })
    .then((res) => {
      if (res.ok === true) {
        console.log("code execution was successful");
      } else {
        console.log("error!!!");
      }
      return res.json();
    })
    .then((d) => {
      console.log("the output is", d);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default handleCode;
