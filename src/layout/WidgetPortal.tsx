// Modified from ChatGPT
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const PortalOverlay = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: #85858552;
    /* backdrop-filter: blur(6px); */
    inset: 0;
    z-index: 1000;
    overscroll-behavior: contain;
`;

const PortalBox = styled.div``;

type WidgetPortalProps = {
    expanded: boolean;
    onClose?: () => void;
    children: ReactNode;
};

export default function WidgetPortal({ expanded, onClose, children }: WidgetPortalProps) {
    const portalRoot = document.getElementById('expand-widget-root');

    if (!expanded || !portalRoot) {
        return <>{children}</>;
    }

    return createPortal(
        (
            <PortalOverlay onClick={onClose}>
                <PortalBox onClick={e => { e.stopPropagation(); /* Prevent clicks on the modal content from closing the modal */ }}>
                    {children}
                </PortalBox>
            </PortalOverlay>
        ), 
        portalRoot
    );
}
