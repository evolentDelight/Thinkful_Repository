const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

function hasURL(req, res, next) {
  if (req.body.data.href) {
    return next();
  }
  next({ status: 404, message: `href` });
}

function urlIdExists(req, res, next) {
  const { urlId } = req.params;

  const foundURL = urls.find((url) => url.id === Number(urlId));

  if (foundURL) {
    res.locals.url = foundURL;
    return next();
  }
  next({
    status: 404,
    message: `URL id not found: ${urlId}`,
  });
}

let lastURLid = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);
let lastUseid = uses.reduce((maxId, use) => Math.max(maxId, use.id), 0);

function list(req, res, next) {
  res.json({ data: urls });
}

function read(req, res, next) {
  //Side effect of read: Create use records of URL and time
  const urlId = res.locals.url.id;

  const foundUse = uses.find((use) => use.urlId === Number(urlId));

  if (foundUse) {
    foundUse.time = Date.now();
  }

  //Create new record of USE of the read URL

  const newUseRecord = { id: ++lastUseid, urlId: urlId, time: Date.now() };

  uses.push(newUseRecord);

  res.json({ data: res.locals.url });
}

function create(req, res, next) {
  const { href } = req.body.data; //URL to create

  const newURL = { href: href, id: ++lastURLid };
  urls.push(newURL);

  res.status(201).json({ data: newURL });
}

function update(req, res, next) {
  let url = res.locals.url;

  url.href = req.body.data.href;

  res.json({ data: url });
}

module.exports = {
  list,
  read: [urlIdExists, read],
  create: [hasURL, create],
  update: [urlIdExists, update],
  urlIdExists,
};
