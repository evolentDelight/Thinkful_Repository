const { welcome, goodbye, tell } = require("../utils/fortune-teller");

const promise = welcome();

promise.then((response) => console.log(response + "\n\n"));

const question = "Will the weather be nice today?";

const tellPromise = tell(question);

tellPromise.then((fortune) => {
  console.log(question);

  console.log(fortune);
});
