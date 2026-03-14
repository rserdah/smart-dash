import { BaseDeviceState } from '../../server/src/types/devices/types/device.types';
import { LightState } from '../../server/src/types/devices/types/light.types';
import { SwitchState } from '../../server/src/types/devices/types/switch.types';
import { ClimateState } from '../../server/src/types/devices/types/climate.types';

export async function fetchDevices() {
    const res = await fetch(`http://localhost:4000/api/devices/`);
    
    return res.json();
}

export async function fetchDevice(id: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/`);
    
    return res.json();
}

async function setDeviceState(id: number, state: Partial<BaseDeviceState|LightState|SwitchState|ClimateState>) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/state/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(state)
    });

    return res.json();
}

export async function setDevicePower(id: number, power: boolean) {
    return await setDeviceState(id, {
        power: power
    });
}

export async function setDeviceBrightness(id: number, brightness: number) {
    return await setDeviceState(id, {
        brightness: brightness
    });
}

export async function setDeviceColor(id: number, color: [number, number, number]) {
    return await setDeviceState(id, {
        color: color
    });
}

export async function setDeviceTemperature(id: number, temp: number) {
    return await setDeviceState(id, {
        targetTemperature: temp
    });
}
