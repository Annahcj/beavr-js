import { UnionFind } from '../src/data-structures/union-find';

describe.only('UnionFind', () => {
  describe('constructor', () => {
    it('should throw an error if the size is equal to zero', () => {
      const res = () => new UnionFind(0);
      expect(res).toThrow(new Error('Size must be greater than 0'));
    });

    it('should throw an error if the size is smaller than zero', () => {
      const res = () => new UnionFind(-1);
      expect(res).toThrow(new Error('Size must be greater than 0'));
    });
  });

  describe('find & union', () => {
    it('should return the root of every node to be itself before any connections have been made', () => {
      const uf = new UnionFind(5);
      for (let i = 0; i < 5; i++) {
        expect(uf.find(i)).toBe(i);
      }
    });

    it('should return the correct number of distinct roots and return the same root for connected nodes after connections have been made', () => {
      const uf = new UnionFind(5);
      uf.union(0, 1);
      uf.union(1, 2);
      // (0 -> 1 -> 2), (3), (4) -> there are three distinct roots/groups
      const distinctRoots = new Set();
      for (let i = 0; i < 5; i++) {
        distinctRoots.add(uf.find(i));
      }
      expect(distinctRoots.size).toBe(3);
      expect(uf.find(0)).toBe(uf.find(1));
      expect(uf.find(1)).toBe(uf.find(2));
      expect(uf.size).toBe(3);
    });

    it('should return the one distinct root if all nodes are connected', () => {
      const uf = new UnionFind(7);
      for (let i = 0; i < 6; i++) {
        uf.union(i, i + 1);
      }
      const distinctRoots = new Set();
      for (let i = 0; i < 7; i++) {
        distinctRoots.add(uf.find(i));
      }
      expect(distinctRoots.size).toBe(1);
      expect(uf.size).toBe(1);
    });
  });

  describe('isConnected', () => {
    it('should return true for connected nodes and false for non-connected nodes', () => {
      const uf = new UnionFind(5);
      uf.union(0, 1);
      uf.union(1, 2);
      // (0 -> 1 -> 2), (3), (4)
      expect(uf.isConnected(0, 2)).toBe(true);
      expect(uf.isConnected(0, 1)).toBe(true);
      expect(uf.isConnected(1, 2)).toBe(true);
      expect(uf.isConnected(3, 4)).toBe(false);
      expect(uf.isConnected(0, 3)).toBe(false);
    });
  });
});
