/** @jsxImportSource @emotion/react */
import React, { PropsWithChildren, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type ExpandedWidgetBaseProps = PropsWithChildren & {
    /** String title for the modal. Not used if header has a value. Ignored if custom is true. */
    title?: string;

    /** Use this component instead of the standard modal header component. Can be a render prop function that accepts ModalChildJsxProps (e.g. to implement a custom button to close the modal in the header, footer, or child JSX). Ignored if custom is true. */
    header?: React.ReactNode;

    /** Function that returns styles to be added to the widget (on top of the base styles). */
    addCssGetter?: typeof css;

    /** Use child elements as fully custom JSX and don't provide the standard modal structure (e.g. ModalShell will not provide the header). If using this prop, should import and use the ModalHeader, ModalBody, ModalFooter, ModalFooterBtn for consistency of modal structure. */
    custom?: boolean;
};

type ExpandedWidgetProps = Omit<any, keyof ExpandedWidgetBaseProps> & ExpandedWidgetBaseProps;

const Box = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 16px;
    padding: 20px;
    width: 64rem;
    height: 40rem;
    /* min-height: 0px; */
    max-height: 90vh;
    border: 1px solid white;
    /* border: 1px solid var(--input-border-color); */
    border-radius: 10px;
    /* background: var(--container-background-color); */
    background: #69696910;
    color: var(--text-color);
    backdrop-filter: blur(10px) saturate(0.9);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.05);
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 1.76rem;
    font-weight: 600;
    color: white;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    color: white;
    /* overflow-y: auto; */
`;

export default function ExpandedWidget({ title, header, custom, addCssGetter, children }: ExpandedWidgetProps) {
    return (
        <Box css={addCssGetter?.()}>
            {
                custom ? 
                    <>{children}</>
                    :
                    <>
                        {(title || header) && (header ?? <Header>{title}</Header>)}

                        <Body>
                            {children}
                        </Body>
                    </>
            }
        </Box>
    )
}
