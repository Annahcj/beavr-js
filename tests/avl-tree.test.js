import { AVLTree, AVLTreeNode } from '../src/data-structures/avl-tree';

const initializeTree = (tree, values) => {
  values.forEach((value) => {
    tree.insert(value);
  });
};

// check that every node has a height different <= 1
const checkTreeBalance = (node) => {
  if (!node) return 0;
  const leftHeight = checkTreeBalance(node.left);
  const rightHeight = checkTreeBalance(node.right);
  if (Math.abs(leftHeight - rightHeight) > 1) {
    throw new Error(`Tree is inbalanced at node with value ${node.val}`);
  }
  return node.height;
};

describe('AVLTree', () => {
  describe('constructor', () => {
    it('should fallback to default ascending comparator function if not passed in', () => {
      const avlTree = new AVLTree();
      const values = [2, 1, 3, 5, 4];
      initializeTree(avlTree, values);
      values.sort((a, b) => a - b);

      checkTreeBalance(avlTree.root);
      for (let i = 0; i < values.length; i++) {
        expect(avlTree.getKthSmallest(i + 1)).toBe(values[i]);
      }
    });

    it('should order the tree based on the comparator function passed in', () => {
      const avlTree = new AVLTree((a, b) => b - a);
      const values = [2, 1, 3, 5, 5, 4];
      initializeTree(avlTree, values);
      values.sort((a, b) => b - a);

      checkTreeBalance(avlTree.root);
      for (let i = 0; i < values.length; i++) {
        expect(avlTree.getKthSmallest(i + 1)).toBe(values[i]);
      }
    });

    it('should order the tree based on the comparator function passed in', () => {
      const avlTree = new AVLTree((a, b) => b.val - a.val);
      const values = [
        { val: 2 },
        { val: 1 },
        { val: 3 },
        { val: 5 },
        { val: 4 },
      ];
      initializeTree(avlTree, values);
      values.sort((a, b) => b.val - a.val);

      checkTreeBalance(avlTree.root);
      for (let i = 0; i < values.length; i++) {
        expect(avlTree.getKthSmallest(i + 1)).toBe(values[i]);
      }
    });
  });

  describe('find', () => {
    describe('with a simple comparator function', () => {
      it('should return the node with the given value', () => {
        const avlTree = new AVLTree((a, b) => a - b);
        const values = [2, 1, 3, 5, 4];
        initializeTree(avlTree, values);
        values.sort((a, b) => a - b);

        checkTreeBalance(avlTree.root);
        for (let i = 0; i < values.length; i++) {
          const node = avlTree.find(values[i]);
          expect(node).toBeInstanceOf(AVLTreeNode);
          expect(node.val).toBe(values[i]);
        }
      });

      it("should return null if the node with the given value doesn't exist", () => {
        const avlTree = new AVLTree((a, b) => a - b);
        const values = [2, 1, 3, 5, 4];
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.find(10)).toBeNull();
        expect(avlTree.find(0)).toBeNull();
        expect(avlTree.find(-1)).toBeNull();
      });

      it('should return a node matching the given value if there are multiple nodes with the same value', () => {
        const avlTree = new AVLTree((a, b) => a - b);
        const values = [2, 1, 3, 5, 5, 5, 4];
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        const node = avlTree.find(5);
        expect(node).toBeInstanceOf(AVLTreeNode);
        expect(node.val).toBe(5);
      });
    });

    describe('with an object comparator function', () => {
      const values = [
        { val: 2 },
        { val: 1 },
        { val: 3 },
        { val: 5 },
        { val: 4 },
        { val: 7 },
        { val: 9 },
        { val: 8 },
        { val: 0 },
      ];
      const avlTree = new AVLTree((a, b) => a.val - b.val);
      initializeTree(avlTree, values);
      values.sort((a, b) => a.val - b.val);
      checkTreeBalance(avlTree.root);

      it('should return the node with the given value', () => {
        for (let i = 0; i < values.length; i++) {
          const node = avlTree.find(values[i]);
          expect(node).toBeInstanceOf(AVLTreeNode);
          expect(node.val).toBe(values[i]);
        }
      });

      it("should return null if the node with the given value doesn't exist", () => {
        expect(avlTree.find({ val: 10 })).toBeNull();
        expect(avlTree.find({ val: -1 })).toBeNull();
        expect(avlTree.find(1)).toBeNull();
        expect(avlTree.find(0)).toBeNull();
      });

      it('should return a node matching the given value if there are multiple nodes with the same value', () => {
        const values = [{ val: 2 }, { val: 1 }, { val: 3 }, { val: 3 }];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        const node = avlTree.find({ val: 3 });
        expect(node).toBeInstanceOf(AVLTreeNode);
        expect(node.val).toEqual({ val: 3 });
      });
    });
  });

  describe('has', () => {
    describe('with a simple comparator function', () => {
      it('should return true if the tree contains the given value', () => {
        const avlTree = new AVLTree((a, b) => a - b);
        const values = [2, 1, 3, 5, 4, 7, 9, 8, 0];
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        values.forEach((value) => {
          expect(avlTree.has(value)).toBe(true);
        });
      });

      it("should return false if the tree doesn't contain the given value", () => {
        const avlTree = new AVLTree((a, b) => b - a);
        const values = [2, 1, 3, 5, 4, 7, 9, 8, 0];
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.has(-1)).toBe(false);
        expect(avlTree.has(11)).toBe(false);
        expect(avlTree.has(6)).toBe(false);
      });

      it('should return true if there are multiple nodes with the same value matching the given value', () => {
        const avlTree = new AVLTree((a, b) => a - b);
        const values = [2, 2, 2, 1, 3, 5, 4, 7, 9, 8, 0];
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.has(2)).toBe(true);
        expect(avlTree.has(1)).toBe(true);
      });
    });

    describe('with an object comparator function', () => {
      const values = [
        { val: 2 },
        { val: 1 },
        { val: 3 },
        { val: 5 },
        { val: 4 },
        { val: 7 },
        { val: 9 },
        { val: 8 },
        { val: 0 },
      ];
      const avlTree = new AVLTree((a, b) => a.val - b.val);
      initializeTree(avlTree, values);
      checkTreeBalance(avlTree.root);

      it('should return true if the tree contains the given value', () => {
        values.forEach((value) => {
          expect(avlTree.has(value)).toBe(true);
        });
      });

      it("should return false if the tree doesn't contain the given value", () => {
        expect(avlTree.has({ val: -1 })).toBe(false);
        expect(avlTree.has({ val: 11 })).toBe(false);
        expect(avlTree.has(1)).toBe(false);
        expect(avlTree.has(2)).toBe(false);
      });

      it('should return true if there are multiple nodes with the same value matching the given value', () => {
        const values = [
          { val: 2 },
          { val: 1 },
          { val: 3 },
          { val: 0 },
          { val: 0 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        checkTreeBalance(avlTree.root);

        values.forEach((value) => {
          expect(avlTree.has(value)).toBe(true);
        });
      });
    });
  });

  describe('remove', () => {
    describe('with a simple comparator function', () => {
      it('should remove the node with the given value', () => {
        const values = [2, 1, 3, 5, 4, 6, 7, 0, 9, 8];
        const avlTree = new AVLTree();
        initializeTree(avlTree, values);
        checkTreeBalance(avlTree.root);
        expect(avlTree.has(2)).toBe(true);

        avlTree.remove(2);
        expect(avlTree.has(2)).toBe(false);
        checkTreeBalance(avlTree.root);
      });

      it('should remove one occurance of the given value if there are multiple matching values', () => {
        const values = [2, 2, 5, 4, 6, 7, 8, 9];
        const avlTree = new AVLTree();
        initializeTree(avlTree, values);
        checkTreeBalance(avlTree.root);
        expect(avlTree.has(2)).toBe(true);

        avlTree.remove(2);
        expect(avlTree.has(2)).toBe(true);
        checkTreeBalance(avlTree.root);
        avlTree.remove(2);
        expect(avlTree.has(2)).toBe(false);
        checkTreeBalance(avlTree.root);
      });
    });

    describe('with an object comparator function', () => {
      it('should remove the node with the given value', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
          { val: 1 },
          { val: 2 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        checkTreeBalance(avlTree.root);
        expect(avlTree.has({ val: 4 })).toBe(true);

        avlTree.remove({ val: 4 });
        expect(avlTree.has({ val: 4 })).toBe(false);
        checkTreeBalance(avlTree.root);
      });

      it('should remove one occurance of the given value if there are multiple matching values', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
          { val: 1 },
          { val: 2 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        checkTreeBalance(avlTree.root);
        expect(avlTree.has({ val: 7 })).toBe(true);

        avlTree.remove({ val: 7 });
        expect(avlTree.has({ val: 7 })).toBe(true);
        checkTreeBalance(avlTree.root);
        avlTree.remove({ val: 7 });
        expect(avlTree.has({ val: 7 })).toBe(false);
        checkTreeBalance(avlTree.root);
      });
    });
  });

  describe('getKthLargestNode', () => {
    it('should return null if k is smaller than or equal to 0', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4, 6, 7, 8, 9, 10]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthLargestNode(0)).toBeNull();
      expect(avlTree.getKthLargestNode(-1)).toBeNull();
      expect(avlTree.getKthLargestNode(-2)).toBeNull();
    });

    it('should return null if k is larger than the size of the tree', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthLargestNode(6)).toBeNull();
      expect(avlTree.getKthLargestNode(7)).toBeNull();
      expect(avlTree.getKthLargestNode(8)).toBeNull();
    });

    describe('with a simple comparator function', () => {
      it('should return the correct node in sorted order', () => {
        const values = [2, 1, 3, 5, 4, 7, 9, 8, 10];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => b - a);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthLargestNode = avlTree.getKthLargestNode(i);
          expect(kthLargestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthLargestNode.val).toBe(values[i - 1]);
        }
      });

      it('should return the correct node in sorted order if there is multiple of the same value', () => {
        const values = [2, 2, 3, 5, 4, 6, 9, 8, 11];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => b - a);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthLargestNode = avlTree.getKthLargestNode(i);
          expect(kthLargestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthLargestNode.val).toBe(values[i - 1]);
        }
      });
    });

    describe('with an object comparator function', () => {
      it('should return the correct node in sorted order', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
          { val: 1 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => b.val - a.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthLargestNode = avlTree.getKthLargestNode(i);
          expect(kthLargestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthLargestNode.val).toEqual(values[i - 1]);
        }
      });

      it('should return the correct node in sorted order if there is multiple of the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => b.val - a.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthLargestNode = avlTree.getKthLargestNode(i);
          expect(kthLargestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthLargestNode.val).toEqual(values[i - 1]);
        }
      });
    });
  });

  describe('getKthLargest', () => {
    it('should return null if k is smaller than or equal to 0', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4, 9, 8, 7, 12, 10, 16]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthLargest(0)).toBeNull();
      expect(avlTree.getKthLargest(-1)).toBeNull();
      expect(avlTree.getKthLargest(-2)).toBeNull();
    });

    it('should return null if k is larger than the size of the tree', () => {
      const avlTree = new AVLTree([2, 1, 3]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthLargest(4)).toBeNull();
      expect(avlTree.getKthLargest(5)).toBeNull();
      expect(avlTree.getKthLargest(6)).toBeNull();
    });

    describe('with a simple comparator function', () => {
      it('should return the correct node value in sorted order', () => {
        const values = [2, 1, 3, 5, 4, 10, 17, 8, 9];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => b - a);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthLargest(i)).toBe(values[i - 1]);
        }
      });

      it('should return the correct node value in sorted order if there is multiple of the same value', () => {
        const values = [2, 2, 3, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => b - a);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthLargest(i)).toBe(values[i - 1]);
        }
      });
    });

    describe('with an object comparator function', () => {
      it('should return the correct node value in sorted order', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => b.val - a.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthLargest(i)).toEqual(values[i - 1]);
        }
      });

      it('should return the correct node value in sorted order if there is multiple of the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => b.val - a.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthLargest(i)).toEqual(values[i - 1]);
        }
      });
    });
  });

  describe('getKthSmallestNode', () => {
    it('should return null if k is smaller than or equal to 0', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthSmallestNode(0)).toBeNull();
      expect(avlTree.getKthSmallestNode(-1)).toBeNull();
      expect(avlTree.getKthSmallestNode(-2)).toBeNull();
    });

    it('should return null if k is larger than the size of the tree', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthSmallestNode(6)).toBeNull();
      expect(avlTree.getKthSmallestNode(7)).toBeNull();
      expect(avlTree.getKthSmallestNode(8)).toBeNull();
    });

    describe('with a simple comparator function', () => {
      it('should return the correct node in sorted order', () => {
        const values = [2, 1, 3, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => a - b);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthSmallestNode = avlTree.getKthSmallestNode(i);
          expect(kthSmallestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthSmallestNode.val).toBe(values[i - 1]);
        }
      });

      it('should return the correct node in sorted order if there is multiple of the same value', () => {
        const values = [2, 2, 3, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => a - b);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthSmallestNode = avlTree.getKthSmallestNode(i);
          expect(kthSmallestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthSmallestNode.val).toBe(values[i - 1]);
        }
      });
    });

    describe('with an object comparator function', () => {
      it('should return the correct node in sorted order', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => a.val - b.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthSmallestNode = avlTree.getKthSmallestNode(i);
          expect(kthSmallestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthSmallestNode.val).toEqual(values[i - 1]);
        }
      });

      it('should return the correct node in sorted order if there is multiple of the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => a.val - b.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          const kthSmallestNode = avlTree.getKthSmallestNode(i);
          expect(kthSmallestNode).toBeInstanceOf(AVLTreeNode);
          expect(kthSmallestNode.val).toEqual(values[i - 1]);
        }
      });
    });
  });

  describe('getKthSmallest', () => {
    it('should return null if k is smaller than or equal to 0', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthSmallest(0)).toBeNull();
      expect(avlTree.getKthSmallest(-1)).toBeNull();
      expect(avlTree.getKthSmallest(-2)).toBeNull();
    });

    it('should return null if k is larger than the size of the tree', () => {
      const avlTree = new AVLTree([2, 1, 3, 5, 4]);

      checkTreeBalance(avlTree.root);
      expect(avlTree.getKthSmallest(6)).toBeNull();
      expect(avlTree.getKthSmallest(7)).toBeNull();
      expect(avlTree.getKthSmallest(8)).toBeNull();
    });

    describe('with a simple comparator function', () => {
      it('should return the correct node value in sorted order', () => {
        const values = [2, 1, 3, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => a - b);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthSmallest(i)).toBe(values[i - 1]);
        }
      });

      it('should return the correct node value in sorted order if there is multiple of the same value', () => {
        const values = [2, 2, 3, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);
        values.sort((a, b) => a - b);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthSmallest(i)).toBe(values[i - 1]);
        }
      });
    });

    describe('with an object comparator function', () => {
      it('should return the correct node value in sorted order', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => a.val - b.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthSmallest(i)).toEqual(values[i - 1]);
        }
      });

      it('should return the correct node value in sorted order if there is multiple of the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);
        values.sort((a, b) => a.val - b.val);

        checkTreeBalance(avlTree.root);
        for (let i = 1; i <= values.length; i++) {
          expect(avlTree.getKthSmallest(i)).toEqual(values[i - 1]);
        }
      });
    });
  });

  describe('lowerBoundNode', () => {
    describe('with a simple comparator function', () => {
      it('should return the leftmost/smallest node where the node value >= the given value based on the comparator function', () => {
        const values = [2, 1, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        let lowerBoundNode = avlTree.lowerBoundNode(3);
        expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(lowerBoundNode.val).toBe(4);

        lowerBoundNode = avlTree.lowerBoundNode(0);
        expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(lowerBoundNode.val).toBe(1);

        // Lower bound node should return the matching value if it exists
        for (let value of values) {
          const lowerBoundNode = avlTree.lowerBoundNode(value);
          expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(lowerBoundNode.val).toBe(value);
        }
      });

      it('should return the leftmost/smallest node where the node value >= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [2, 2, 3, 5];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        const lowerBoundNode = avlTree.lowerBoundNode(4);
        expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(lowerBoundNode.val).toBe(5);

        // Lower bound node should return the matching value if it exists
        for (let value of values) {
          const lowerBoundNode = avlTree.lowerBoundNode(value);
          expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(lowerBoundNode.val).toBe(value);
        }
      });

      it('should return null if there are no nodes with greater values', () => {
        const values = [2, 1, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBoundNode(6)).toBeNull();
      });
    });

    describe('with an object comparator function', () => {
      it('should return the leftmost/smallest node where the node value >= the given value based on the comparator function', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        let lowerBoundNode = avlTree.lowerBoundNode({ val: 2 });
        expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(lowerBoundNode.val).toEqual({ val: 4 });

        lowerBoundNode = avlTree.lowerBoundNode({ val: -1 });
        expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(lowerBoundNode.val).toEqual({ val: 0 });

        // Lower bound node should return the matching value if it exists
        for (let value of values) {
          const lowerBoundNode = avlTree.lowerBoundNode(value);
          expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(lowerBoundNode.val).toEqual(value);
        }
      });

      it('should return the leftmost/smallest node where the node value >= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        const lowerBoundNode = avlTree.lowerBoundNode({ val: 5 });
        expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(lowerBoundNode.val).toEqual({ val: 7 });

        // Lower bound node should return the matching value if it exists
        for (let value of values) {
          const lowerBoundNode = avlTree.lowerBoundNode(value);
          expect(lowerBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(lowerBoundNode.val).toEqual(value);
        }
      });

      it('should return null if there are no nodes with greater values', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBoundNode({ val: 10 })).toBeNull();
      });
    });
  });

  describe('lowerBound', () => {
    describe('with a simple comparator function', () => {
      it('should return the leftmost/smallest value >= the given value based on the comparator function', () => {
        const values = [2, 1, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBound(3)).toBe(4);
        expect(avlTree.lowerBound(0)).toBe(1);

        // Lower bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.lowerBound(value)).toBe(value);
        }
      });

      it('should return the leftmost/smallest value >= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [2, 2, 3, 5];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBound(4)).toBe(5);

        // Lower bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.lowerBound(value)).toBe(value);
        }
      });

      it('should return null if there are no greater values', () => {
        const values = [2, 1, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBound(7)).toBe(null);
      });
    });

    describe('with an object comparator function', () => {
      it('should return the leftmost/smallest value >= the given value based on the comparator function', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBound({ val: 2 })).toEqual({ val: 4 });
        expect(avlTree.lowerBound({ val: -1 })).toEqual({ val: 0 });

        // Lower bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.lowerBound(value)).toEqual(value);
        }
      });

      it('should return the leftmost/smallest value >= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBound({ val: 5 })).toEqual({ val: 7 });

        // Lower bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.lowerBound(value)).toEqual(value);
        }
      });

      it('should return null if there are no nodes with greater values', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.lowerBound({ val: 10 })).toBeNull();
      });
    });
  });

  describe('upperBoundNode', () => {
    describe('with a simple comparator function', () => {
      it('should return the rightmost/biggest node where the node value <= the given value based on the comparator function', () => {
        const values = [2, 1, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        let upperBoundNode = avlTree.upperBoundNode(3);
        expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(upperBoundNode.val).toBe(2);

        upperBoundNode = avlTree.upperBoundNode(6);
        expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(upperBoundNode.val).toBe(5);

        // Upper bound node should return the matching value if it exists
        for (let value of values) {
          const upperBoundNode = avlTree.upperBoundNode(value);
          expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(upperBoundNode.val).toBe(value);
        }
      });

      it('should return the rightmost/biggest node where the node value <= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [2, 2, 3, 5, 7];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        const upperBoundNode = avlTree.upperBoundNode(4);
        expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(upperBoundNode.val).toBe(3);

        // Upper bound node should return the matching value if it exists
        for (let value of values) {
          const upperBoundNode = avlTree.upperBoundNode(value);
          expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(upperBoundNode.val).toBe(value);
        }
      });

      it('should return null if there are no nodes with smaller values', () => {
        const values = [2, 1, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBoundNode(0)).toBeNull();
      });
    });

    describe('with an object comparator function', () => {
      it('should return the rightmost/biggest node where the node value <= the given value based on the comparator function', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        let upperBoundNode = avlTree.upperBoundNode({ val: 2 });
        expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(upperBoundNode.val).toEqual({ val: 0 });

        upperBoundNode = avlTree.upperBoundNode({ val: 100 });
        expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(upperBoundNode.val).toEqual({ val: 9 });

        // Upper bound node should return the matching value if it exists
        for (let value of values) {
          const upperBoundNode = avlTree.upperBoundNode(value);
          expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(upperBoundNode.val).toEqual(value);
        }
      });

      it('should return the rightmost/biggest node where the node value <= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 10 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        const upperBoundNode = avlTree.upperBoundNode({ val: 8 });
        expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
        expect(upperBoundNode.val).toEqual({ val: 7 });

        // Upper bound node should return the matching value if it exists
        for (let value of values) {
          const upperBoundNode = avlTree.upperBoundNode(value);
          expect(upperBoundNode).toBeInstanceOf(AVLTreeNode);
          expect(upperBoundNode.val).toEqual(value);
        }
      });

      it('should return null if there are no nodes with greater values', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 3 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBoundNode({ val: 2 })).toBeNull();
      });
    });
  });

  describe('upperBound', () => {
    describe('with a simple comparator function', () => {
      it('should return the rightmost/biggest value <= the given value based on the comparator function', () => {
        const values = [2, 1, 5, 4, 3, 7];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBound(6)).toBe(5);
        expect(avlTree.upperBound(8)).toBe(7);

        // Upper bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.upperBound(value)).toBe(value);
        }
      });

      it('should return the rightmost/biggest value <= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [2, 2, 2, 3, 5];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBound(4)).toBe(3);

        // Upper bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.upperBound(value)).toBe(value);
        }
      });

      it('should return null if there are no smaller values', () => {
        const values = [2, 3, 5, 4];
        const avlTree = new AVLTree((a, b) => a - b);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBound(1)).toBe(null);
      });
    });

    describe('with an object comparator function', () => {
      it('should return the rightmost/biggest value <= the given value based on the comparator function', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBound({ val: 2 })).toEqual({ val: 0 });
        expect(avlTree.upperBound({ val: 10 })).toEqual({ val: 9 });

        // Upper bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.upperBound(value)).toEqual(value);
        }
      });

      it('should return the rightmost/biggest value <= the given value based on the comparator function if there are multiple nodes with the same value', () => {
        const values = [
          { val: 7 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 0 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBound({ val: 5 })).toEqual({ val: 0 });

        // Upper bound should return the matching value if it exists
        for (let value of values) {
          expect(avlTree.upperBound(value)).toEqual(value);
        }
      });

      it('should return null if there are no nodes with smaller values', () => {
        const values = [
          { val: 4 },
          { val: 7 },
          { val: 9 },
          { val: 8 },
          { val: 2 },
        ];
        const avlTree = new AVLTree((a, b) => a.val - b.val);
        initializeTree(avlTree, values);

        checkTreeBalance(avlTree.root);
        expect(avlTree.upperBound({ val: 1 })).toBeNull();
      });
    });
  });
});
