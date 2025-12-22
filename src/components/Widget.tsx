/** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type WidgetBaseProps = PropsWithChildren & {
    /** String title for the modal. Not used if header has a value. Ignored if custom is true. */
    title?: string;

    /** Use this component instead of the standard modal header component. Can be a render prop function that accepts ModalChildJsxProps (e.g. to implement a custom button to close the modal in the header, footer, or child JSX). Ignored if custom is true. */
    header?: React.ReactNode;

    /** Function that returns styles to be added to the widget (on top of the base styles). */
    addCssGetter?: typeof css;

    /** Use child elements as fully custom JSX and don't provide the standard modal structure (e.g. ModalShell will not provide the header). If using this prop, should import and use the ModalHeader, ModalBody, ModalFooter, ModalFooterBtn for consistency of modal structure. */
    custom?: boolean;
};

type WidgetProps = Omit<any, keyof WidgetBaseProps> & WidgetBaseProps;

const WidgetBox = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
    padding: 10px;
    width: 100%;
    min-height: 0px;
    border: 1px solid white;
    border-radius: 10px;
    /* background: var(--container-background-color); */
    background: #69696910;
    backdrop-filter: blur(10px) saturate(0.9);
    overflow: hidden;
`;

const WidgetHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    color: white;
`;

const WidgetBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    color: white;
`;

export default function Widget({ title, header, custom, addCssGetter, children }: WidgetProps) {
    return (
        <WidgetBox css={addCssGetter?.()}>
            {
                custom ? 
                    <>{children}</>
                    :
                    <>
                        {(title || header) && (header ?? <WidgetHeader>{title}</WidgetHeader>)}

                        <WidgetBody>
                            {children}
                        </WidgetBody>
                    </>
            }
        </WidgetBox>
    )
}
