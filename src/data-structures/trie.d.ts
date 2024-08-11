export class TrieNode {
  char: string;
  children: Record<string, TrieNode>;
  wordCount: number;
}

export type TrieOptions = {
  words?: string[];
  storeDuplicates?: boolean;
};

export class Trie {
  constructor(options?: TrieOptions);
  private root: TrieNode;
  private storeDuplicates: boolean;
  add(word: string);
  remove(word: string): boolean;
  removeAll(word: string): boolean;
  has(word: string): boolean;
  getNodeMatchingPrefix(prefix: string): TrieNode | null;
  findAll(prefix: string, distinct?: boolean): string[];
}
