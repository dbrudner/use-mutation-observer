import React, { useRef, useState } from 'react';
import useMutationObserver from './use-mutation-observer';

const App = ({ cb = console.log }: any) => {
	const [count, setCount] = useState(0);
	const countRef = useRef(null);

	useMutationObserver(countRef, cb);

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>Add</button>
			<p ref={countRef}>{count}</p>
		</div>
	);
};

export default App;
