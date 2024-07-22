import { SegmentTreeType } from '../src/data-structures/segment-tree';
import { SegmentTree } from '../src/data-structures/segment-tree';

describe('SegmentTree', () => {
  describe('Sum', () => {
    describe('with no updates', () => {
      const arr = [1, 2, 3, 4, 5];
      const segmentTree = new SegmentTree(arr);

      it('should return itself when querying range of one element', () => {
        for (let i = 0; i < arr.length; i++) {
          expect(segmentTree.queryRange(i, i)).toBe(arr[i]);
        }
      });

      it('should return correct range sum', () => {
        expect(segmentTree.queryRange(0, 1)).toBe(3); // [1,2]
        expect(segmentTree.queryRange(1, 4)).toBe(14); // [2,3,4,5]
        expect(segmentTree.queryRange(0, 2)).toBe(6); // [1,2,3]
        expect(segmentTree.queryRange(0, 4)).toBe(15); // [1,2,3,4,5]
      });

      it('should return correct range sum even if indices are out of bounds (< 0 or >= arr.length - 1)', () => {
        expect(segmentTree.queryRange(-1, 1)).toBe(3); // [1,2]
        expect(segmentTree.queryRange(1, 5)).toBe(14); // [2,3,4,5]
        expect(segmentTree.queryRange(-100, 2)).toBe(6); // [1,2,3]
        expect(segmentTree.queryRange(0, 10)).toBe(15); // [1,2,3,4,5]
      });
    });

    describe('with updates', () => {
      const arr = [1, 2, 3, 4, 5];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Sum);
      segmentTree.update(0, 10);
      segmentTree.update(2, 0);
      const updatedArr = [10, 2, 0, 4, 5];

      it('should return itself when querying range of one element', () => {
        for (let i = 0; i < updatedArr.length; i++) {
          expect(segmentTree.queryRange(i, i)).toBe(updatedArr[i]);
        }
      });

      it('should return correct range sum', () => {
        expect(segmentTree.queryRange(0, 1)).toBe(12); // [10,2]
        expect(segmentTree.queryRange(1, 4)).toBe(11); // [2,0,4,5]
        expect(segmentTree.queryRange(0, 2)).toBe(12); // [10,2,0]
        expect(segmentTree.queryRange(0, 4)).toBe(21); // [10,2,0,4,5]
      });

      it('should return correct range sum even if indices are out of bounds (< 0 or >= arr.length - 1)', () => {
        expect(segmentTree.queryRange(-1, 1)).toBe(12); // [10,2]
        expect(segmentTree.queryRange(1, 5)).toBe(11); // [2,0,4,5]
        expect(segmentTree.queryRange(-100, 2)).toBe(12); // [10,2,0]
        expect(segmentTree.queryRange(0, 10)).toBe(21); // [10,2,0,4,5]
      });
    });

    describe('edge cases', () => {
      it('should return correct sum range if there is only one element in the array', () => {
        const arr = [1];
        const segmentTree = new SegmentTree(arr);
        expect(segmentTree.queryRange(0, 0)).toBe(1);
      });

      it('should return the correct range sum for negative numbers', () => {
        const arr = [1, -10, -5, 8, -3];
        const segmentTree = new SegmentTree(arr);
        expect(segmentTree.queryRange(0, 0)).toBe(1); // [1]
        expect(segmentTree.queryRange(0, 1)).toBe(-9); // [1,-10]
        expect(segmentTree.queryRange(0, 4)).toBe(-9); // [1,-10,-5,8,-3]
        expect(segmentTree.queryRange(1, 2)).toBe(-15); // [-10,-5]
        expect(segmentTree.queryRange(3, 4)).toBe(5); // [8,-3]
        expect(segmentTree.queryRange(0, 5)).toBe(-9); // [1,-10,-5,8,-3]
      });
    });
  });

  describe('Max', () => {
    describe('with no updates', () => {
      const arr = [1, 2, 3, 4, 5];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Max);

      it('should return itself when querying range of one element', () => {
        for (let i = 0; i < arr.length; i++) {
          expect(segmentTree.queryRange(i, i)).toBe(arr[i]);
        }
      });

      it('should return correct max element in range', () => {
        expect(segmentTree.queryRange(0, 1)).toBe(2); // [1,2]
        expect(segmentTree.queryRange(1, 4)).toBe(5); // [2,3,4,5]
        expect(segmentTree.queryRange(0, 2)).toBe(3); // [1,2,3]
        expect(segmentTree.queryRange(0, 4)).toBe(5); // [1,2,3,4,5]
      });

      it('should return correct max range even if indices are out of bounds (< 0 or >= arr.length - 1)', () => {
        expect(segmentTree.queryRange(-1, 1)).toBe(2); // [1,2]
        expect(segmentTree.queryRange(1, 5)).toBe(5); // [2,3,4,5]
        expect(segmentTree.queryRange(-100, 2)).toBe(3); // [1,2,3]
        expect(segmentTree.queryRange(0, 10)).toBe(5); // [1,2,3,4,5]
      });
    });

    describe('with updates', () => {
      const arr = [1, 2, 3, 4, 5];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Max);
      segmentTree.update(0, 10);
      segmentTree.update(2, 0);
      const updatedArr = [10, 2, 0, 4, 5];

      it('should return itself when querying range of one element', () => {
        for (let i = 0; i < updatedArr.length; i++) {
          expect(segmentTree.queryRange(i, i)).toBe(updatedArr[i]);
        }
      });

      it('should return correct max range', () => {
        expect(segmentTree.queryRange(0, 1)).toBe(10); // [10,2]
        expect(segmentTree.queryRange(1, 4)).toBe(5); // [2,0,4,5]
        expect(segmentTree.queryRange(0, 2)).toBe(10); // [10,2,0]
        expect(segmentTree.queryRange(0, 4)).toBe(10); // [10,2,0,4,5]
      });

      it('should return correct max range even if indices are out of bounds (< 0 or >= arr.length - 1)', () => {
        expect(segmentTree.queryRange(-1, 1)).toBe(10); // [10,2]
        expect(segmentTree.queryRange(1, 5)).toBe(5); // [2,0,4,5]
        expect(segmentTree.queryRange(-100, 2)).toBe(10); // [10,2,0]
        expect(segmentTree.queryRange(0, 10)).toBe(10); // [10,2,0,4,5]
      });
    });

    describe('edge cases', () => {
      it('should return correct max range if there is only one element in the array', () => {
        const arr = [1];
        const segmentTree = new SegmentTree(arr, SegmentTreeType.Max);
        expect(segmentTree.queryRange(0, 0)).toBe(1);
      });

      it('should return the correct max range for negative numbers', () => {
        const arr = [1, -10, -5, 8, -3];
        const segmentTree = new SegmentTree(arr, SegmentTreeType.Max);
        expect(segmentTree.queryRange(0, 0)).toBe(1); // [1]
        expect(segmentTree.queryRange(0, 1)).toBe(1); // [1,-10]
        expect(segmentTree.queryRange(0, 4)).toBe(8); // [1,-10,-5,8,-3]
        expect(segmentTree.queryRange(1, 2)).toBe(-5); // [-10,-5]
        expect(segmentTree.queryRange(3, 4)).toBe(8); // [8,-3]
        expect(segmentTree.queryRange(0, 5)).toBe(8); // [1,-10,-5,8,-3]
      });
    });
  });

  describe('Min', () => {
    describe('with no updates', () => {
      const arr = [1, 2, 3, 4, 5];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Min);

      it('should return itself when querying range of one element', () => {
        for (let i = 0; i < arr.length; i++) {
          expect(segmentTree.queryRange(i, i)).toBe(arr[i]);
        }
      });

      it('should return correct min element in range', () => {
        expect(segmentTree.queryRange(0, 1)).toBe(1); // [1,2]
        expect(segmentTree.queryRange(1, 4)).toBe(2); // [2,3,4,5]
        expect(segmentTree.queryRange(0, 2)).toBe(1); // [1,2,3]
        expect(segmentTree.queryRange(0, 4)).toBe(1); // [1,2,3,4,5]
      });

      it('should return correct min range even if indices are out of bounds (< 0 or >= arr.length - 1)', () => {
        expect(segmentTree.queryRange(-1, 1)).toBe(1); // [1,2]
        expect(segmentTree.queryRange(1, 5)).toBe(2); // [2,3,4,5]
        expect(segmentTree.queryRange(-100, 2)).toBe(1); // [1,2,3]
        expect(segmentTree.queryRange(0, 10)).toBe(1); // [1,2,3,4,5]
      });
    });

    describe('with updates', () => {
      const arr = [1, 2, 3, 4, 5];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Min);
      segmentTree.update(0, 10);
      segmentTree.update(2, 0);
      const updatedArr = [10, 2, 0, 4, 5];

      it('should return itself when querying range of one element', () => {
        for (let i = 0; i < updatedArr.length; i++) {
          expect(segmentTree.queryRange(i, i)).toBe(updatedArr[i]);
        }
      });

      it('should return correct min range', () => {
        expect(segmentTree.queryRange(0, 1)).toBe(2); // [10,2]
        expect(segmentTree.queryRange(1, 4)).toBe(0); // [2,0,4,5]
        expect(segmentTree.queryRange(0, 2)).toBe(0); // [10,2,0]
        expect(segmentTree.queryRange(0, 4)).toBe(0); // [10,2,0,4,5]
      });

      it('should return correct min range even if indices are out of bounds (< 0 or >= arr.length - 1)', () => {
        expect(segmentTree.queryRange(-1, 1)).toBe(2); // [10,2]
        expect(segmentTree.queryRange(1, 5)).toBe(0); // [2,0,4,5]
        expect(segmentTree.queryRange(-100, 2)).toBe(0); // [10,2,0]
        expect(segmentTree.queryRange(0, 10)).toBe(0); // [10,2,0,4,5]
      });
    });
  });

  describe('edge cases', () => {
    it('should return correct min range if there is only one element in the array', () => {
      const arr = [1];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Min);
      expect(segmentTree.queryRange(0, 0)).toBe(1);
    });

    it('should return the correct min range for negative numbers', () => {
      const arr = [1, -10, -5, 8, -3];
      const segmentTree = new SegmentTree(arr, SegmentTreeType.Min);
      expect(segmentTree.queryRange(0, 0)).toBe(1); // [1]
      expect(segmentTree.queryRange(0, 1)).toBe(-10); // [1,-10]
      expect(segmentTree.queryRange(0, 4)).toBe(-10); // [1,-10,-5,8,-3]
      expect(segmentTree.queryRange(1, 2)).toBe(-10); // [-10,-5]
      expect(segmentTree.queryRange(3, 4)).toBe(-3); // [8,-3]
      expect(segmentTree.queryRange(0, 5)).toBe(-10); // [1,-10,-5,8,-3]
    });
  });
});
