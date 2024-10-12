class AVLTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.size = 1; // number of nodes in tree rooted at this node
  }
}

class AVLTree {
  constructor(comparator = (a, b) => a - b) {
    this.root = null;
    this.comparator = comparator;
  }

  /**
   * Finds the node with the given value.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {AVLTreeNode | null}
   */
  find(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node.val);
    if (comparedResult === 0) return node;
    if (comparedResult < 0) {
      return this.find(val, node.left);
    } else {
      return this.find(val, node.right);
    }
  }

  /**
   * Returns true if the tree contains the given value, otherwise returns false.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {boolean}
   */
  has(val) {
    const node = this.find(val);
    return !!node;
  }

  /**
   * Inserts a node with the given value into the tree.
   * Returns the root of the tree.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {AVLTreeNode}
   */
  insert(val) {
    return (this.root = this._insert(val, this.root));
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);

    const comparedResult = this.comparator(val, node.val);
    if (comparedResult < 0) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

    return this._rebalance(node);
  }

  /**
   * Removes the node with the given value from the tree.
   * If there are multiple nodes with the same value, then we remove any one node that matches.
   * Returns the root of the tree.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {AVLTreeNode | null}
   */
  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of nodes with the given value, pass in the reference of one occurance.
    const nodeToRemove = this.find(val, node);
    if (!nodeToRemove) {
      return this.root;
    }

    return (this.root = this._remove(val, nodeToRemove, node));
  }
  _remove(val, nodeToRemove, node) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node.val);
    if (comparedResult < 0) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (comparedResult > 0) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (comparedResult === 0 && node === nodeToRemove) {
      if (!node.left && !node.right) return null;
      if (!node.right) return node.left;
      if (!node.left) return node.right;

      // has both left and right children
      // inorder traversal on the right child to get the leftmost node
      // replace the node value with the leftmost node value and remove the leftmost node from the right subtree
      const leftmostNode = this._getLeftmost(node.right);
      node.val = leftmostNode.val;

      node.right = this._remove(
        leftmostNode.val,
        this.find(leftmostNode.val, node.right),
        node.right
      );
    } else {
      return node;
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

    return this._rebalance(node);
  }

  /**
   * Returns the kth (1-indexed) largest node in the tree.
   * Returns null if there are less than k nodes.
   * Time Complexity: O(log(n))
   * @param {number} k
   * @returns {AVLTreeNode | null}
   */
  getKthLargestNode(k) {
    let node = this.root;
    if (!node || node.size <= 0 || node.size < k) return null; // there is no kth element

    while (node) {
      let rightSize = node.right?.size ?? 0;
      if (k === rightSize + 1) return node;
      if (rightSize >= k) {
        node = node.right;
      } else {
        k -= rightSize + 1;
        node = node.left;
      }
    }
    return null;
  }

  /**
   * Returns the kth (1-indexed) largest value in the tree.
   * Returns null if there are less than k nodes.
   * Time Complexity: O(log(n))
   * @param {number} k
   * @returns {AVLTreeNode | null}
   */
  getKthLargest(k) {
    const kthLargest = this.getKthLargestNode(k);
    return kthLargest?.val ?? null;
  }

  /**
   * Returns the kth (1-indexed) smallest node in the tree.
   * Returns null if there are less than k nodes.
   * Time Complexity: O(log(n))
   * @param {number} k
   * @returns {AVLTreeNode | null}
   */
  getKthSmallestNode(k) {
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let leftSize = node.left?.size ?? 0;
      if (k === leftSize + 1) return node;
      if (leftSize >= k) {
        node = node.left;
      } else {
        k -= leftSize + 1;
        node = node.right;
      }
    }
    return null;
  }

  /**
   * Returns the kth (1-indexed) smallest value in the tree.
   * Returns null if there are less than k nodes.
   * Time Complexity: O(log(n))
   * @param {number} k
   * @returns {AVLTreeNode | null}
   */
  getKthSmallest(k) {
    const kthSmallest = this.getKthSmallestNode(k);
    return kthSmallest?.val ?? null;
  }

  /**
   * Returns the leftmost node where the node value >= the given value based on the comparator function.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {AVLTreeNode | null}
   */
  lowerBoundNode(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(node.val, val);
    if (comparedResult >= 0) {
      const res = this.lowerBoundNode(val, node.left);
      return res ? res : node;
    } else {
      return this.lowerBoundNode(val, node.right);
    }
  }

  /**
   * Returns the leftmost value where the node value >= the given value based on the comparator function.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {T | null}
   */
  lowerBound(val) {
    const lowerBoundNode = this.lowerBoundNode(val);
    return lowerBoundNode?.val ?? null;
  }

  /**
   * Returns the rightmost node where the node value <= the given value based on the comparator function.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {AVLTreeNode | null}
   */
  upperBoundNode(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(node.val, val);
    if (comparedResult <= 0) {
      const res = this.upperBoundNode(val, node.right);
      return res ? res : node;
    } else {
      return this.upperBoundNode(val, node.left);
    }
  }

  /**
   * Returns the rightmost value where the node value <= the given value based on the comparator function.
   * Time Complexity: O(log(n))
   * @param {T} val
   * @returns {T | null}
   */
  upperBound(val) {
    const upperBoundNode = this.upperBoundNode(val);
    return upperBoundNode?.val ?? null;
  }

  _getLeftmost(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  _getHeight(node = this.root) {
    return node ? node.height : 0;
  }

  _getSize(node = this.root) {
    return node ? node.size : 0;
  }

  _getBalance(node = this.root) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }

  _leftRotation(node) {
    let rightNode = node.right;
    let rightNodeLeftChild = rightNode.left;
    rightNode.left = node;
    node.right = rightNodeLeftChild;

    // node is now below rightNode and needs to be updated first
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height =
      1 +
      Math.max(
        this._getHeight(rightNode.left),
        this._getHeight(rightNode.right)
      );

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    rightNode.size =
      1 + this._getSize(rightNode.left) + this._getSize(rightNode.right);

    return rightNode; // right node is the new root
  }

  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height =
      1 +
      Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    leftNode.size =
      1 + this._getSize(leftNode.left) + this._getSize(leftNode.right);

    return leftNode; // left node is the new root
  }

  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) {
      // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) {
      // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) {
      // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) {
      // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}

exports.AVLTree = AVLTree;
exports.AVLTreeNode = AVLTreeNode;