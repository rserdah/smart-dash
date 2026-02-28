import styled from '@emotion/styled';
import WidgetController from '../../../WidgetController';
import ThermostatWidgetCompactContent from './ThermostatWidgetCompactContent';
import { useThermostatWidget } from './useThermostatWidget';

type Props = {
    grid: {
        col: number;
        colSpan: number;
        row: number;
        rowSpan: number;
    };
    id: number;
    device: any;
};

export function ThermostatWidget({ grid, id, device: _device }: Props) {
    const device = useThermostatWidget(id);

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <ThermostatWidgetCompactContent device={_device} state={device.state} actions={device.actions} setExpanded={props.setExpanded} expanded={props.expanded} />;

    return (
        <WidgetController
            compactRender={content}
            expandedRender={content}
        />
    )
}
