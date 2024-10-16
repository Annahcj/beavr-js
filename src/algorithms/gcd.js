/**
 * Calculates the greatest common denominator of two numbers
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

exports.gcd = gcd;
