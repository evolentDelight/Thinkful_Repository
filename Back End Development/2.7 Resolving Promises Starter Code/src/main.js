const { welcome, goodbye, tell } = require("../utils/fortune-teller");

const promise = welcome();

const question = "Will the weather be nice today?";

promise
  .then((response) => console.log(response + "\n\n" + question)) // Logs the result of welcome()

  .then(tell(question).then(console.log).catch(console.error))

  .catch(console.error)

  .then(goodbye) // Returns promise from goodbye()

  .then(console.log) // Logs the result from goodbye()

  .catch(console.error); // Logs error only from goodbye()

// promise.then((response) => console.log(response + "\n\n"));

// const tellPromise = tell(question);

// tellPromise
//   .then((fortune) => {
//     console.log(question);

//     console.log(fortune);
//   })
//   .catch(console.error);
