export class PriorityQueue<T> {
  constructor(comparator: (a: T, b: T) => number, values?: T[]);
  private values: T[];
  private comparator: (a: T, b: T) => number;
  size: number;
  add(value: T);
  remove(): T | null;
  top(): T | null;
  isEmpty(): boolean;
  private _heapifyUp(startIndex: number);
  private _heapifyDown(startIndex);
  private _swap(index1: number, index2: number);
  private __isOrderCorrect(index1: number, index2: number);
}
