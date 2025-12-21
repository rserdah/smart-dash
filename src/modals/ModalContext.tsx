// Modified from ChatGPT
import React, { useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalShell, ModalProps } from './ModalShell';

type ModalComponent = React.FC<ModalProps>;

interface ModalContextValue {
    open: (
        Component: ModalComponent,
        props?: ModalProps
    ) => void
    close: (id: string) => void
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
    const ctx = useContext(ModalContext);

    if (!ctx) throw new Error('useModal must be used inside ModalProvider');

    return ctx;
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModals] = useState<any[]>([])

    function open(Component: ModalComponent, props?: ModalProps) {
        const id = crypto.randomUUID()
        setModals(m => [...m, { id, Component, props }])
    }

    function close(id: string) {
        setModals(m => m.filter(modal => modal.id !== id))
    }

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}

            {createPortal(
                modals.map(({ id, Component, props }) => (
                    <ModalShell {...props} key={id} onClose={() => close(id)}>
                        <Component {...props} onClose={() => close(id)} />
                    </ModalShell>
                )),
                document.getElementById('modal-root')!
            )}
        </ModalContext.Provider>
    )
}
