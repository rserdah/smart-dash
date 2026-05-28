import WidgetController from '../WidgetController';
import LightWidgetCompactContent from './type/light/LightWidgetCompactContent';
import ThermostatWidgetCompactContent from './type/thermostat/ThermostatWidgetCompactContent';
import { useDevice } from './useDevice';

type Props = {
    grid: {
        col: number;
        colSpan: number;
        row: number;
        rowSpan: number;
    };

    deviceId: number;
};

const TypeRegistry = {
    'light': LightWidgetCompactContent,
    'switch': null,
    'sensor': null,
    'thermostat': ThermostatWidgetCompactContent,
};

export function DeviceWidget({ grid, deviceId }: Props) {
    const { device, state, actions, isLoading } = useDevice(deviceId);

    if(isLoading || device == undefined || state == undefined || actions == undefined) {
        return 'Loading...';
    }

    const Component = TypeRegistry[(device.type as keyof typeof TypeRegistry)];

    if(!Component) {
        return <>N/A</>
    }

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <Component device={device} state={state} actions={actions} setExpanded={props.setExpanded} expanded={props.expanded} />;

    return (
        <WidgetController
            compactRender={content}
            expandedRender={content}
        />
    )
}
