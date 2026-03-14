import { useCallback, useEffect, useRef } from "react";

export function useDebounce(callback: Function, ms: number) {
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    return useCallback((...args: any) => {
        if(timeoutRef.current) { clearTimeout(timeoutRef.current); }

        timeoutRef.current = setTimeout(() => callback(...args), ms);
    }, [callback, ms]);
}
