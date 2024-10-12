const SegmentTreeType = {
  Sum: 'sum',
  Max: 'max',
  Min: 'min'
};

/**
 * @class SegmentTree
 * @param {number[]} arr
 * @param {SegmentTreeType} type=SegmentTreeType.sum
 */
class SegmentTree {
  constructor(arr, type = SegmentTreeType.Sum) {
    this.size = arr.length;
    this.type = type;
    this.segTree = Array(arr.length * 2);
    this.build(arr);
  }
  /**
   * Populates the tree with an array of initial values
   * Time Complexity: O(n log(n))
   * @param {number[]} arr
   */
  build(arr) {
    const n = this.size;
    for (let i = n; i < n * 2; i++) {
      this.segTree[i] = arr[i - n]; // populate leaf values
    }
    for (let i = n - 1; i > 0; i--) {
      if (this.type === SegmentTreeType.Sum) {
        this.segTree[i] = this.segTree[i * 2] + this.segTree[i * 2 + 1];
      } else if (this.type === SegmentTreeType.Max) {
        this.segTree[i] = Math.max(this.segTree[i * 2], this.segTree[i * 2 + 1]);
      } else {
        this.segTree[i] = Math.min(this.segTree[i * 2], this.segTree[i * 2 + 1]);
      }
    }
  }
  /**
   * Updates the value at the given index, starting from the leaf node and populating throughout the tree.
   * Time Complexity: O(log(n))
   * @param {number} index
   * @param {number} val
   */
  update(index, val) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let idx = index + this.size;
    this.segTree[idx] = val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      if (this.type === SegmentTreeType.Sum) {
        this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      } else if (this.type === SegmentTreeType.Max) {
        this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      } else {
        this.segTree[idx] = Math.min(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      }
      idx = Math.floor(idx / 2);
    }
  }
  /**
   * Returns the query result based on the tree type (sum, max, or min).
   * Time Complexity: O(log(n))
   * @param {number} left
   * @param {number} right
   * @returns number
   */
  queryRange(left, right) {
    left = Math.max(0, left);
    left = Math.min(this.size - 1, left);
    right = Math.max(0, right);
    right = Math.min(this.size - 1, right);

    let result = this.type === SegmentTreeType.Min ? Infinity : this.type === SegmentTreeType.Max ? -Infinity : 0;
    let left_idx = left + this.size, right_idx = right + this.size;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) {
        if (this.type === SegmentTreeType.Sum) {
          result += this.segTree[left_idx++];
        } else if (this.type === SegmentTreeType.Max) {
          result = Math.max(result, this.segTree[left_idx++]);
        } else {
          result = Math.min(result, this.segTree[left_idx++]);
        }
      }
      if (right_idx % 2 === 0) {
        if (this.type === SegmentTreeType.Sum) {
          result += this.segTree[right_idx--];
        } else if (this.type === SegmentTreeType.Max) {
          result = Math.max(result, this.segTree[right_idx--]);
        } else {
          result = Math.min(result, this.segTree[right_idx--]);
        }
      }
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return result;
  }
}

exports.SegmentTree = SegmentTree;
exports.SegmentTreeType = SegmentTreeType;