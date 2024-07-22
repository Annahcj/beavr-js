# Union Find
Union Find, or Disjoint Set Union, is used to find the connected components in a graph.   
It is used to:
- Connect two nodes 
- Find the parent/representative of the node


## Usage

### Initialization
Union find accepts a fixed size.  
Initially, all nodes are the parent of themselves.   
Throws an error if size <= 0.   
```
const uf = new UnionFind(5);
```

### Find
Finds the root, or parent, of the node by recursively traversing through each node's root until reaching the node whose root is itself.   
Throws an error if the given index is not a valid index (smaller than 0 or larger than or equal to the size)

Time Complexity: `O(⍺(N))`  

Uses path compression to optimize performance - as we traverse through each node connected to the root, set the root of each node to be directly the final root.   
This is to minimize the path length to the root:
```
Before: 1 -> 2 -> 3 -> 4
After: 
  1 
    \ 
  2 - 4
    / 
  3
```
```
// Finds the parent of the node at index 2.
const parent = uf.find(2);
```

### Union
Connects two nodes by assigning the root of one node to be the root of the other node.   

Time Complexity: `O(⍺(N))`   

Uses union by rank to optimize performance.   
Since path compression is also used, the rank needs to be the upper bound of the height of each node rather than the actual height.   

When connecting the two roots together, we assign the root with the smaller rank to the root with the greater rank.   
This is to keep the tree height as small as possible, to make it faster to find the root of a node (the longer the height it takes more steps to find a node).   
```
// Connects nodes 2 and 4
uf.union(2, 4);
```