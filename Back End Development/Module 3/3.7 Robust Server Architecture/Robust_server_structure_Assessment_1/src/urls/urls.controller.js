const urls = require("../data/urls-data");

function hasURL(req, res, next) {
  if (req.body.data.href) {
    return next();
  }
  next({ status: 404, message: `href` });
}

let lastURLid = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

function list(req, res, next) {
  res.json({ data: urls });
}

function read(req, res, next) {}

function create(req, res, next) {
  const { href } = req.body.data; //URL to create

  const newURL = { href: href, id: ++lastURLid };
  urls.push(newURL);

  res.status(201).json({ data: newURL });
}

module.exports = { list, read, create: [hasURL, create] };
