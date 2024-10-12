/**
 * @class UnionFind
 * @param {number} size
 */
class UnionFind {
  constructor(size) {
    if (size <= 0) {
      throw new Error('Size must be greater than 0');
    }

    this.root = Array(size);
    this.rank = Array(size);
    this.size = size;
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }

  /**
   * Finds the root of the node using path compression to optimize performance.
   * Time Complexity: O(⍺(N))
   * @param {number} x
   * @returns {number}
   */
  find(x) {
    if (x < 0 || x >= this.root.length) {
      throw new Error('Node is out of bounds');
    }

    if (this.root[x] === x) return x;
    return (this.root[x] = this.find(this.root[x]));
  }

  /**
   * Connects two nodes using union by rank to optimize performance.
   * Rank is the upper bound of the height of each node.
   * Time Complexity: O(⍺(N))
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.size--;
    return true;
  }

  /**
   * Checks whether two nodes are connected.
   * Time Complexity: O(⍺(N))
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

exports.UnionFind = UnionFind;