const baseURL = "http://localhost:4000";

function handleCode(code, input, selectedLanguage) {
  fetch(`${baseURL}/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",    //later uncomment it and add cors for server url later
    body: JSON.stringify({ code: code, input: input , selectedDesigner : selectedLanguage}),
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
