const { Queue } = require('../src/data-structures/queue');

const initializeQueue = (values) => {
  const queue = new Queue();
  for (let val of values) {
    queue.enqueue(val);
  }
  return queue;
};

describe('Queue', () => {
  describe('enqueue', () => {
    it('should push the given value at the end of the queue if the queue has at least one element', () => {
      const queue = initializeQueue([5]);
      queue.enqueue(1);

      expect(queue.size()).toBe(2);
      expect(queue.front()).toBe(5);
      expect(queue.back()).toBe(1);
      expect(queue.toArray()).toEqual([5, 1]);
    });

    it('should push the given value at the end of the queue if the queue is empty', () => {
      const queue = initializeQueue([]);
      queue.enqueue(5);

      expect(queue.size()).toBe(1);
      expect(queue.front()).toBe(5);
      expect(queue.back()).toBe(5);
      expect(queue.toArray()).toEqual([5]);
    });
  });

  describe('dequeue', () => {
    it('should remove the first element of the queue and return the removed value if the queue has more than one element', () => {
      const queue = initializeQueue([1, 2, 3]);
      const removedValue = queue.dequeue();

      expect(removedValue).toBe(1);
      expect(queue.size()).toBe(2);
      expect(queue.front()).toBe(2);
      expect(queue.toArray()).toEqual([2, 3]);
    });

    it('should remove the first element of the queue and return the removed value if the queue has one element', () => {
      const queue = initializeQueue([1]);
      const removedValue = queue.dequeue();

      expect(removedValue).toBe(1);
      expect(queue.size()).toBe(0);
      expect(queue.front()).toBe(null);
      expect(queue.toArray()).toEqual([]);
    });

    it('should return null if the queue is empty', () => {
      const queue = initializeQueue([]);
      const removedValue = queue.dequeue();

      expect(removedValue).toBe(null);
      expect(queue.size()).toBe(0);
      expect(queue.front()).toBe(null);
      expect(queue.toArray()).toEqual([]);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the queue is empty on initialization', () => {
      const queue = initializeQueue([]);

      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.toArray()).toEqual([]);
    });

    it('should return true if the queue is empty after removal', () => {
      const queue = initializeQueue([1]);
      queue.dequeue();
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.toArray()).toEqual([]);
    });

    it('should return false is the queue has one element', () => {
      const queue = initializeQueue([1]);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.size()).toBe(1);
      expect(queue.toArray()).toEqual([1]);
    });

    it('should return false is the queue has more than one element', () => {
      const queue = initializeQueue([1, 2, 3, 4, 5]);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.size()).toBe(5);
      expect(queue.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return false is the queue has one element after insertion', () => {
      const queue = initializeQueue([]);
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.size()).toBe(1);
      expect(queue.toArray()).toEqual([1]);
    });
  });
});
