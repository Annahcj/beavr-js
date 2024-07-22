import { LinkedListNode } from '../src/data-structures/linked-list';
import { LinkedList } from '../src/data-structures/linked-list';

describe('LinkedList', () => {
  describe('Constructor', () => {
    it('should be an empty list and have a size equal to 0', () => {
      const linkedList = new LinkedList();
      expect(linkedList.getHead() === linkedList.getTail());
      expect(linkedList.size).toBe(0);
      expect(linkedList.toArray()).toEqual([]);
    });
  });

  describe('Add', () => {
    describe('addFirst', () => {
      it('should have the head and tail set to the first node if there is only one node', () => {
        const linkedList = new LinkedList();
        linkedList.addFirst(1);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
      });

      it('should have the head and tail set to the first and second nodes if there are two nodes', () => {
        const linkedList = new LinkedList();
        linkedList.addFirst(1);
        linkedList.addFirst(2);
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(2);
        expect(linkedList.toArray()).toEqual([2, 1]);
      });

      it('should have the head and tail set to the first and last nodes if there are more than two nodes', () => {
        const linkedList = new LinkedList();
        linkedList.addFirst(1);
        linkedList.addFirst(2);
        linkedList.addFirst(3);
        expect(linkedList.getHead()).toBe(3);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([3, 2, 1]);
      });
    });

    describe('addLast', () => {
      it('should have the head and tail set to the first node if there is only one node', () => {
        const linkedList = new LinkedList();
        linkedList.addLast(1);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
      });

      it('should have the head and tail set to the first and second nodes if there are two nodes', () => {
        const linkedList = new LinkedList();
        linkedList.addLast(1);
        linkedList.addLast(2);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(2);
        expect(linkedList.size).toBe(2);
        expect(linkedList.toArray()).toEqual([1, 2]);
      });

      it('should have the head and tail set to the first and last nodes if there are more than two nodes', () => {
        const linkedList = new LinkedList();
        linkedList.addLast(1);
        linkedList.addLast(2);
        linkedList.addLast(3);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
      });
    });

    describe('addAt', () => {
      it('should have the head and tail set to the first node if there is only one node', () => {
        const linkedList = new LinkedList();
        linkedList.addAt(0, 1);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
      });

      it('should have the head and tail set to the first and second nodes if there are two nodes', () => {
        const linkedList = new LinkedList();
        linkedList.addAt(0, 1);
        linkedList.addAt(1, 2);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(2);
        expect(linkedList.size).toBe(2);
        expect(linkedList.toArray()).toEqual([1, 2]);
      });

      it('should have the head and tail set to the first and last nodes if there are more than two nodes', () => {
        const linkedList = new LinkedList();
        linkedList.addAt(0, 1);
        linkedList.addAt(1, 2);
        linkedList.addAt(2, 3);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
      });

      it('should place nodes at the given index and push all other nodes one index to the right', () => {
        const linkedList = new LinkedList();
        linkedList.addAt(0, 1); // 1
        linkedList.addAt(1, 2); // 1 -> 2
        linkedList.addAt(1, 3); // 1 -> 3 -> 2
        linkedList.addAt(0, 4); // 4 -> 1 -> 3 -> 2
        linkedList.addAt(2, 5); // 4 -> 1 -> 5 -> 3 -> 2

        expect(linkedList.toArray()).toEqual([4, 1, 5, 3, 2]);
        expect(linkedList.getHead()).toBe(4);
        expect(linkedList.getTail()).toBe(2);
        expect(linkedList.size).toBe(5);
      });

      it('should throw an error if index < 0', () => {
        const linkedList = new LinkedList();
        expect(() => {
          linkedList.addAt(-1, 1);
        }).toThrow(new Error('Index out of bounds'));
      });

      it('should throw an error if index is larger than the size of the list', () => {
        const linkedList = new LinkedList([1, 2, 3]);
        expect(() => {
          linkedList.addAt(4, 1);
        }).toThrow(new Error('Index out of bounds'));
      });
    });

    describe('addAll', () => {
      it('should add all the values to the end of the list', () => {
        const linkedList = new LinkedList();
        linkedList.addAll([1, 2, 3, 4, 5]);

        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(5);
        expect(linkedList.size).toBe(5);
      });

      it('should add all the values to the end of an initialized list', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        linkedList.addAll([6, 7, 8, 9, 10]);

        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(10);
        expect(linkedList.size).toBe(10);
      });
    });
  });

  describe('Remove', () => {
    describe('removeHead', () => {
      it('should remove and return the head on an initialized list', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeHead();

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);
      });

      it('should return the correct head after removal of the only node', () => {
        const linkedList = new LinkedList([1]);
        const result = linkedList.removeHead();

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });

      it('should return null on an empty list', () => {
        const linkedList = new LinkedList();
        const result = linkedList.removeHead();

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });
    });

    describe('removeTail', () => {
      it('should remove and return the tail on an initialized list', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeTail();

        expect(result).toBe(5);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(4);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
      });

      it('should return the correct tail after removal of the only node', () => {
        const linkedList = new LinkedList([1]);
        const result = linkedList.removeTail();

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });

      it('should return null on an empty list', () => {
        const linkedList = new LinkedList();
        const result = linkedList.removeTail();

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });
    });

    describe('removeAt', () => {
      it('should remove the first node correctly', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeAt(0);

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.getTail()).toBe(5);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);
      });

      it('should remove the last node correctly', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeAt(4);

        expect(result).toBe(5);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(4);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
      });

      it('should remove the node at the given index', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new LinkedList(values);
          const result = linkedList.removeAt(i);

          expect(result).toBe(values[i]);
          expect(linkedList.getHead()).toBe(i === 0 ? values[1] : values[0]);
          expect(linkedList.getTail()).toBe(
            i === values.length - 1
              ? values[values.length - 2]
              : values[values.length - 1]
          );
          expect(linkedList.size).toBe(4);
          expect(linkedList.toArray()).toEqual(
            values.filter((value) => value !== values[i])
          );
        }
      });

      it('should remove the first and only node correctly', () => {
        const linkedList = new LinkedList([1]);
        const result = linkedList.removeAt(0);

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });

      it('should return null on an empty list', () => {
        const linkedList = new LinkedList();
        const result = linkedList.removeAt(0);

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });

      it('should return null if the index is less than 0', () => {
        const linkedList = new LinkedList([1, 2, 3]);
        const result = linkedList.removeAt(-1);

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
      });

      it('should return null if the index is greater than the last index', () => {
        const linkedList = new LinkedList([1, 2, 3]);
        const result = linkedList.removeAt(3);

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
      });
    });
  });

  describe('Get', () => {
    describe('getAt', () => {
      it('should return the value at the given index', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new LinkedList(values);
          const result = linkedList.getAt(i);

          expect(result).toBe(values[i]);
          expect(linkedList.size).toBe(5);
          expect(linkedList.toArray()).toEqual(values);
        }
      });

      it('should return null if the index is less than 0', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.getAt(-1);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return null if the index is greater than the last index', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.getAt(5);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('getNodeAt', () => {
      it('should return the node at the given index', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new LinkedList(values);
          const result = linkedList._getNodeAt(i);

          expect(result).toBeInstanceOf(LinkedListNode);
          expect(result.val).toBe(values[i]);
          expect(linkedList.size).toBe(5);
          expect(linkedList.toArray()).toEqual(values);
        }
      });

      it('should return the dummy head if the index is -1', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(-1);

        expect(result).toBeInstanceOf(LinkedListNode);
        expect(result.val).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return null if the index is less than -1', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(-2);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return null if the index is greater than the last index', () => {
        const linkedList = new LinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(5);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
      });
    });
  });

  describe('Helpers', () => {
    describe('isEmpty', () => {
      it('should return true if the list is empty', () => {
        const linkedList = new LinkedList([]);
        const result = linkedList.isEmpty();

        expect(result).toBe(true);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
      });

      it('should return false if the list has one node', () => {
        const linkedList = new LinkedList([1]);
        const result = linkedList.isEmpty();

        expect(result).toBe(false);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
      });

      it('should return false if the list has more than one node', () => {
        const linkedList = new LinkedList([1, 2, 3]);
        const result = linkedList.isEmpty();

        expect(result).toBe(false);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
      });
    });

    describe('clone', () => {
      it('should return a new list with the same values', () => {
        const values = [1, 2, 3, 4, 5];
        const linkedList = new LinkedList(values);
        const clonedList = linkedList.clone();

        expect(clonedList).not.toBe(linkedList);
        expect(clonedList).toBeInstanceOf(LinkedList);
        expect(clonedList.size).toBe(5);
        expect(clonedList.toArray()).toEqual(values);
      });

      it('should return a new list if the original list has one node', () => {
        const linkedList = new LinkedList([1]);
        const clonedList = linkedList.clone();

        expect(clonedList).not.toBe(linkedList);
        expect(clonedList).toBeInstanceOf(LinkedList);
        expect(clonedList.size).toBe(1);
        expect(clonedList.toArray()).toEqual([1]);
      });

      it('should return a new empty list if the original list is empty', () => {
        const linkedList = new LinkedList([]);
        const clonedList = linkedList.clone();

        expect(clonedList).not.toBe(linkedList);
        expect(clonedList).toBeInstanceOf(LinkedList);
        expect(clonedList.size).toBe(0);
        expect(clonedList.toArray()).toEqual([]);
      });
    });
  });
});
