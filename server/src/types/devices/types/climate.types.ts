import { DeviceErrorCode } from "../../../services/deviceServices";
import { BaseDeviceState, parseBaseDeviceState, validateBaseDeviceState } from "./device.types";

export interface ClimateState extends BaseDeviceState {
    targetTemperature: number;
    mode?: 'heat' | 'cool' | 'auto';
}

export function validateClimateState(state: Partial<ClimateState>): boolean {
    const { targetTemperature, mode } = state;

    if(
        targetTemperature !== undefined && typeof targetTemperature !== 'number' ||
        mode !== undefined && typeof mode !== 'string' && !['heat', 'cool', 'auto'].includes(mode)
    ) {
        return false;
    }

    return true;
}

export function parseClimateState(json: string): ClimateState {
    // Parse as BaseDeviceState and then add other validation on top of that
    const parsedState = parseBaseDeviceState(json) as ClimateState;

    if(parsedState == null || typeof parsedState !== 'object') {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    if(!validateClimateState(parsedState)) {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    return parsedState as ClimateState;
}
