/** @jsxImportSource @emotion/react */
import ToggleButton from "@/components/input/ToggleButton";
import { LightState, LightActions } from "./useLightWidget";
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ExpandedWidget from "../ExpandedWidget";
import ToggleSwitch from "@/components/input/ToggleSwitch";
import InputLinearSlider from "@/components/input/InputLinearSlider";


type Props = {
    state: LightState;
    actions: LightActions;
    setExpanded: (expanded: boolean) => void;
};

export default function LightWidgetExpanded({ state, actions, setExpanded }: Props) {
    return (
        <ExpandedWidget
            title='Living Room Light'
            header={<div css={css`display: flex; flex-direction: row; justify-content: space-between; gap: 10px;`}>
                <span css={css`color: white;`}>Toggle Modal</span>
                <ToggleSwitch /* checked={checked} onToggle={checked => !Boolean(console.log(checked)) && modal.open(ConfirmModal, { title: 'Are you sure?', message: 'Are you sure you want to flip this switch?', onConfirm: () => { setChecked(c => !c); return true; } })} */ stopPointerDownPropagation />
            </div>}
        >
            {/* TODO: Widget content that should be reused should be made into components and used for the compact content and the expanded content */}
            <ToggleButton
                name='aksjdhalksdjh'
                checked={state.isOn}
                onChange={actions.toggle}
            />

            <InputLinearSlider
                value={state.brightness}
            // onChange={actions.setBrightness}
            />
        </ExpandedWidget>
    )
}
