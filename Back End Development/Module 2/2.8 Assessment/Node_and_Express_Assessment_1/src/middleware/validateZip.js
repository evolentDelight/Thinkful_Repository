function validateZip(req, res, next) {
  const zip = req.params.zip;
  if (!isNaN(zip) && zip.length == 5) {
    next();
  } else {
    next(`Zip (${zip}) is invalid!`);
  }
}

module.exports = validateZip;
