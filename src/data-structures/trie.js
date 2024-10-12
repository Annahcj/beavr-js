class TrieNode {
  /**
   * @param {string} char
   */
  constructor(char) {
    this.char = char;
    this.children = {};
    this.wordCount = 0;
  }
}

class Trie {
  /**
   * Stores duplicate words if `storeDuplicates` is `true`, otherwise only stores distinct words.
   * Options:
   * - words?: string[] Initial words
   * - storeDuplicates?: boolean (defaults to false)
   * @param {{words?: string[]; storeDuplicates?: boolean}} options
   */
  constructor(options) {
    const words = options?.words ?? [];
    const storeDuplicates = options?.storeDuplicates ?? false;

    this.root = new TrieNode(null);
    this.storeDuplicates = storeDuplicates;

    if (words && words.length > 0) {
      for (const word of words) {
        this.add(word);
      }
    }
  }
  /**
   * Inserts the word into the tree.
   * Time Complexity: O(n)
   * @param {string} word
   */
  add(word) {
    let node = this.root;
    for (const char of word) {
      node = node.children;
      if (!node[char]) {
        node[char] = new TrieNode(char);
      }
      node = node[char];
    }
    if (this.storeDuplicates) {
      node.wordCount++;
    } else {
      node.wordCount = 1;
    }
  }
  /**
   * Removes one occurance of the word from the tree.
   * Time Complexity: O(n)
   * @param {string} word
   * @returns {boolean}
   */
  remove(word) {
    const lastNode = this.getNodeMatchingPrefix(word);
    if (!lastNode || lastNode.wordCount === 0) {
      return false;
    }
    lastNode.wordCount--;
    return true;
  }
  /**
   * Removes all occurances of the word from the tree.
   * Time Complexity: O(n)
   * @param {string} word
   * @returns {boolean}
   */
  removeAll(word) {
    const lastNode = this.getNodeMatchingPrefix(word);
    if (!lastNode || lastNode.wordCount === 0) {
      return false;
    }
    lastNode.wordCount = 0;
    return true;
  }
  /**
   * Checks if the tree contains the word.
   * Time Complexity: O(n)
   * @param {string} word
   * @returns {boolean}
   */
  has(word) {
    const lastNode = this.getNodeMatchingPrefix(word);
    return !!(lastNode && lastNode.wordCount > 0);
  }
  /**
   * Finds the node matching the given prefix. Returns null if there are no matches.
   * Time Complexity: O(n)
   * @param {string} prefix
   * @returns {TrieNode | null}
   */
  getNodeMatchingPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      node = node.children;
      if (!node[char]) {
        return null;
      }
      node = node[char];
    }
    return node;
  }
  /**
   * Returns an array of all words matching the prefix.
   * If `distinct` is true, duplicates are not returned.
   * Time Complexity: O(m), m = number of nodes in the trie
   * @param {string} prefix
   * @param {boolean} distinct defaults to true
   * @returns {string[]}
   */
  findAll(prefix, distinct = true) {
    let node = this.getNodeMatchingPrefix(prefix);
    if (!node) {
      return [];
    }
    let words = [];
    recurse(node, prefix);
    return words;

    function recurse(node, word) {
      if (node.wordCount > 0) {
        if (distinct) {
          words.push(word);
        } else {
          for (let i = 0; i < node.wordCount; i++) {
            words.push(word);
          }
        }
      }
      for (const char in node.children) {
        recurse(node.children[char], word + char);
      }
    }
  }
}

exports.Trie = Trie;
exports.TrieNode = TrieNode;