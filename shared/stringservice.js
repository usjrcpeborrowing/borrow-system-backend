const toProperCase = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
};

module.exports = {
  toProperCase,
};
