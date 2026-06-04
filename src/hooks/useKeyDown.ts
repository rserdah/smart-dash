// Modified from Gemini
import { useEffect } from 'react';

interface UseKeydownOptions {
    key: string;
    callback: (event: KeyboardEvent) => void;
    enabled?: boolean;
}

export function useKeyDown({ key, callback, enabled = true }: UseKeydownOptions) {
    useEffect(() => {
        if(!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            // Best Practice 1: Use modern event.key instead of keyCode
            if(event.key === key) {
                callback(event);
            }
        };

        // Best Practice 2: Listen globally on the window object
        window.addEventListener('keydown', handleKeyDown);

        // Best Practice 3: Always clean up global listeners on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, callback, enabled]);
}
