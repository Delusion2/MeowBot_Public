/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

// split a text up into tokens where there are spaces
String.prototype.tokenize = function () {
  return this.split(/\s+/);
};

// trim whitespace and replace all new-line characters with escaped \n
String.prototype.oneLine = function () {
  return `${this.replace(/(\r?\n)/g, '\\n')}\n`;
};

// trim whitespace and replace all new-line characters with escaped \n
String.prototype.newLine = function () {
  return this.replace(/(\r?\n)/g, '\\n');
};

// return blank if string value is not a number greater than zero
String.prototype.isZero = function (suffix) {
  return (this > 0 ? `${this}${suffix} ` : '');
};

// clear all non-alphanumeric characters (punctuation) and make it lowercase - fall back to removing only alphanumeric
String.prototype.clean = function () {
  const punctuationRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
  return this.replace(punctuationRegex, '').toLowerCase() || this.replace(/[A-z 0-9]/g, '');
};

// return comma formatted number
String.prototype.prettyCount = function () {
  return this.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

// return a random element from an array
Array.prototype.choice = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// return N amount of last values from an array
Array.prototype.getNLastWords = function (n = 2) {
  return this.slice(this.length - n, this.length).join(' ');
};

// return comma formatted length of array
Array.prototype.prettyCount = function () {
  return this.length.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
