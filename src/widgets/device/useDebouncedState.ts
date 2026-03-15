import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { DeviceState } from './useDevice';

export function useDebouncedState(callback: Function, state: DeviceState, setState: any, ms: number) {
    const [localState, setLocalState] = useState(state);

    useEffect(() => setLocalState(state), [state]);

    const debouncedSetState = useDebounce((x: any) => setState(x), ms);

    const callbackFn = useCallback((x: any) => {
        callback(x);

        setLocalState(x);
        debouncedSetState(x);
    }, [state, setState, setLocalState, debouncedSetState]);

    return [localState, callbackFn];
}
