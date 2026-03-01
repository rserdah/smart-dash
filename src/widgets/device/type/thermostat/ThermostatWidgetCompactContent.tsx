/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import Widget from '@/components/Widget';
import ToggleSwitch from "@/components/input/ToggleSwitch";


type Props = {
    state: any; // ThermostatState;
    actions: any; // ThermostatActions;
    setExpanded: (expanded: boolean) => void;
    expanded: boolean;
    device: any;
};

export default function ThermostatWidgetCompactContent({ device, state, actions, setExpanded, expanded }: Props) {
    return (
        <Widget
            addCssGetter={() => css`height: 100%;`}
            header={<span css={css`color: white;`}>{device?.name || 'Name N/A'}</span>}
            onLongPress={() => setExpanded(true)}
        >
            <span>{state.targetTemperature}°</span>
            <button onClick={() => actions.setTemperature(state.targetTemperature + 1)}>+</button>
        </Widget>
    )
}
