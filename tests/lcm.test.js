import { lcm } from '../src/algorithms/lcm';

describe('lcm', () => {
  it('should return the bigger number if one number is divisible by the other', () => {
    expect(lcm(5, 10)).toBe(10);
    expect(lcm(10, 5)).toBe(10);
  });

  it('should return the correct lcm', () => {
    expect(lcm(2, 5)).toBe(10);
    expect(lcm(5, 2)).toBe(10);
    expect(lcm(8, 12)).toBe(24);
    expect(lcm(12, 8)).toBe(24);
  });

  it('should return 0 if a or b is 0', () => {
    expect(lcm(0, 1)).toBe(0);
    expect(lcm(1, 0)).toBe(0);
    expect(lcm(0, 8)).toBe(0);
    expect(lcm(8, 0)).toBe(0);
    expect(lcm(0, 0)).toBe(0);
  });
});
