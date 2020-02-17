import { useEffect, useState } from 'react';
const debug = require('debug')('use-mutation-observer');

type MaybeMutationObserver = MutationObserver | null;

const DEFAULT_CONFIG = {
	attributes: true,
	childList: true,
	subtree: true,
	characterData: true
};

export default function useMutationObserver(
	ref: React.RefObject<any>,
	cb: MutationCallback,
	config: MutationObserverInit = DEFAULT_CONFIG
) {
	const [observerState, setObserverState] = useState(
		null as MaybeMutationObserver
	);

	useEffect(() => {
		debug('running effect');

		if (!ref.current) return;

		const observer = new MutationObserver(cb);

		observer.observe(ref.current, config);

		setObserverState(observer);

		return function cleanup() {
			debug('clean up');
			observer.disconnect();
		};
	}, [ref, cb, config]);

	return observerState;
}
