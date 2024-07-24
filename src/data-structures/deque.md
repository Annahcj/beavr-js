# Deque

A deque, or double-ended queue, is a data structure that stores elements sequentially, but supports insertions and removals from both ends.  
All insertion and removal operations are constant time operations as a doubly linked list is used under the hood.

## Usage

### Initialization

```
const deque = new Deque();
```

### push

Adds the given value to the end of the deque.

```
deque.push(5);
```

### pushLeft

Adds the given value to the start of the deque.

```
deque.pushLeft(5);
```

### pop

Removes the element at the end of the deque and returns the value.  
Returns null if there are no elements.

```
const removedValue = deque.pop();
```

### popLeft

Removes the element at the start of the deque and returns the value.  
Returns null if there are no elements.

```
const removedValue = deque.popLeft();
```

### front

Returns the first element of the deque.

```
const firstValue = deque.front();
```

### back

Returns the last element of the deque.

```
const lastValue = deque.back();
```

### isEmpty

Returns true if the deque is empty, false if not.

```
const dequeIsEmpty = deque.isEmpty();
```

### size

Returns the size of the deque.

```
const dequeSize = deque.size();
```

### toArray

Returns the elements of the deque converted to an array.

```
const values = deque.toArray();
```
