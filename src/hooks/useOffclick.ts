// Modified from Gemini
import { useEffect, RefObject } from 'react';

interface OffclickOptions {
    /** Should propagation of events on this element be stopped? */
    stopPropagation?: boolean;
}

type UseOffclickProps = {
    ref: RefObject<HTMLElement | null>;
    callback: () => void;
    options?: OffclickOptions;
};

/** Hook that alerts clicks outside of the passed ref */
export function useOffclick({ ref, callback, options = { stopPropagation: false } }: UseOffclickProps): void {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            // 1. Check if we clicked outside the element
            if(ref.current && !ref.current.contains(event.target as Node)) {
                // 2. Execute the callback
                callback();

                // 3. Stop propagation if the prop is enabled
                // This prevents other document listeners from seeing this specific click
                if(options.stopPropagation) {
                    event.stopPropagation();
                }
            }
        };

        // Attach to document (bubbling phase)
        // mousedown is usually better than 'click' to catch the interaction immediately
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            // Clean up the listeners when the component unmounts or dependencies change
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, callback, options.stopPropagation]);
}
