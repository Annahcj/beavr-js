const { gcd } = require('./algorithms/gcd');
const { lcm } = require('./algorithms/lcm');
const { AVLTree } = require('./data-structures/avl-tree');
const { Deque } = require('./data-structures/deque');
const { DoublyLinkedList } = require('./data-structures/doubly-linked-list');
const { LinkedList } = require('./data-structures/linked-list');
const { PriorityQueue } = require('./data-structures/priority-queue');
const { Queue } = require('./data-structures/queue');
const {
  SegmentTree,
  SegmentTreeType,
} = require('./data-structures/segment-tree');
const { Trie } = require('./data-structures/trie');
const { UnionFind } = require('./data-structures/union-find');

module.exports = {
  AVLTree,
  Deque,
  DoublyLinkedList,
  LinkedList,
  PriorityQueue,
  Queue,
  SegmentTree,
  SegmentTreeType,
  Trie,
  UnionFind,
  gcd,
  lcm,
};
