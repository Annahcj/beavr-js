export class DoublyLinkedListNode<T> {
  constructor(val: T);
  val: T;
  next: DoublyLinkedListNode<T> | null;
}

export class DoublyLinkedList<T> {
  constructor(values?: T[]);
  size: number;
  addFirst(val: T);
  addLast(val: T);
  addAt(index: number, val: T);
  addAll(values: T[]);
  removeHead(): T | null;
  removeTail(): T | null;
  removeAt(index: number): T | null;
  removeNode(node: DoublyLinkedListNode<T>);
  getHead(): T | null;
  getTail(): T | null;
  getAt(index: number): T | null;
  isEmpty(): boolean;
  toArray(): Array<T>;
  clone(): DoublyLinkedList<T>;
  _getNodeAt(index: number): DoublyLinkedListNode<T> | null;
}
