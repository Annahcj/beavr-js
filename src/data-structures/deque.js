import { DoublyLinkedList } from './doubly-linked-list';

/**
 * @class Deque
 */
export class Deque {
  constructor() {
    this.list = new DoublyLinkedList();
  }
  /**
   * Adds the given value to the end of the queue.
   * Time Complexity: O(1)
   */
  push(val) {
    this.list.addLast(val);
  }
  /**
   * Adds the given value to the start of the queue.
   * Time Complexity: O(1)
   */
  pushLeft(val) {
    this.list.addFirst(val);
  }
  /**
   * Removes the value to the end of the queue and returns the removed value.
   * Time Complexity: O(1)
   */
  pop() {
    return this.list.removeTail();
  }
  /**
   * Removes the value to the start of the queue and returns the removed value.
   * Time Complexity: O(1)
   */
  popLeft() {
    return this.list.removeHead();
  }
  /**
   * Returns the value at the start of the queue.
   * Time Complexity: O(1)
   */
  front() {
    return this.list.getHead();
  }
  /**
   * Returns the value at the end of the queue.
   * Time Complexity: O(1)
   */
  back() {
    return this.list.getTail();
  }
  /**
   * Returns true if the queue is empty, otherwise returns false.
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.list.isEmpty();
  }
  /**
   * Returns the size of the queue.
   * Time Complexity: O(1)
   */
  size() {
    return this.list.size;
  }
  /**
   * Returns the queue converted to an array.
   * Time Complexity: O(n)
   */
  toArray() {
    return this.list.toArray();
  }
}
