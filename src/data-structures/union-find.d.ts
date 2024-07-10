export class UnionFind {
  constructor(size: number);
  find(x: number): number;
  union(x: number, y: number): number;
  isConnected(x: number, y: number): boolean;
}
