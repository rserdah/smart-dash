/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import { DeviceState, DeviceActions } from "./useDeviceWidget";
import Widget from '@/components/Widget';
import ToggleSwitch from "@/components/input/ToggleSwitch";


type Props = {
    state: DeviceState;
    actions: DeviceActions;
    setExpanded: (expanded: boolean) => void;
    expanded: boolean;
    device: any;
};

export default function DeviceWidgetCompactContent({ device, state, actions, setExpanded, expanded }: Props) {
    return (
        <Widget
            addCssGetter={() => css`height: 100%;`}
            header={<div css={css`display: flex; flex-direction: row; justify-content: space-between; gap: 10px;`}>
                <span css={css`color: white;`}>{device?.name || 'Name N/A'}</span>
                <ToggleSwitch checked={state.isSwitchOn} onToggle={actions.toggleSwitch} stopPointerDownPropagation />
            </div>}
            onLongPress={() => setExpanded(true)}
        >
            <span>{state.brightness}%</span>
        </Widget>
    )
}
