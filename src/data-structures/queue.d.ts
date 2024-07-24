import { LinkedList } from './linked-list';

export class Queue<T> {
  constructor();
  private list: LinkedList<T>;
  enqueue(val: T);
  dequeue(): T | null;
  front(): T | null;
  back(): T | null;
  isEmpty(): boolean;
  size(): number;
  toArray(): T[];
}
