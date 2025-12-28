// Modified from ChatGPT
import styled from '@emotion/styled';
import WidgetController from '../WidgetController';
import LightWidgetCompactContent from './LightWidgetCompactContent';
import LightWidgetExpandedContent from './LightWidgetExpandedContent';
import { useLightWidget } from './useLightWidget';

type Props = {
    grid: {
        col: number;
        colSpan: number;
        row: number;
        rowSpan: number;
    }
};

export function LightWidget({ grid }: Props) {
    const light = useLightWidget();

    return (
        <WidgetController
            compactRender={props => <LightWidgetCompactContent state={light.state} actions={light.actions} setExpanded={props.setExpanded} />}
            expandedRender={props => <LightWidgetExpandedContent state={light.state} actions={light.actions} setExpanded={props.setExpanded} />}
        />
    )
}
