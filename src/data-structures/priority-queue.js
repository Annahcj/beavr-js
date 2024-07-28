/**
 * @class PriorityQueue
 */
export class PriorityQueue {
  /**
   * Builds a valid heap if initial values are passed in.
   * @param {(a: any, b: any) => number} [comparator=((a, b) => a - b)] 
   * @param {any[]} values
   * Time Complexity: O(values.length)
   */
  constructor(comparator = ((a, b) => a - b), values) {
    this.values = values ? [...values] : [];
    this.comparator = comparator;
    this.size = values?.length ?? 0;

    if (values) {
      for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) {
        this._heapifyDown(i);
      }
    }
  }
  /**
   * Adds the given value to the heap and heapifies up to ensure the heap is still valid.
   * Time Complexity: O(log(n))
   */
  add(val) {
    this.size++;
    this.values.push(val);
    this._heapifyUp(this.values.length - 1);
  }
  /**
   * Removes the element at the top of the heap.
   * Time Complexity: O(log(n))
   */
  remove() {
    if (this.size === 0) {
      return null;
    }
    this.size--;
    if (this.size === 0) {
      return this.values.pop();
    }
    const removedValue = this.values[0];
    this.values[0] = this.values.pop();
    this._heapifyDown(0);
    return removedValue;
  }
  /**
   * Returns the value at the top of the heap.
   * Time Complexity: O(1)
   */
  top() {
    if (this.size === 0) {
      return null;
    }
    return this.values[0];
  }
  /**
   * Returns true if the heap is empty, otherwise false.
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.size === 0;
  }
  /**
   * Starting from the given index, bubbles up, or swaps parent and child elements until the comparator function returns > 0.
   * @param {number} startIndex 
   * Time Complexity: O(log(n))
   */
  _heapifyUp(startIndex) {
    let index = startIndex;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this._isOrderCorrect(parentIndex, index)) {
        break;
      }
      this._swap(parentIndex, index);
      index = parentIndex;
    }
  }
  /**
   * Starting from the given index, bubbles down, or swaps parent and child elements until the comparator function returns > 0 for both children.
   * @param {number} startIndex 
   * Time Complexity: O(log(n))
   */
  _heapifyDown(startIndex) {
    let index = startIndex;
    const n = this.values.length;
    while (index * 2 + 1 < n) {
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;
      const leftShouldSwap = leftChildIndex < n && !this._isOrderCorrect(index, leftChildIndex);
      const rightShouldSwap = rightChildIndex < n && !this._isOrderCorrect(index, rightChildIndex);
      if (!leftShouldSwap && !rightShouldSwap) {
        break;
      }

      if (leftShouldSwap && rightShouldSwap) {
        const swapLeftOverRight = this._isOrderCorrect(leftChildIndex, rightChildIndex);
        if (swapLeftOverRight) {
          this._swap(index, leftChildIndex);
          index = leftChildIndex;
        } else {
          this._swap(index, rightChildIndex);
          index = rightChildIndex;
        }
      } else if (leftShouldSwap) {
        this._swap(index, leftChildIndex);
        index = leftChildIndex;
      } else {
        this._swap(index, rightChildIndex);
        index = rightChildIndex;
      }
    }
  }
  /**
   * Helper function to swap two elements in the heap.
   * Time Complexity: O(1)
   */
  _swap(index1, index2) {
    [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
  }
  /**
   * Helper function to verify if index1 and index2 are in the wrong order.
   * Time Complexity: O(1)
   */
  _isOrderCorrect(index1, index2) {
    return this.comparator(this.values[index1], this.values[index2]) <= 0;
  }
}