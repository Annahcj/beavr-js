const {
  DoublyLinkedList,
  DoublyLinkedListNode,
} = require('../src/data-structures/doubly-linked-list');

// Helper function used to check the list's prev references are correct
const toArrayReversed = (list) => {
  let node = list.tail.prev;
  let values = [];
  while (node !== list.head) {
    values.push(node.val);
    node = node.prev;
  }
  return values.reverse();
};

describe('DoublyLinkedList', () => {
  describe('Constructor', () => {
    it('should be an empty list, have a size equal to 0, and have a dummy head and dummy tail', () => {
      const linkedList = new DoublyLinkedList();
      expect(linkedList.head !== linkedList.tail);
      expect(linkedList.head.val).toBeNull();
      expect(linkedList.tail.val).toBeNull();
      expect(linkedList.size).toBe(0);
      expect(linkedList.toArray()).toEqual([]);
      expect(toArrayReversed(linkedList)).toEqual([]);
    });
  });

  describe('Add', () => {
    describe('addFirst', () => {
      it('should have the head and tail set to the first node if there is only one node', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addFirst(1);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
        expect(toArrayReversed(linkedList)).toEqual([1]);
      });

      it('should have the head and tail set to the first and second nodes if there are two nodes', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addFirst(1);
        linkedList.addFirst(2);
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(2);
        expect(linkedList.toArray()).toEqual([2, 1]);
        expect(toArrayReversed(linkedList)).toEqual([2, 1]);
      });

      it('should have the head and tail set to the first and last nodes if there are more than two nodes', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addFirst(1);
        linkedList.addFirst(2);
        linkedList.addFirst(3);
        expect(linkedList.getHead()).toBe(3);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([3, 2, 1]);
        expect(toArrayReversed(linkedList)).toEqual([3, 2, 1]);
      });
    });

    describe('addLast', () => {
      it('should have the head and tail set to the first node if there is only one node', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addLast(1);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
        expect(toArrayReversed(linkedList)).toEqual([1]);
      });

      it('should have the head and tail set to the first and second nodes if there are two nodes', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addLast(1);
        linkedList.addLast(2);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(2);
        expect(linkedList.size).toBe(2);
        expect(linkedList.toArray()).toEqual([1, 2]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2]);
      });

      it('should have the head and tail set to the first and last nodes if there are more than two nodes', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addLast(1);
        linkedList.addLast(2);
        linkedList.addLast(3);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3]);
      });
    });

    describe('addAt', () => {
      it('should have the head and tail set to the first node if there is only one node', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addAt(0, 1);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(1);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
        expect(toArrayReversed(linkedList)).toEqual([1]);
      });

      it('should have the head and tail set to the first and second nodes if there are two nodes', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addAt(0, 1);
        linkedList.addAt(1, 2);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(2);
        expect(linkedList.size).toBe(2);
        expect(linkedList.toArray()).toEqual([1, 2]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2]);
      });

      it('should have the head and tail set to the first and last nodes if there are more than two nodes', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addAt(0, 1);
        linkedList.addAt(1, 2);
        linkedList.addAt(2, 3);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3]);
      });

      it('should place nodes at the given index and push all other nodes one index to the right', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addAt(0, 1); // 1
        linkedList.addAt(1, 2); // 1 -> 2
        linkedList.addAt(1, 3); // 1 -> 3 -> 2
        linkedList.addAt(0, 4); // 4 -> 1 -> 3 -> 2
        linkedList.addAt(2, 5); // 4 -> 1 -> 5 -> 3 -> 2

        expect(linkedList.toArray()).toEqual([4, 1, 5, 3, 2]);
        expect(toArrayReversed(linkedList)).toEqual([4, 1, 5, 3, 2]);
        expect(linkedList.getHead()).toBe(4);
        expect(linkedList.getTail()).toBe(2);
        expect(linkedList.size).toBe(5);
      });

      it('should throw an error if index < 0', () => {
        const linkedList = new DoublyLinkedList();
        expect(() => {
          linkedList.addAt(-1, 1);
        }).toThrow(new Error('Index out of bounds'));
      });

      it('should throw an error if index is larger than the size of the list', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3]);
        expect(() => {
          linkedList.addAt(4, 1);
        }).toThrow(new Error('Index out of bounds'));
      });
    });

    describe('addAll', () => {
      it('should add all the values to the end of the list', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.addAll([1, 2, 3, 4, 5]);

        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(5);
        expect(linkedList.size).toBe(5);
      });

      it('should add all the values to the end of an initialized list', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        linkedList.addAll([6, 7, 8, 9, 10]);

        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(toArrayReversed(linkedList)).toEqual([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ]);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(10);
        expect(linkedList.size).toBe(10);
      });
    });
  });

  describe('Remove', () => {
    describe('removeHead', () => {
      it('should remove and return the head on an initialized list', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeHead();

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([2, 3, 4, 5]);
      });

      it('should return the correct head after removal of the only node', () => {
        const linkedList = new DoublyLinkedList([1]);
        const result = linkedList.removeHead();

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });

      it('should return null on an empty list', () => {
        const linkedList = new DoublyLinkedList();
        const result = linkedList.removeHead();

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });
    });

    describe('removeTail', () => {
      it('should remove and return the tail on an initialized list', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeTail();

        expect(result).toBe(5);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(4);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4]);
      });

      it('should return the correct tail after removal of the only node', () => {
        const linkedList = new DoublyLinkedList([1]);
        const result = linkedList.removeTail();

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });

      it('should return null on an empty list', () => {
        const linkedList = new DoublyLinkedList();
        const result = linkedList.removeTail();

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });
    });

    describe('removeAt', () => {
      it('should remove the first node correctly', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeAt(0);

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.getTail()).toBe(5);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([2, 3, 4, 5]);
      });

      it('should remove the last node correctly', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.removeAt(4);

        expect(result).toBe(5);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(4);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4]);
      });

      it('should remove the node at the given index', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new DoublyLinkedList(values);
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
          expect(toArrayReversed(linkedList)).toEqual(
            values.filter((value) => value !== values[i])
          );
        }
      });

      it('should remove the first and only node correctly', () => {
        const linkedList = new DoublyLinkedList([1]);
        const result = linkedList.removeAt(0);

        expect(result).toBe(1);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });

      it('should return null on an empty list', () => {
        const linkedList = new DoublyLinkedList();
        const result = linkedList.removeAt(0);

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(null);
        expect(linkedList.getTail()).toBe(null);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });

      it('should return null if the index is less than 0', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3]);
        const result = linkedList.removeAt(-1);

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3]);
      });

      it('should return null if the index is greater than the last index', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3]);
        const result = linkedList.removeAt(3);

        expect(result).toBe(null);
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(3);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3]);
      });
    });

    describe('removeNode', () => {
      it('should remove the first node correctly and remove all references to the previous and next node', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const firstNode = linkedList._getNodeAt(0);
        expect(firstNode.prev).toBe(linkedList.head);
        expect(firstNode.next.val).toBe(2);

        linkedList.removeNode(firstNode);

        expect(firstNode.prev).toBeNull();
        expect(firstNode.next).toBeNull();
        expect(linkedList.getHead()).toBe(2);
        expect(linkedList.getTail()).toBe(5);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([2, 3, 4, 5]);
      });

      it('should remove the last node correctly and remove all references to the previous and next node', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const lastNode = linkedList._getNodeAt(4);
        expect(lastNode.prev.val).toBe(4);
        expect(lastNode.next).toBe(linkedList.tail);

        linkedList.removeNode(lastNode);

        expect(lastNode.prev).toBeNull();
        expect(lastNode.next).toBeNull();
        expect(linkedList.getHead()).toBe(1);
        expect(linkedList.getTail()).toBe(4);
        expect(linkedList.size).toBe(4);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4]);
      });

      it('should remove the node at the given index and remove all references to the previous and next node', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new DoublyLinkedList(values);
          const nodeToRemove = linkedList._getNodeAt(i);
          linkedList.removeNode(nodeToRemove);

          expect(nodeToRemove.prev).toBeNull();
          expect(nodeToRemove.next).toBeNull();
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
          expect(toArrayReversed(linkedList)).toEqual(
            values.filter((value) => value !== values[i])
          );
        }
      });

      it('should remove the first and only node correctly', () => {
        const linkedList = new DoublyLinkedList([1]);
        const firstAndOnlyNode = linkedList._getNodeAt(0);
        expect(firstAndOnlyNode.prev).toBe(linkedList.head);
        expect(firstAndOnlyNode.next).toBe(linkedList.tail);

        linkedList.removeNode(firstAndOnlyNode);

        expect(firstAndOnlyNode.prev).toBeNull();
        expect(firstAndOnlyNode.next).toBeNull();
        expect(linkedList.getHead()).toBeNull();
        expect(linkedList.getTail()).toBeNull();
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });

      it('should throw an error if the node is the dummy head', () => {
        const linkedList = new DoublyLinkedList();
        expect(() => {
          linkedList.removeNode(linkedList.head);
        }).toThrow(
          new Error('Cannot remove the dummy head or tail of the linked list')
        );
      });

      it('should throw an error if the node is the dummy tail', () => {
        const linkedList = new DoublyLinkedList();
        expect(() => {
          linkedList.removeNode(linkedList.tail);
        }).toThrow(
          new Error('Cannot remove the dummy head or tail of the linked list')
        );
      });
    });
  });

  describe('Get', () => {
    describe('getAt', () => {
      it('should return the value at the given index', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new DoublyLinkedList(values);
          const result = linkedList.getAt(i);

          expect(result).toBe(values[i]);
          expect(linkedList.size).toBe(5);
          expect(linkedList.toArray()).toEqual(values);
          expect(toArrayReversed(linkedList)).toEqual(values);
        }
      });

      it('should return null if the index is less than 0', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.getAt(-1);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return null if the index is greater than the last index', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList.getAt(5);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('getNodeAt', () => {
      it('should return the node at the given index', () => {
        const values = [1, 2, 3, 4, 5];
        for (let i = 0; i < values.length; i++) {
          const linkedList = new DoublyLinkedList(values);
          const result = linkedList._getNodeAt(i);

          expect(result).toBeInstanceOf(DoublyLinkedListNode);
          expect(result.val).toBe(values[i]);
          expect(linkedList.size).toBe(5);
          expect(linkedList.toArray()).toEqual(values);
          expect(toArrayReversed(linkedList)).toEqual(values);
        }
      });

      it('should return the dummy head if the index is -1', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(-1);

        expect(result).toBeInstanceOf(DoublyLinkedListNode);
        expect(result.val).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return the dummy tail if the index is equal to the size of the list', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(5);

        expect(result).toBeInstanceOf(DoublyLinkedListNode);
        expect(result.val).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return null if the index is less than -1', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(-2);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
      });

      it("should return null if the index is greater than the tail node's index + 1", () => {
        const linkedList = new DoublyLinkedList([1, 2, 3, 4, 5]);
        const result = linkedList._getNodeAt(6);

        expect(result).toBe(null);
        expect(linkedList.size).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3, 4, 5]);
      });
    });
  });

  describe('Helpers', () => {
    describe('isEmpty', () => {
      it('should return true if the list is empty', () => {
        const linkedList = new DoublyLinkedList([]);
        const result = linkedList.isEmpty();

        expect(result).toBe(true);
        expect(linkedList.size).toBe(0);
        expect(linkedList.toArray()).toEqual([]);
        expect(toArrayReversed(linkedList)).toEqual([]);
      });

      it('should return false if the list has one node', () => {
        const linkedList = new DoublyLinkedList([1]);
        const result = linkedList.isEmpty();

        expect(result).toBe(false);
        expect(linkedList.size).toBe(1);
        expect(linkedList.toArray()).toEqual([1]);
        expect(toArrayReversed(linkedList)).toEqual([1]);
      });

      it('should return false if the list has more than one node', () => {
        const linkedList = new DoublyLinkedList([1, 2, 3]);
        const result = linkedList.isEmpty();

        expect(result).toBe(false);
        expect(linkedList.size).toBe(3);
        expect(linkedList.toArray()).toEqual([1, 2, 3]);
        expect(toArrayReversed(linkedList)).toEqual([1, 2, 3]);
      });
    });

    describe('clone', () => {
      it('should return a new list with the same values', () => {
        const values = [1, 2, 3, 4, 5];
        const linkedList = new DoublyLinkedList(values);
        const clonedList = linkedList.clone();

        expect(clonedList).not.toBe(linkedList);
        expect(clonedList).toBeInstanceOf(DoublyLinkedList);
        expect(clonedList.size).toBe(5);
        expect(clonedList.toArray()).toEqual(values);
        expect(toArrayReversed(clonedList)).toEqual(values);
      });

      it('should return a new list if the original list has one node', () => {
        const linkedList = new DoublyLinkedList([1]);
        const clonedList = linkedList.clone();

        expect(clonedList).not.toBe(linkedList);
        expect(clonedList).toBeInstanceOf(DoublyLinkedList);
        expect(clonedList.size).toBe(1);
        expect(clonedList.toArray()).toEqual([1]);
        expect(toArrayReversed(clonedList)).toEqual([1]);
      });

      it('should return a new empty list if the original list is empty', () => {
        const linkedList = new DoublyLinkedList([]);
        const clonedList = linkedList.clone();

        expect(clonedList).not.toBe(linkedList);
        expect(clonedList).toBeInstanceOf(DoublyLinkedList);
        expect(clonedList.size).toBe(0);
        expect(clonedList.toArray()).toEqual([]);
        expect(toArrayReversed(clonedList)).toEqual([]);
      });
    });
  });
});
