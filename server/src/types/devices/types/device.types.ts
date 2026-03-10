import { DeviceErrorCode } from "../../../services/deviceServices";

export type DeviceType = 'light' | 'switch' | 'climate';

export interface BaseDeviceState {
    power: boolean;
}

export function validateBaseDeviceState(state: Partial<BaseDeviceState>): boolean {
    const { power } = state;

    if(
        power !== undefined && typeof power !== 'boolean'
    ) {
        return false;
    }

    return true;
}

export function validateBaseDeviceCapabilities<T>(state: Partial<T>, capabilities: (keyof T)[]): boolean {
    const extraKeys = Object.keys(state).filter(stateKey => !capabilities.includes(stateKey as any));

    if(extraKeys.length > 0) {
        // TODO: Make this throw an error/connect to the response
        console.error(`Unsupported capabilities: ${extraKeys.join(', ')}`);
        return false;
    }

    return true;
}

export function parseBaseDeviceState(json: string): BaseDeviceState {
    let finalState;
    try {
        finalState = JSON.parse(json);
    }
    catch(e) {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    if(finalState == null || typeof finalState !== 'object') {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    const { power } = finalState;

    if(
        power !== undefined && typeof power !== 'boolean'
    ) {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    return finalState as BaseDeviceState;
}
