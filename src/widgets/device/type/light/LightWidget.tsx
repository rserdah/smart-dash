import styled from '@emotion/styled';
import WidgetController from '../../../WidgetController';
import LightWidgetCompactContent from './LightWidgetCompactContent';
import { useDeviceWidget } from './useLightWidget';

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

export function LightWidget({ grid, id, device: _device }: Props) {
    const device = useDeviceWidget(id);

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <LightWidgetCompactContent device={_device} state={device.state} actions={device.actions} setExpanded={props.setExpanded} expanded={props.expanded} />;

    return (
        <WidgetController
            compactRender={content}
            expandedRender={content}
        />
    )
}
