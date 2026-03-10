import { DeviceErrorCode } from "../../../services/deviceServices";
import { BaseDeviceState, parseBaseDeviceState, validateBaseDeviceState } from "./device.types";

export interface LightState extends BaseDeviceState {
    brightness?: number;
    color?: string;
}

const LightStateKeys: (keyof LightState)[] = ['power', 'brightness', 'color'];

export function validateLightState(state: Partial<LightState>): boolean {
    const { brightness, color } = state;

    if(
        !validateBaseDeviceState(state) ||
        brightness !== undefined && typeof brightness !== 'number' ||
        color !== undefined && typeof color !== 'string'
    ) {
        return false;
    }

    const extraKeys = Object.keys(state).filter(stateKey => !LightStateKeys.includes(stateKey as any));

    if(extraKeys.length > 0) {
        // TODO: Make this throw an error/connect to the response
        console.error(`Unknown keys present: ${extraKeys.join(', ')}`);
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
