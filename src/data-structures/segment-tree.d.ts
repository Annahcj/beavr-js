export enum SegmentTreeType {
  Sum = 'sum',
  Max = 'max',
  Min = 'min'
}

export class SegmentTree {
  constructor(arr: number[], type?: SegmentTreeType);
  build(arr: number[]);
  update(index: number, val: number);
  queryRange(left: number, right: number): number;
}
