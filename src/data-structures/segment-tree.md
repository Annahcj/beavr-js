# Segment Tree
A segment tree is a tree structure used for efficient updates and range queries.  
An update to one index and a range query both take `O(log(n))` time complexity.   

The tree size is `n * 2` and starts at index `1`, meaning that each node's left child is at index `i * 2`, and the right child at index `i * 2 + 1`.

Three types of trees are supported:
- Sum
- Max
- Min

## Usage

### Initialization
Initialize an empty tree.
Can also call the build function to initialize the values.
```
const segmentTree = new SegmentTree();
segmentTree.build([1, 2, 3, 4, 5]);
```

Initialize with values.
```
const segmentTree = new SegmentTree([1, 2, 3, 4, 5]);
```

### update
Updates the value at the given index.   
The leaf node is updated first, then iteratively traverses each parent node to update the range values.   
If the given index is smaller than 0 or larger than the size of the tree, an error will be thrown.   

Time Complexity: `O(log(n))`
```
// Replaces the value at index 0 with 5
segmentTree.update(0, 5);
```

### queryRange
Returns the query result based on the tree type (sum, max, or min).    
Sum: Returns the sum of values in the range [left, right].    
Max: Returns the maximum value in the range [left, right].   
Min: Returns the minimum value in the range [left, right].   

If the range goes out of bounds (< 0 or >= size of the tree), the indices will be adjusted back to 0 or this.size - 1.

Time Complexity: `O(log(n))`
```
segmentTree.queryRange(0, 5);
```