/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import { LightState, LightActions } from "./useLightWidget";
import Widget from '@/components/Widget';
import { ModalProps, ModalBody, ModalFooter, ModalFooterBtn } from '@/modals/ModalShell';
import ToggleSwitch from "@/components/input/ToggleSwitch";
import { useModal } from '@/modals/ModalContext';


type Props = {
    state: LightState;
    actions: LightActions;
    setExpanded: (expanded: boolean) => void;
};

function ConfirmModal({ message, onConfirm, onClose }: ModalProps) {
    return (
        <>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>

            <ModalFooter>
                <ModalFooterBtn onClick={() => { onClose?.(); }}>Cancel</ModalFooterBtn>
                <ModalFooterBtn onClick={async () => { const result = await onConfirm(); result && onClose?.(); }}>Confirm</ModalFooterBtn>
            </ModalFooter>
        </>
    )
}

export default function LightWidgetCompact({ state, actions, setExpanded }: Props) {
    const [checked, setChecked] = useState(false);
    const modal = useModal();

    return (
        <Widget
            addCssGetter={() => css`height: 100%;`}
            header={<div css={css`display: flex; flex-direction: row; justify-content: space-between; gap: 10px;`}>
                <span css={css`color: white;`}>Toggle Modal</span>
                <ToggleSwitch checked={checked} onToggle={checked => !Boolean(console.log(checked)) && modal.open(ConfirmModal, { title: 'Are you sure?', message: 'Are you sure you want to flip this switch?', onConfirm: () => { setChecked(c => !c); return true; } })} stopPointerDownPropagation />
            </div>}
            onLongPress={() => setExpanded(true)}
        >
            {/* TODO: Widget content that should be reused should be made into components and used for the compact content and the expanded content */}
            <ToggleButton
                name='testToggleButtonName'
                checked={state.isOn}
                onChange={actions.toggle}
            />

            <span>{state.brightness}%</span>
        </Widget>
    )
}
