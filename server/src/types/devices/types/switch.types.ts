import { DeviceErrorCode } from "../../../services/deviceServices";
import { BaseDeviceState, parseBaseDeviceState, validateBaseDeviceState } from "./device.types";

export interface SwitchState extends BaseDeviceState {}

export function validateSwitchState(state: Partial<SwitchState>): boolean {
    // const {  } = state;

    if(
        !validateBaseDeviceState(state)
    ) {
        return false;
    }

    return true;
}

export function parseSwitchState(json: string): SwitchState {
    // Parse as BaseDeviceState and then add other validation on top of that
    const parsedState = parseBaseDeviceState(json) as SwitchState;

    if(parsedState == null || typeof parsedState !== 'object') {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }
    
    if(!validateSwitchState(parsedState)) {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    return parsedState as SwitchState;
}
