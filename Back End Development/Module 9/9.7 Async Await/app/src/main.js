const {
  generateMessage,
  goodbye,
  generateSlogan,
} = require("../utils/slogan-generator");

async function getSlogan(request) {
  try {
    const response = await generateSlogan(request);

    console.log(`Your request was: ${request}`);
    console.log(`Your slogan is: ${response.slogan}`);
  } catch (error) {
    next(error);
  }
}

async function fullSession(request) {
  try {
    console.log(await generateMessage());
    await getSlogan(request);
    console.log(await goodbye());

    // const welcome = await generateMessage();
    // const response = await getSlogan(request);
    // const parting = await goodbye();

    // console.log(await generateMessage());
    // console.log(await getSlogan(request));
    // console.log(await goodbye());
  } catch (error) {
    next(error);
  }
}

module.exports = { getSlogan, fullSession };
