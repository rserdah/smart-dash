import { LightWidget } from './type/light/LightWidget';
import { ThermostatWidget } from './type/thermostat/ThermostatWidget';

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
    'light': LightWidget,
    'switch': null,
    'sensor': null,
    'thermostat': ThermostatWidget,
};

export function DeviceWidget({ grid, id, device: _device }: Props) {
    const Widget = TypeRegistry[(_device.type as keyof typeof TypeRegistry)];

    if(!Widget) {
        return <>N/A</>
    }

    return (
        <Widget grid={grid} id={id} device={_device} />
    )
}
