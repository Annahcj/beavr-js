# Singly Linked List
A singly linked list consists of a sequence of elements, each containing a value and a pointer to the next element in the sequence.  
A singly linked list may be used instead of a doubly linked list to save size, since each node in a doubly linked list also needs to keep a reference to the previous node.  
A linked list has constant time insertions from the head and tail, and constant time removal from the head.

## Usage

### Initialization

Initialize without any values
```
const linkedList = new LinkedList();
```

Initializes the list with the given values if passed in. The values can be of any type.  

Time Complexity: `O(values.length)`
```
const linkedList = new LinkedList([1, 2, 3, 4, 5]);
```

### addFirst

Creates a new node with the given value and inserts at the head.   

Time Complexity: `O(1)`
```
linkedList.addFirst(1);
```

### addLast

Creates a new node with the given value and inserts at the tail.  

Time Complexity: `O(1)`
```
linkedList.addLast(5);
```

### addAt

Creates a new node with the given value and inserts at the given index.  
All nodes to the right of and at the given index will be shifted right by one position.  
If the given index is the length of the array, the new node will be appended at the end of the list.  

Time Complexity: `O(index)`
```
// Adds new node with value 10 at index 0
linkedList.addAt(0, 10);
```

### addAll

Appends new nodes with the given values at the tail of the list.

Time Complexity: `O(values.length)`
```
linkedList.addAll([1, 2, 3, 4, 5]);
```

### removeHead

Removes the head and returns the removed value.

Time Complexity: `O(1)`
```
const removedValue = linkedList.removeHead();
```

### removeTail

Removes the tail and returns the removed value.

Time Complexity: `O(n)`
```
const removedValue = linkedList.removeTail();
```

### removeAt

Removes the node at the given index and returns the removed value.

Time Complexity: `O(index)`
```
const removedValue = linkedList.removeAt(2);
```

### getHead

Returns the value of the first node.   
Returns null if the list is empty.

Time Complexity: `O(1)`
```
const value = linkedList.getHead();
```

### getTail

Returns the value of the last node.   
Returns null if the list is empty.

Time Complexity: `O(1)`
```
const value = linkedList.getTail();
```

### getAt

Returns the value of the node at the given index.  
Returns null if there is no node at the given index.

Time Complexity: `O(index)`
```
const value = linkedList.getAt(3);
```

### isEmpty

Returns true if the list is empty, and false if there is at least one node.

Time Complexity: `O(1)`
```
const isEmpty = linkedList.isEmpty();
```

### toArray

Returns the values of the nodes in an array.

Time Complexity: `O(n)`
```
const values = linkedList.toArray();
```

### clone

Returns a new linked list with the same values and properties.

Time Complexity: `O(n)`
```
const clonedList = linkedList.clone();
```

### _getNodeAt

A helper function that returns the node at the given index.
Meant for internal use within the class.

Time Complexity: `O(index)`
```
const node = linkedList._getNodeAt();
```