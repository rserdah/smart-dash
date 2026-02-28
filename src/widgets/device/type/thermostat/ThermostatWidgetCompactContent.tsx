/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import { ThermostatState, ThermostatActions } from "./useThermostatWidget";
import Widget from '@/components/Widget';
import ToggleSwitch from "@/components/input/ToggleSwitch";


type Props = {
    state: ThermostatState;
    actions: ThermostatActions;
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
            <span>{state.temperature}°</span>
        </Widget>
    )
}
