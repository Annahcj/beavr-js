const { TrieNode } = require('../src/data-structures/trie');
const { Trie } = require('../src/data-structures/trie');

describe('Trie', () => {
  describe('when storeDuplicates is false', () => {
    describe('constructor', () => {
      it('should initialize the trie with initial words if passed into options', () => {
        const words = ['data', 'structure', 'trie'];
        const trie = new Trie({ words });
        for (let word of words) {
          expect(trie.has(word)).toBe(true);
        }
      });

      it('should default to storing distinct words if storeDuplicates is not passed in or is set to false', () => {
        const words = ['data', 'data', 'trie'];
        const trie = new Trie({ words });
        for (let word of words) {
          expect(trie.has(word)).toBe(true);
        }
        expect(trie.findAll('data', false)).toEqual(['data']);
      });
    });

    describe('add', () => {
      it("should add the word to the trie if the word doesn't already exist", () => {
        const trie = new Trie();
        expect(trie.has('trie')).toBe(false);
        trie.add('trie');
        expect(trie.has('trie')).toBe(true);
        expect(trie.findAll('trie')).toEqual(['trie']);
      });

      it('should not add the word to the trie if the word already exists', () => {
        const trie = new Trie({ words: ['trie'] });
        expect(trie.has('trie')).toBe(true);
        expect(trie.findAll('trie')).toEqual(['trie']);
        trie.add('trie');
        expect(trie.has('trie')).toBe(true);
        expect(trie.findAll('trie')).toEqual(['trie']);
      });
    });

    describe('remove', () => {
      it('should remove the word from the trie and return true', () => {
        const trie = new Trie({ words: ['trie'] });
        expect(trie.has('trie')).toBe(true);
        expect(trie.findAll('trie')).toEqual(['trie']);

        expect(trie.remove('trie')).toBe(true);
        expect(trie.has('trie')).toBe(false);
        expect(trie.findAll('trie')).toEqual([]);
      });

      it("should return false if the word doesn't exist in the trie", () => {
        const trie = new Trie({ words: ['trie'] });
        expect(trie.has('non-existent')).toBe(false);
        expect(trie.remove('non-existent')).toBe(false);
      });
    });

    describe('getNodeMatchingPrefix', () => {
      it('should return the last node completely matching the prefix, if the last node is the end of a word', () => {
        const trie = new Trie({ words: ['trie'] });
        expect(trie.has('trie')).toBe(true);

        const lastNode = trie.getNodeMatchingPrefix('trie');
        expect(lastNode.char).toBe('e');
        expect(lastNode.wordCount).toBe(1);
        expect(lastNode).toBeInstanceOf(TrieNode);
      });

      it('should return the last node completely matching the prefix, if the last node is not the end of a word', () => {
        const trie = new Trie({ words: ['trie'] });
        expect(trie.has('trie')).toBe(true);

        const lastNode = trie.getNodeMatchingPrefix('tri');
        expect(lastNode.char).toBe('i');
        expect(lastNode.wordCount).toBe(0);
        expect(typeof lastNode.children).toBe('object');
        expect(lastNode.children.e).toBeInstanceOf(TrieNode);
        expect(lastNode.children.e.wordCount).toBe(1);
      });

      it("should return null if there the prefix doesn't match any path in the trie", () => {
        const trie = new Trie({ words: ['trie'] });
        expect(trie.has('trie')).toBe(true);

        const lastNode = trie.getNodeMatchingPrefix('true');
        expect(lastNode).toBe(null);
      });
    });

    describe('findAll', () => {
      it('should return an array of all words matching the prefix', () => {
        const words = ['data', 'structure', 'structural', 'string'];
        const trie = new Trie({ words });

        const result = trie.findAll('str');
        expect(result.sort((a, b) => a.localeCompare(b))).toEqual(
          ['structure', 'structural', 'string'].sort((a, b) =>
            a.localeCompare(b)
          )
        );
      });

      it('should return an empty array if there are no words matching the prefix', () => {
        const words = ['data', 'structure', 'trie'];
        const trie = new Trie({ words });

        const result = trie.findAll('nonexistent');
        expect(result).toEqual([]);
      });
    });
  });

  describe('when storeDuplicates is true', () => {
    describe('constructor', () => {
      it('should initialize the trie with initial words including duplicates if storeDuplicates is set to true', () => {
        const words = ['data', 'data', 'trie'];
        const trie = new Trie({ words, storeDuplicates: true });
        for (let word of words) {
          expect(trie.has(word)).toBe(true);
        }
        expect(trie.findAll('data', false)).toEqual(['data', 'data']);
      });
    });

    describe('add', () => {
      it('should add an occurrence of the word to the trie if storeDuplicates is true', () => {
        const trie = new Trie({ storeDuplicates: true });
        trie.add('data');
        trie.add('data');

        const lastNode = trie.getNodeMatchingPrefix('data');
        expect(lastNode.wordCount).toBe(2);
        expect(trie.findAll('data', false)).toEqual(['data', 'data']);
      });
    });

    describe('remove', () => {
      it('should remove one occurrence of the word and return true if there is only one occurrence', () => {
        const trie = new Trie({ words: ['data'], storeDuplicates: true });
        expect(trie.has('data')).toBe(true);
        expect(trie.remove('data')).toBe(true);
        expect(trie.has('data')).toBe(false);
      });

      it('should remove one occurrence of the word and return true if there is more than one occurrence, but should still leave other occurrences', () => {
        const trie = new Trie({
          words: ['data', 'data'],
          storeDuplicates: true,
        });
        const lastNode = trie.getNodeMatchingPrefix('data');
        expect(lastNode.wordCount).toBe(2);
        expect(trie.findAll('data', false)).toEqual(['data', 'data']);
        expect(trie.remove('data')).toBe(true);
        expect(lastNode.wordCount).toBe(1);
        expect(trie.findAll('data', false)).toEqual(['data']);
      });

      it("should return false if the word doesn't exist", () => {
        const trie = new Trie({ storeDuplicates: true });
        expect(trie.remove('nonexistent')).toBe(false);
      });
    });

    describe('removeAll', () => {
      it('should remove all occurrences of the word and return true if there is only one occurrence', () => {
        const trie = new Trie({ words: ['data'], storeDuplicates: true });
        expect(trie.removeAll('data')).toBe(true);
        expect(trie.has('data')).toBe(false);
      });

      it('should remove all occurrences of the word and return true if there is more than one occurrence', () => {
        const trie = new Trie({
          words: ['trie', 'trie'],
          storeDuplicates: true,
        });
        expect(trie.removeAll('trie')).toBe(true);
        expect(trie.has('trie')).toBe(false);
      });

      it("should return false if the word doesn't exist", () => {
        const trie = new Trie({ storeDuplicates: true });
        expect(trie.removeAll('nonexistent')).toBe(false);
      });
    });

    describe('has', () => {
      it('should return true if the trie has one occurrence of the word', () => {
        const trie = new Trie({ words: ['data'], storeDuplicates: true });
        expect(trie.has('data')).toBe(true);
      });

      it('should return true if there is more than one occurrence of the word', () => {
        const trie = new Trie({
          words: ['data', 'data', 'structure'],
          storeDuplicates: true,
        });
        expect(trie.has('data')).toBe(true);
      });

      it('should return true if the word exists after adding to the trie', () => {
        const trie = new Trie({ storeDuplicates: true });
        expect(trie.has('beaver')).toBe(false);
        trie.add('beaver');
        expect(trie.has('beaver')).toBe(true);
      });
    });

    describe('getNodeMatchingPrefix', () => {
      it('should return the last node completely matching the prefix, if the last node is the end of a word', () => {
        const trie = new Trie({
          words: ['data', 'structure'],
          storeDuplicates: true,
        });
        const lastNode = trie.getNodeMatchingPrefix('data');
        expect(lastNode).toBeInstanceOf(TrieNode);
        expect(lastNode.wordCount).toBe(1);
        expect(lastNode.char).toBe('a');
      });

      it('should return the last node completely matching the prefix, if the last node is not the end of a word', () => {
        const trie = new Trie({
          words: ['data', 'structure'],
          storeDuplicates: true,
        });
        const lastNode = trie.getNodeMatchingPrefix('dat');
        expect(lastNode).toBeInstanceOf(TrieNode);
        expect(lastNode.wordCount).toBe(0);
        expect(lastNode.char).toBe('t');
        expect(lastNode.children.a.wordCount).toBe(1);
      });

      it("should return null if there the prefix doesn't match any path in the trie", () => {
        const trie = new Trie({
          words: ['data', 'structure'],
          storeDuplicates: true,
        });
        expect(trie.getNodeMatchingPrefix('abc')).toBe(null);
        expect(trie.getNodeMatchingPrefix('structures')).toBe(null);
        expect(trie.getNodeMatchingPrefix('dato')).toBe(null);
      });
    });

    describe('findAll', () => {
      it('should return an array of distinct words matching the prefix when distinct is set to true', () => {
        const trie = new Trie({
          words: [
            'beaver',
            'beaver',
            'beaver',
            'boat',
            'boat',
            'breakfast',
            'trie',
            'data',
          ],
          storeDuplicates: true,
        });
        const result = trie.findAll('b', true);

        expect(result.sort((a, b) => a.localeCompare(b))).toEqual(
          ['beaver', 'boat', 'breakfast'].sort((a, b) => a.localeCompare(b))
        );
      });

      it('should default to returning an array of distinct words matching the prefix when distinct is not passed in', () => {
        const trie = new Trie({
          words: [
            'beaver',
            'beaver',
            'beaver',
            'boat',
            'boat',
            'breakfast',
            'trie',
            'data',
          ],
          storeDuplicates: true,
        });
        const result = trie.findAll('b');

        expect(result.sort((a, b) => a.localeCompare(b))).toEqual(
          ['beaver', 'boat', 'breakfast'].sort((a, b) => a.localeCompare(b))
        );
      });

      it('should return an array of all words matching the prefix including duplicates when distinct is set to false', () => {
        const trie = new Trie({
          words: [
            'beaver',
            'beaver',
            'beaver',
            'boat',
            'boat',
            'breakfast',
            'trie',
            'data',
          ],
          storeDuplicates: true,
        });
        const result = trie.findAll('b', false);

        expect(result.sort((a, b) => a.localeCompare(b))).toEqual(
          ['beaver', 'beaver', 'beaver', 'boat', 'boat', 'breakfast'].sort(
            (a, b) => a.localeCompare(b)
          )
        );
      });

      it('should return an empty array if there are no words matching the prefix', () => {
        const trie = new Trie({
          words: [
            'beaver',
            'beaver',
            'beaver',
            'boat',
            'boat',
            'breakfast',
            'trie',
            'data',
          ],
          storeDuplicates: true,
        });
        const result = trie.findAll('a');
        expect(result).toEqual([]);
      });
    });
  });
});
