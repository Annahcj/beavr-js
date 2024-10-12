const { gcd } = require('./gcd');

/**
 * Calculates the least common multiple of two numbers
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
const lcm = (a, b) => {
  if (a === 0 && b === 0) return 0;
  return (a / gcd(a, b)) * b;
};

exports.lcm = lcm;
