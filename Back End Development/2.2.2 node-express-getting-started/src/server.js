const { PORT = 5000 } = process.env; //If no port is found via process.env, then the default PORT = 5000 will be used

const app = require("./app");

const listener = () => console.log(`Listening on Port ${PORT}! Say Hi`);

app.listen(PORT, listener); //(PORT, callback listener)

//PORT=4999 npm start -> application runs on PORT 4999
