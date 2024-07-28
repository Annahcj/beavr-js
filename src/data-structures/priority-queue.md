# Priority Queue

A priority queue, or heap, is a binary tree structure that stores elements ordered by priority based on the comparator function given during initialization.   
Adding a new element to the priority queue is an O(log(n)) operation, and removing the top element from the queue is also O(log(n)).  

An array is used to simulate the binary tree, as children nodes can be accessed at indexes `i * 2 + 1` and `i * 2 + 1`.

## Usage

### Initialization

Pass in a comparator to determine the ordering of the priority queue.
```
const priorityQueue = new PriorityQueue((a, b) => a - b);
```

Builds a valid heap if initial values are passed in.   
Time Complexity: O(n)
```
const priorityQueue = new PriorityQueue((a, b) => a - b, [1, 2, 3, 4, 5]);
```

### add

Adds the given value to the heap.   
1. Pushes the new value to the end of the array.
2. Heapifies up from the last index to maintain a valid heap.   

Time Complexity: O(log(n))

```
priorityQueue.add(5);
```

### remove

Removes the element at the top of the heap and returns the removed value.   
1. Swaps the first and last elements of the array.   
2. Removes the last element of the array.   
3. Heapifies the top element down to maintain a valid heap.

Time Complexity: O(log(n))

```
const removedValue = priorityQueue.remove();
```

### top

Returns the value at the top of the heap.   

Time Complexity: O(1)

```
const topValue = priorityQueue.top();
```

### isEmpty

Returns true if the heap is empty, false if not.

```
const priorityQueueIsEmpty = priorityQueue.isEmpty();
```

### heapifyUp

A private helper function to heapify/bubble up starting from the given index.   
Swaps the parent and current element until the comparator functions returns a number larger than 0.

### heapifyDown

A private helper function to heapify/bubble down starting from the given index.   
Swaps the current element with either the left or right child element while either one returns > 0 in the comparator function.   
If both left and right children need to be swapped, the two children are compared and the one with the smaller value based on the comparator will be swapped with the current element.   
