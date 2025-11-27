// From ChatGPT
import { useRef, useCallback } from 'react';

export type DragCallbacks = {
    onDragStart?: (event: PointerEvent) => void;
    onDrag?: (event: PointerEvent, info: { dx: number; dy: number }) => void;
    onDragEnd?: (event: PointerEvent) => void;
};

export function useDrag({ onDragStart, onDrag, onDragEnd }: DragCallbacks) {
    const last = useRef<{ x: number; y: number } | null>(null);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        // starting point
        last.current = { x: e.clientX, y: e.clientY };

        // fire start callback
        onDragStart?.(e.nativeEvent);

        const handleMove = (ev: PointerEvent) => {
            if (!last.current) return;

            const dx = ev.clientX - last.current.x;
            const dy = ev.clientY - last.current.y;

            last.current = { x: ev.clientX, y: ev.clientY };

            onDrag?.(ev, { dx, dy });
        };

        const handleUp = (ev: PointerEvent) => {
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
