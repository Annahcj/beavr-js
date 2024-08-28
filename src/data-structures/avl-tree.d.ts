export class AVLTreeNode<T> {
  constructor(val: T);
  val: T;
  left: AVLTreeNode<T> | null;
  right: AVLTreeNode<T> | null;
  height: number;
  size: number;
}

export class AVLTree<T> {
  constructor(comparator?: (a: T, b: T) => number);
  private root: AVLTreeNode<T> | null;
  private comparator: (a: T, b: T) => number;

  find(val: T): AVLTreeNode<T> | null;
  has(val: T): boolean;
  insert(val: T): AVLTreeNode<T>;
  remove(val: T, node?: AVLTreeNode<T>): AVLTreeNode<T> | null;
  getKthLargestNode(k: number): AVLTreeNode<T> | null;
  getKthLargest(k: number): T | null;
  getKthSmallestNode(k: number): AVLTreeNode<T> | null;
  getKthSmallest(k: number): T | null;
  lowerBoundNode(val: T, node?: AVLTreeNode<T>): AVLTreeNode<T> | null;
  lowerBound(val: T, node?: AVLTreeNode<T>): T | null;
  upperBoundNode(val: T, node?: AVLTreeNode<T>): AVLTreeNode<T> | null;
  upperBound(val: T, node?: AVLTreeNode<T>): T | null;

  private _insert(val: T, node: AVLTreeNode<T>): AVLTreeNode<T>;
  private _remove(
    val: T,
    nodeToRemove: AVLTreeNode<T>,
    node: AVLTreeNode<T>
  ): AVLTreeNode<T> | null;
  private _getLeftmost(node: AVLTreeNode<T>): AVLTreeNode<T>;
  private _getHeight(node?: AVLTreeNode<T>): number;
  private _getSize(node?: AVLTreeNode<T>): number;
  private _getBalance(node?: AVLTreeNode<T>): number;
  private _leftRotation(node: AVLTreeNode<T>): AVLTreeNode<T>;
  private _rightRotation(node: AVLTreeNode<T>): AVLTreeNode<T>;
  private _rebalance(node: AVLTreeNode<T>): AVLTreeNode<T>;
}
