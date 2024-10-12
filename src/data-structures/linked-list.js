class LinkedListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/**
 * @class LinkedList
 * @param {T[]} [values]
 */
class LinkedList {
  /**
   * Initializes the list with the given values if passed in.
   * Time Complexity: O(values.length)
   */
  constructor(values) {
    this.head = new LinkedListNode(null);
    this.tail = this.head;
    this.size = 0;

    if (values) {
      this.addAll(values);
    }
  }
  /**
   * Creates a new node with the given value and inserts at the head.
   * Time Complexity: O(1)
   */
    addFirst(val) {
      const newNode = new LinkedListNode(val);
      const nextNode = this.head.next;
      this.head.next = newNode;
      newNode.next = nextNode;
  
      if (this.tail === this.head) {
        this.tail = newNode;
      }
      this.size++;
    }
  /**
   * Creates a new node with the given value and inserts at the tail.
   * Time Complexity: O(1)
   */
  addLast(val) {
    const newNode = new LinkedListNode(val);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }
  /**
   * Creates a new node with the given value and inserts at the given index. 
   * All nodes to the right of and at the given index will be shifted right by one position.
   * If the given index is the length of the array, the new node will be appended at the end of the list.
   * Time Complexity: O(index)
   */
  addAt(index, val) {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    const newNode = new LinkedListNode(val);
    const nodeBeforeInsertion = this._getNodeAt(index - 1);
    const nextNode = nodeBeforeInsertion.next;
    nodeBeforeInsertion.next = newNode;
    newNode.next = nextNode;
    if (nodeBeforeInsertion === this.tail) {
      this.tail = newNode;
    }
    this.size++;
  }
  /**
   * Appends new nodes with the given values at the tail of the list.
   * Time Complexity: O(values.length)
   */
  addAll(values) {
    let tail = this.tail;
    for (const value of values) {
      const newNode = new LinkedListNode(value);
      tail.next = newNode;
      tail = tail.next;
    }
    this.tail = tail;
    this.size += values.length;
  }
  /**
   * Removes the head and returns the removed value.
   * Time Complexity: O(1)
   * @returns {T | null}
   */
  removeHead() {
    if (!this.head.next) {
      return null;
    }
    return this.removeAt(0);
  }
  /**
   * Removes the tail and returns the removed value.
   * Time Complexity: O(n)
   * @returns {T | null}
   */
  removeTail() {
    if (this.head === this.tail) {
      return null;
    }
    return this.removeAt(this.size - 1);
  }
  /**
   * Removes the node at the given index and returns the removed value.
   * Time Complexity: O(index)
   * @params {number} index
   * @returns {T | null}
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    this.size--;
    const nodeBeforeRemoval = this._getNodeAt(index - 1);
    const removedNode = nodeBeforeRemoval.next;
    nodeBeforeRemoval.next = nodeBeforeRemoval.next.next;
    if (removedNode === this.tail) {
      // reset the tail
      this.tail = nodeBeforeRemoval;
    }
    return removedNode.val;
  }
  /**
   * Returns the value of the first node.
   * Returns null if the list is empty.
   * Time Complexity: O(1)
   * @returns {T | null}
   */
  getHead() {
    if (!this.head.next) {
      return this.head.val;
    }
    return this.head.next.val;
  }
  /**
   * Returns the value of the last node.
   * Returns null if the list is empty.
   * Time Complexity: O(1)
   * @returns {T | null}
   */
  getTail() {
    return this.tail.val;
  }
  /**
   * Returns the value of the node at the given index.
   * Returns null if there is no node at the given index.
   * Time Complexity: O(index)
   * @returns {T | null}
   */
  getAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }

    const node = this._getNodeAt(index);
    return node ? node.val : null;
  }
  /**
   * Time Complexity: O(1)
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }
  /**
   * Returns the values of the nodes in an array.
   * Time Complexity: O(n)
   * @returns {T[]}
   */
  toArray() {
    const values = [];
    let node = this.head.next;
    while (node) {
      values.push(node.val);
      node = node.next;
    }
    return values;
  }
  /**
   * Returns a new linked list with the same values and properties.
   * Time Complexity: O(n)
   * @returns {LinkedList}
   */
  clone() {
    const clonedList = new LinkedList();
    let node = this.head.next;
    while (node) {
      clonedList.addLast(node.val);
      node = node.next;
    }
    return clonedList;
  }
  /**
   * Returns the node at the given index.
   * Time Complexity: O(index)
   * @returns {LinkedListNode | null}
   */
  _getNodeAt(index) {
    if (index < -1 || index >= this.size) {
      return null;
    }
    let node = this.head;
    let nodeIndex = -1;
    while (node && nodeIndex < index) {
      node = node.next;
      nodeIndex++;
    }
    return nodeIndex === index ? node : null;
  }
}

exports.LinkedList = LinkedList;
exports.LinkedListNode = LinkedListNode;