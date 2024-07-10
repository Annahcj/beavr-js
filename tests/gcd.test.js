import { gcd } from '../src/algorithms/gcd';

describe('gcd', () => {
  it('should return the bigger number if one number is divisible by the other', () => {
    expect(gcd(5, 10)).toBe(5);
    expect(gcd(10, 5)).toBe(5);
  });

  it('should return the correct gcd', () => {
    expect(gcd(2, 5)).toBe(1);
    expect(gcd(5, 2)).toBe(1);
    expect(gcd(8, 12)).toBe(4);
    expect(gcd(12, 8)).toBe(4);
  });

  it('should return the other number if a or b is 0', () => {
    expect(gcd(0, 1)).toBe(1);
    expect(gcd(1, 0)).toBe(1);
    expect(gcd(0, 8)).toBe(8);
    expect(gcd(8, 0)).toBe(8);
    expect(gcd(0, 0)).toBe(0);
  });
});
