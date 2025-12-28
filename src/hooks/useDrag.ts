// Modified from ChatGPT
import { useRef, useCallback } from 'react';

type DragCallbacks = {
    onDragStart?: (event: PointerEvent) => void;
    onDrag?: (event: PointerEvent, info: { dx: number; dy: number }) => void;
    onDragEnd?: (event: PointerEvent) => void;
};

type UseDragOptions = {
    /** Should propagation of events on this element be stopped? */
    stopPropagation?: boolean;
};

export function useDrag({ onDragStart, onDrag, onDragEnd }: DragCallbacks, options?: UseDragOptions) {
    const last = useRef<{ x: number; y: number } | null>(null);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        if(options?.stopPropagation) {
            e.stopPropagation();
        }

        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        // starting point
        last.current = { x: e.clientX, y: e.clientY };

        // fire start callback
        onDragStart?.(e.nativeEvent);

        const handleMove = (ev: PointerEvent) => {
            if(options?.stopPropagation) {
                ev.stopPropagation();
            }

            if (!last.current) return;

            const dx = ev.clientX - last.current.x;
            const dy = ev.clientY - last.current.y;

            last.current = { x: ev.clientX, y: ev.clientY };

            onDrag?.(ev, { dx, dy });
        };

        const handleUp = (ev: PointerEvent) => {
            if(options?.stopPropagation) {
                ev.stopPropagation();
            }

            last.current = null;

            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerup', handleUp);

            onDragEnd?.(ev);
        };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    }, [onDragStart, onDrag, onDragEnd]);

    return { onPointerDown };
}
