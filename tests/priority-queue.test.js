import { PriorityQueue } from '../src/data-structures/priority-queue';

describe('PriorityQueue', () => {
  describe('add', () => {
    describe('ascending sort order', () => {
      it('should add the given value and update the top element correctly if the queue has at least one element', () => {
        const priorityQueue = new PriorityQueue((a, b) => a - b, [2]);
        expect(priorityQueue.top()).toBe(2);
        expect(priorityQueue.size).toBe(1);
        priorityQueue.add(1);

        expect(priorityQueue.size).toBe(2);
        expect(priorityQueue.top()).toBe(1);
      });

      it('should add the given value and should not update the top element if the new element is not the smallest', () => {
        const priorityQueue = new PriorityQueue((a, b) => a - b, [1, 2, 4]);
        expect(priorityQueue.top()).toBe(1);
        expect(priorityQueue.size).toBe(3);
        priorityQueue.add(3);

        expect(priorityQueue.size).toBe(4);
        expect(priorityQueue.top()).toBe(1);
      });

      it('should add the given value and update the top element correctly if the queue is empty', () => {
        const priorityQueue = new PriorityQueue((a, b) => a - b);
        expect(priorityQueue.top()).toBe(null);
        expect(priorityQueue.size).toBe(0);
        priorityQueue.add(1);

        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.top()).toBe(1);
      });
    });

    describe('descending sort order', () => {
      it('should add the given value and update the top element correctly if the queue has at least one element', () => {
        const priorityQueue = new PriorityQueue((a, b) => b - a, [1]);
        expect(priorityQueue.top()).toBe(1);
        expect(priorityQueue.size).toBe(1);
        priorityQueue.add(2);

        expect(priorityQueue.size).toBe(2);
        expect(priorityQueue.top()).toBe(2);
      });

      it('should add the given value and update the top element correctly if the queue is empty', () => {
        const priorityQueue = new PriorityQueue((a, b) => b - a, []);
        expect(priorityQueue.top()).toBe(null);
        expect(priorityQueue.size).toBe(0);
        priorityQueue.add(1);

        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.top()).toBe(1);
      });
    });
  });

  describe('remove', () => {
    describe('descending sort order', () => {
      it('should remove the top element of the queue and return the removed value if the queue has more than one element', () => {
        const priorityQueue = new PriorityQueue((a, b) => a - b, [1, 2, 3]);
        expect(priorityQueue.size).toBe(3);
        expect(priorityQueue.top()).toBe(1);
        const removedValue = priorityQueue.remove();
  
        expect(removedValue).toBe(1);
        expect(priorityQueue.size).toBe(2);
        expect(priorityQueue.top()).toBe(2);
      });
  
      it('should remove the top element of the queue and return the removed value if the queue has one element', () => {
        const priorityQueue = new PriorityQueue((a, b) => a - b, [1]);
        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.top()).toBe(1);
        const removedValue = priorityQueue.remove();
  
        expect(removedValue).toBe(1);
        expect(priorityQueue.size).toBe(0);
        expect(priorityQueue.top()).toBe(null);
      });
  
      it('should return null if the queue is empty', () => {
        const priorityQueue = new PriorityQueue((a, b) => a - b);
        expect(priorityQueue.size).toBe(0);
        expect(priorityQueue.top()).toBe(null);
        const removedValue = priorityQueue.remove();
  
        expect(removedValue).toBe(null);
        expect(priorityQueue.size).toBe(0);
        expect(priorityQueue.top()).toBe(null);
      });
  
      it('should remove the values in sorted order when removed one-by-one', () => {
        const values = [1, 2, 3, 4, 5, 6, 7];
        const priorityQueue = new PriorityQueue((a, b) => a - b, values);
        for (let i = 0; i < values.length; i++) {
          expect(priorityQueue.size).toBe(values.length - i);
          expect(priorityQueue.top()).toBe(values[i]);
          const removedValue = priorityQueue.remove();
          expect(removedValue).toBe(values[i]);
          expect(priorityQueue.size).toBe(values.length - i - 1);
        }
      });
    });

    describe('ascending sort order', () => {
      it('should remove the top element of the queue and return the removed value if the queue has more than one element', () => {
        const priorityQueue = new PriorityQueue((a, b) => b - a, [1, 2, 3]);
        expect(priorityQueue.size).toBe(3);
        expect(priorityQueue.top()).toBe(3);
        const removedValue = priorityQueue.remove();
  
        expect(removedValue).toBe(3);
        expect(priorityQueue.size).toBe(2);
        expect(priorityQueue.top()).toBe(2);
      });

      it('should remove the values in sorted order when removed one-by-one', () => {
        const values = [3, 6, 9, 5, 4, 1, 8, 2, 7, 10];
        const sorted = [...values].sort((a, b) => b - a);
        const priorityQueue = new PriorityQueue((a, b) => b - a, values);
        for (let i = 0; i < values.length; i++) {
          const currSize = values.length - i;
          expect(priorityQueue.size).toBe(currSize);
          expect(priorityQueue.top()).toBe(sorted[i]);
          const removedValue = priorityQueue.remove();
          expect(removedValue).toBe(sorted[i]);
          expect(priorityQueue.size).toBe(currSize - 1);
        }
      });
    });
  });

  describe('isEmpty', () => {
    it('should return true if the queue is empty on initialization', () => {
      const priorityQueue = new PriorityQueue((a, b) => a - b);

      expect(priorityQueue.isEmpty()).toBe(true);
      expect(priorityQueue.size).toBe(0);
      expect(priorityQueue.top()).toBe(null);
    });

    it('should return true if the queue is empty after removal', () => {
      const priorityQueue = new PriorityQueue((a, b) => a - b, [1]);
      expect(priorityQueue.size).toBe(1);
      priorityQueue.remove();

      expect(priorityQueue.isEmpty()).toBe(true);
      expect(priorityQueue.size).toBe(0);
      expect(priorityQueue.top()).toBe(null);
    });

    it('should return false is the queue has one element', () => {
      const priorityQueue = new PriorityQueue((a, b) => a - b, [1]);
      expect(priorityQueue.isEmpty()).toBe(false);
      expect(priorityQueue.size).toBe(1);
    });

    it('should return false is the queue has more than one element', () => {
      const priorityQueue = new PriorityQueue((a, b) => b - a, [1, 2, 3, 4, 5]);
      expect(priorityQueue.isEmpty()).toBe(false);
      expect(priorityQueue.size).toBe(5);
      expect(priorityQueue.top()).toBe(5);
    });

    it('should return false is the queue has one element after insertion', () => {
      const priorityQueue = new PriorityQueue((a, b) => a - b);
      priorityQueue.add(1);
      expect(priorityQueue.isEmpty()).toBe(false);
      expect(priorityQueue.size).toBe(1);
      expect(priorityQueue.top()).toBe(1);
    });
  });
});
