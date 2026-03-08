import { DeviceErrorCode } from "../../../services/deviceServices";
import { BaseDeviceState, parseBaseDeviceState, validateBaseDeviceState } from "./device.types";

export interface LightState extends BaseDeviceState {
    brightness?: number;
    color?: string;
}

export function validateLightState(state: Partial<LightState>): boolean {
    const { brightness, color } = state;

    if(
        !validateBaseDeviceState(state) ||
        brightness !== undefined && typeof brightness !== 'number' ||
        color !== undefined && typeof color !== 'string'
    ) {
        return false;
    }

    return true;
}

export function parseLightState(json: string): LightState {
    // Parse as BaseDeviceState and then add other validation on top of that
    const parsedState = parseBaseDeviceState(json) as LightState;

    if(parsedState == null || typeof parsedState !== 'object') {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    if(!validateLightState(parsedState)) {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    return parsedState as LightState;
}
