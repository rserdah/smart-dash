/** @jsxImportSource @emotion/react */
// Modified from ChatGPT
import { ButtonHTMLAttributes, forwardRef, MouseEventHandler, PropsWithChildren, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useOffclick } from '@/hooks/useOffclick';

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #00000073;
    backdrop-filter: blur(6px);

    /* Prevent background scroll */
    overscroll-behavior: contain;
`;

const ModalContainer = styled.div`
    label: ModalContainer;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    min-width: min(90vw, 480px);
    max-width: 90vw;
    max-height: 90vh;
    border: 1px solid var(--input-border-color);
    border-radius: 20px;
    background: var(--container-background-color);
    color: var(--text-color);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.05);

    animation: modal-enter 160ms ease-out;

    @keyframes modal-enter {
        from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.76rem;
    font-weight: 600;
`;

export const ModalBody = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const ModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
`;

interface ModalFooterBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
};

const ModalFooterBtnElem = styled.button<ModalFooterBtnProps>`
    flex: 1;
    padding: 5px 10px;
    border: none;
    border-radius: 8px;
`;

export const ModalFooterBtn = forwardRef<HTMLButtonElement, ModalFooterBtnProps>(({ children, variant='primary', ...rest }, ref) => {
    return <ModalFooterBtnElem
        ref={ref}
        {...rest}
    >
        {children}
    </ModalFooterBtnElem>
});

type ModalBaseProps = {
    /** String title for the modal. Not used if header has a value. Ignored if custom is true. */
    title?: string,

    /** Use this component instead of the standard modal header component. Can be a render prop function that accepts ModalChildJsxProps (e.g. to implement a custom button to close the modal in the header, footer, or child JSX). Ignored if custom is true. */
    header?: React.ReactNode | ((api: ModalChildJsxProps) => React.ReactNode),

    onClose?: () => void,

    /** Use child elements as fully custom JSX and don't provide the standard modal structure (e.g. ModalShell will not provide the header). If using this prop, should import and use the ModalHeader, ModalBody, ModalFooter, ModalFooterBtn for consistency of modal structure. */
    custom?: boolean,

    /** Use this if the modal is meant to just display some info, and the user can click 'Ok' to close it. Prevents the custom modal from having to recreate a footer for a simple close button. */
    simpleOk?: boolean,

    children?: React.ReactNode | ((api: ModalChildJsxProps) => React.ReactNode),
};

export type ModalProps = Omit<any, keyof ModalBaseProps> & ModalBaseProps;

type ModalChildJsxProps = {
    close: () => void, 
}

export function ModalShell({ title, header, children, onClose, custom, simpleOk, open }: ModalProps) {
    if(!open) {
        return null;
    }

    const containerRef = useRef(null);

    useOffclick({
        ref: containerRef,
        callback: () => onClose?.(),
    });

    return (
        <ModalOverlay>
            <ModalContainer ref={containerRef} onClick={e => e.stopPropagation()}>
                {
                    custom ?
                        <>{children}</>
                        :
                        <>
                            {(title || header) && (header ?? <ModalHeader>{title}</ModalHeader>)}

                            {children}
                            
                            { simpleOk && <ModalFooter>
                                <ModalFooterBtn onClick={onClose}>Ok</ModalFooterBtn>
                            </ModalFooter> }
                        </>
                }
            </ModalContainer>
        </ModalOverlay>
    )
}
