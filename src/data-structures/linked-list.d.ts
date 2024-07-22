export class LinkedListNode<T> {
  constructor(val: T);
  val: T;
  next: LinkedListNode<T> | null;
}

export class LinkedList<T> {
  constructor(values?: T[]);
  size: number;
  addFirst(val: T);
  addLast(val: T);
  addAt(index: number, val: T);
  addAll(values: T[]);
  removeHead(): T | null;
  removeTail(): T | null;
  removeAt(index: number): T | null;
  getHead(): T | null;
  getTail(): T | null;
  getAt(index: number): T | null;
  isEmpty(): boolean;
  toArray(): Array<T>;
  clone(): LinkedList<T>;
  _getNodeAt(index: number): LinkedListNode<T> | null;
}
