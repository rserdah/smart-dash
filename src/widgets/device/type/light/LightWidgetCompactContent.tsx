/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import Widget from '@/components/Widget';
import ToggleSwitch from "@/components/input/ToggleSwitch";
import InputLinearSlider from '@/components/input/InputLinearSlider';


type Props = {
    state: any; // DeviceState;
    actions: any; // DeviceActions;
    setExpanded: (expanded: boolean) => void;
    expanded: boolean;
    device: any;
};

export default function LightWidgetCompactContent({ device, state, actions, setExpanded, expanded }: Props) {
    return (
        <Widget
            addCssGetter={() => css`height: 100%;`}
            header={<div css={css`display: flex; flex-direction: row; justify-content: space-between; gap: 10px;`}>
                <span css={css`color: white;`}>{device?.name || 'Name N/A'}</span>
                <ToggleSwitch checked={state.power} onToggle={actions.togglePower} stopPointerDownPropagation />
            </div>}
            onLongPress={() => setExpanded(true)}
        >
            <span>{state.brightness}%</span>

            <ToggleButton
                name='ToggleButton1'
                checked={state.power}
                onChange={actions.togglePower}
            />

            <InputLinearSlider
                // value={state.brightness}
                // onChange={actions.setBrightness}
            />
        </Widget>
    )
}
