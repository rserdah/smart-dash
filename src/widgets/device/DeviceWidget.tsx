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
    id: number;
    device: any;
};

const TypeRegistry = {
    'light': LightWidgetCompactContent,
    'switch': null,
    'sensor': null,
    'thermostat': ThermostatWidgetCompactContent,
};

export function DeviceWidget({ grid, id, device: _device }: Props) {
    const deviceHook = useDevice(_device);

    const Component = TypeRegistry[(_device.type as keyof typeof TypeRegistry)];

    if(!Component) {
        return <>N/A</>
    }

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <Component device={_device} state={deviceHook.state} actions={deviceHook.actions} setExpanded={props.setExpanded} expanded={props.expanded} />;

    return (
        <WidgetController
            compactRender={content}
            expandedRender={content}
        />
    )
}
