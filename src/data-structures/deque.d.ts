import { DoublyLinkedList } from './doubly-linked-list';

export class Deque<T> {
  constructor();
  private list: DoublyLinkedList<T>;
  push(val: T);
  pushLeft(val: T);
  pop(): T | null;
  popLeft(): T | null;
  front(): T | null;
  back(): T | null;
  isEmpty(): boolean;
  size(): number;
  toArray(): T[];
}
