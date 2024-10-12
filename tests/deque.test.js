const { Deque } = require('../src/data-structures/deque');

const initializeDeque = (values) => {
  const deque = new Deque();
  for (let val of values) {
    deque.push(val);
  }
  return deque;
};

describe('Deque', () => {
  describe('push', () => {
    it('should push the given value at the end of the deque if the deque has at least one element', () => {
      const deque = initializeDeque([5]);
      deque.push(1);

      expect(deque.size()).toBe(2);
      expect(deque.front()).toBe(5);
      expect(deque.back()).toBe(1);
      expect(deque.toArray()).toEqual([5, 1]);
    });

    it('should push the given value at the end of the deque if the deque is empty', () => {
      const deque = initializeDeque([]);
      deque.push(5);

      expect(deque.size()).toBe(1);
      expect(deque.front()).toBe(5);
      expect(deque.back()).toBe(5);
      expect(deque.toArray()).toEqual([5]);
    });
  });

  describe('pushLeft', () => {
    it('should push the given value at the start of the deque if the deque has at least one element', () => {
      const deque = initializeDeque([5]);
      deque.pushLeft(1);

      expect(deque.size()).toBe(2);
      expect(deque.front()).toBe(1);
      expect(deque.back()).toBe(5);
      expect(deque.toArray()).toEqual([1, 5]);
    });

    it('should push the given value at the start of the deque if the deque is empty', () => {
      const deque = initializeDeque([]);
      deque.pushLeft(5);

      expect(deque.size()).toBe(1);
      expect(deque.front()).toBe(5);
      expect(deque.back()).toBe(5);
      expect(deque.toArray()).toEqual([5]);
    });
  });

  describe('pop', () => {
    it('should remove the last element of the deque and return the removed value if the deque has more than one element', () => {
      const deque = initializeDeque([1, 2, 3]);
      const removedValue = deque.pop();

      expect(removedValue).toBe(3);
      expect(deque.size()).toBe(2);
      expect(deque.front()).toBe(1);
      expect(deque.back()).toBe(2);
      expect(deque.toArray()).toEqual([1, 2]);
    });

    it('should remove the last element of the deque and return the removed value if the deque has one element', () => {
      const deque = initializeDeque([1]);
      const removedValue = deque.pop();

      expect(removedValue).toBe(1);
      expect(deque.size()).toBe(0);
      expect(deque.front()).toBe(null);
      expect(deque.back()).toBe(null);
      expect(deque.toArray()).toEqual([]);
    });

    it('should return null if the deque is empty', () => {
      const deque = initializeDeque([]);
      const removedValue = deque.pop();

      expect(removedValue).toBe(null);
      expect(deque.size()).toBe(0);
      expect(deque.front()).toBe(null);
      expect(deque.toArray()).toEqual([]);
    });
  });

  describe('popLeft', () => {
    it('should remove the first element of the deque and return the removed value if the deque has more than one element', () => {
      const deque = initializeDeque([1, 2, 3]);
      const removedValue = deque.popLeft();

      expect(removedValue).toBe(1);
      expect(deque.size()).toBe(2);
      expect(deque.front()).toBe(2);
      expect(deque.toArray()).toEqual([2, 3]);
    });

    it('should remove the first element of the deque and return the removed value if the deque has one element', () => {
      const deque = initializeDeque([1]);
      const removedValue = deque.popLeft();

      expect(removedValue).toBe(1);
      expect(deque.size()).toBe(0);
      expect(deque.front()).toBe(null);
      expect(deque.toArray()).toEqual([]);
    });

    it('should return null if the deque is empty', () => {
      const deque = initializeDeque([]);
      const removedValue = deque.popLeft();

      expect(removedValue).toBe(null);
      expect(deque.size()).toBe(0);
      expect(deque.front()).toBe(null);
      expect(deque.toArray()).toEqual([]);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the deque is empty on initialization', () => {
      const deque = initializeDeque([]);

      expect(deque.isEmpty()).toBe(true);
      expect(deque.size()).toBe(0);
      expect(deque.toArray()).toEqual([]);
    });

    it('should return true if the deque is empty after removal by popping left', () => {
      const deque = initializeDeque([1]);
      deque.popLeft();
      expect(deque.isEmpty()).toBe(true);
      expect(deque.size()).toBe(0);
      expect(deque.toArray()).toEqual([]);
    });

    it('should return true if the deque is empty after removal by popping right', () => {
      const deque = initializeDeque([1]);
      deque.pop();
      expect(deque.isEmpty()).toBe(true);
      expect(deque.size()).toBe(0);
      expect(deque.toArray()).toEqual([]);
    });

    it('should return false is the deque has one element', () => {
      const deque = initializeDeque([1]);
      expect(deque.isEmpty()).toBe(false);
      expect(deque.size()).toBe(1);
      expect(deque.toArray()).toEqual([1]);
    });

    it('should return false is the deque has more than one element', () => {
      const deque = initializeDeque([1, 2, 3, 4, 5]);
      expect(deque.isEmpty()).toBe(false);
      expect(deque.size()).toBe(5);
      expect(deque.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return false is the deque has one element after inserting at the end', () => {
      const deque = initializeDeque([]);
      deque.push(1);
      expect(deque.isEmpty()).toBe(false);
      expect(deque.size()).toBe(1);
      expect(deque.toArray()).toEqual([1]);
    });

    it('should return false is the deque has one element after inserting at the start', () => {
      const deque = initializeDeque([]);
      deque.pushLeft(1);
      expect(deque.isEmpty()).toBe(false);
      expect(deque.size()).toBe(1);
      expect(deque.toArray()).toEqual([1]);
    });
  });
});
