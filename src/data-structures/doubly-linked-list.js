export class DoublyLinkedListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/**
 * @class DoublyLinkedList
 * @param {T[]} [values]
 */
export class DoublyLinkedList {
  /**
   * Initializes the list with the given values if passed in.
   * Time Complexity: O(values.length)
   */
  constructor(values) {
    this.head = new DoublyLinkedListNode(null);
    this.tail = new DoublyLinkedListNode(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
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
    const newNode = new DoublyLinkedListNode(val);
    const nextNode = this.head.next;
    this.head.next = newNode;
    newNode.prev = this.head;
    newNode.next = nextNode;
    nextNode.prev = newNode;
    this.size++;
  }
  /**
   * Creates a new node with the given value and inserts at the tail.
   * Time Complexity: O(1)
   */
  addLast(val) {
    const newNode = new DoublyLinkedListNode(val);
    const prevNode = this.tail.prev;
    this.tail.prev = newNode;
    newNode.prev = prevNode;
    newNode.next = this.tail;
    prevNode.next = newNode;
    this.size++;
  }
  /**
   * Creates a new node with the given value and inserts at the given index.
   * All nodes to the right of and at the given index will be shifted right by one position.
   * If the given index is the length of the array, the new node will be appended at the end of the list.
   * Time Complexity: O(min(index, n - index))
   */
  addAt(index, val) {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    const newNode = new DoublyLinkedListNode(val);
    const nodeBeforeInsertion = this._getNodeAt(index - 1);
    const nextNode = nodeBeforeInsertion.next;
    nodeBeforeInsertion.next = newNode;
    newNode.prev = nodeBeforeInsertion;
    newNode.next = nextNode;
    nextNode.prev = newNode;
    this.size++;
  }
  /**
   * Appends new nodes with the given values at the tail of the list.
   * Time Complexity: O(values.length)
   */
  addAll(values) {
    for (let value of values) {
      this.addLast(value);
    }
  }
  /**
   * Removes the head and returns the removed value.
   * Time Complexity: O(1)
   * @returns {T | null}
   */
  removeHead() {
    if (this.size === 0) {
      return null;
    }
    const head = this.head.next;
    this.removeNode(head);
    return head.val;
  }
  /**
   * Removes the tail and returns the removed value.
   * Time Complexity: O(1)
   * @returns {T | null}
   */
  removeTail() {
    if (this.size === 0) {
      return null;
    }
    const tail = this.tail.prev;
    this.removeNode(tail);
    return tail.val;
  }
  /**
   * Removes the node at the given index and returns the removed value.
   * Time Complexity: O(min(index, n - index))
   * @params {number} index
   * @returns {T | null}
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    const nodeBeforeRemoval = this._getNodeAt(index - 1);
    const removedNode = nodeBeforeRemoval.next;
    const nodeAfterRemoval = removedNode.next;
    removedNode.prev = null;
    removedNode.next = null;
    nodeBeforeRemoval.next = nodeAfterRemoval;
    nodeAfterRemoval.prev = nodeBeforeRemoval;
    this.size--;
    return removedNode.val;
  }
  /**
   * Removes the given node.
   * Time Complexity: O(1)
   */
  removeNode(node) {
    if (!node.prev || !node.next) {
      throw new Error(
        'Cannot remove the dummy head or tail of the linked list'
      );
    }
    let prev = node.prev;
    let next = node.next;
    node.prev = null;
    node.next = null;
    prev.next = next;
    next.prev = prev;
    this.size--;
  }
  /**
   * Returns the value of the first node.
   * Returns null if the list is empty.
   * Time Complexity: O(1)
   * @returns {T | null}
   */
  getHead() {
    if (this.size === 0) {
      return null;
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
    if (this.size === 0) {
      return null;
    }
    return this.tail.prev.val;
  }
  /**
   * Returns the value of the node at the given index.
   * Returns null if there is no node at the given index.
   * Time Complexity: O(min(index, n - index))
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
    while (node !== this.tail) {
      values.push(node.val);
      node = node.next;
    }
    return values;
  }
  /**
   * Returns a new linked list with the same values and properties.
   * Time Complexity: O(n)
   * @returns {DoublyLinkedList}
   */
  clone() {
    const clonedList = new DoublyLinkedList();
    let node = this.head.next;
    while (node !== this.tail) {
      clonedList.addLast(node.val);
      node = node.next;
    }
    return clonedList;
  }
  /**
   * Returns the node at the given index.
   * If the index is closer to the tail, traverses from right to left for less steps.
   * Time Complexity: O(min(index, n - index))
   * @returns {DoublyLinkedListNode | null}
   */
  _getNodeAt(index) {
    if (index < -1 || index >= this.size + 1) {
      return null;
    }

    if (index + 1 <= this.size - index) {
      let node = this.head;
      let nodeIndex = -1;
      while (node && nodeIndex < index) {
        node = node.next;
        nodeIndex++;
      }
      return nodeIndex === index ? node : null;
    } else {
      let node = this.tail;
      let nodeIndex = this.size;
      while (node && nodeIndex > index) {
        node = node.prev;
        nodeIndex--;
      }
      return nodeIndex === index ? node : null;
    }
  }
}
