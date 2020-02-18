"use strict";
exports.__esModule = true;
var react_1 = require("react");
var debug = require('debug')('use-mutation-observer');
var DEFAULT_CONFIG = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
};
function useMutationObserver(ref, cb, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var _a = react_1.useState(null), observerState = _a[0], setObserverState = _a[1];
    react_1.useEffect(function () {
        debug('running effect');
        if (!ref.current)
            return;
        var observer = new MutationObserver(cb);
        observer.observe(ref.current, config);
        setObserverState(observer);
        return function cleanup() {
            debug('clean up');
            observer.disconnect();
        };
    }, [ref, cb, config]);
    return observerState;
}
exports["default"] = useMutationObserver;
