# Trie
A trie is a tree-based data structure used for efficiently storing and retrieving strings.   
Tries are particuarly efficient for auto-complete features, or finding matches based on a prefix.   

## Usage

### Initialization
Without any options - `storeDuplicates` defaults to `false`.
```
const trie = new Trie();
```

Pass options to the constructor to set
- `words`: The initial words of the trie
- `storeDuplicates`: A boolean flag that determines whether duplicate occurances of words are stored
```
const trie = new Trie({ words: ['foo', 'bar'], storeDuplicates: true });
```

### add
Inserts the given word into the trie. 
  
Time Complexity: `O(n)`   
```
trie.add('foo');
```

### remove
Removes one occurance of the word from the trie and returns `true` if one occurance is removed.    
Returns `false` if the word doesn't exist in the trie. 

Time Complexity: `O(n)`
```
const removed = trie.remove('foo');
```

### removeAll
Removes all occurances of the word from the trie and returns `true` if all occurances are removed.   
Returns `false` if the word doesn't exist in the trie.    

Time Complexity: `O(n)`
```
const removed = this.removeAll('foo');
```

### has
Returns a boolean indicating if the trie contains the word.

Time Complexity: `O(n)` 
```
const containsWord = trie.has('bar');
```

### getNodeMatchingPrefix
Finds the node matching the given prefix (returns the node at the last letter).   
Returns null if there are no matches.   
This is useful when traversing the trie for a word letter-by-letter.   

Time Complexity: `O(n)`
```
const lastNode = trie.getNodeMatchingPrefix('trie');
```

### findAll
Returns an array of all words matching the prefix.   
Takes in a boolean flag `distinct` which determines whether duplicate words should be returned.   
`distinct` is set to `true` by default, and is irrelevant if the trie already has `storeDuplicates` set to `false`.   

Time Complexity: `O(m)`, `m = number of nodes in the trie`
```
const matches = trie.findAll('data');
const distinctMatches = trie.findAll('data', true);
const allMatches = trie.findAll('data', false);
```