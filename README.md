# Use Mutation Observer

Have you ever wanted to use a mutation observer inside react? Me neither. Here's a hook.

## Example

```
import React, { useState, useRef } from 'react';
import useMutationObserver from './use-mutation-observer';

const App = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useMutationObserver(countRef, console.log);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <p ref={countRef}>
        {count}
      </p>
    </div>
  );
};
```

## API

This package exposes one function, `useMutationObserver`, which runs a callback whenever a target element changes, passed in as a react ref.

By default, any change to the target element fires the callback. You can opt to pass in `MutationObserverInit` configuration options as the third argument as needed.

Also returns the current `MutationObserver` if needed.

I'm pretty sure I nailed this.

```
useMutationObserver?: (
  ref: React.RefObject<any>,
  cb: MutationCallback,
  config: MutationObserverInit = DEFAULT_CONFIG
) => MutationObserver

DEFAULT_CONFIG = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true
};
```
