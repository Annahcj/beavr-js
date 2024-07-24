# Queue
A queue is a data structure that stores elements sequentially in the FIFO (First In First Out) approach.   
Elements are added to the end of the queue, and removed from the start of the queue.   

Both operations are constant time operations as a linked list is used under the hood.   

## Usage
### Initialization
```
const queue = new Queue();
```

### enqueue
Adds the given value to the end of the queue.
```
queue.enqueue(5);
```

### dequeue
Removes the element at the start of the queue and returns the value.   
Returns null if there are no elements.   
```
const removedValue = queue.dequeue();
```

### front
Returns the first element of the queue.
```
const firstValue = queue.front();
```

### back
Returns the last element of the queue.
```
const lastValue = queue.back();
```

### isEmpty
Returns true if the queue is empty, false if not.
```
const queueIsEmpty = queue.isEmpty();
```

### size
Returns the size of the queue.
```
const queueSize = queue.size();
```

### toArray
Returns the elements of the queue converted to an array.
```
const values = queue.toArray();
```