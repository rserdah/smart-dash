import { Device } from '@prisma/client';
import { DeviceProvider } from './types';
import { prisma } from '../lib/prisma';
import { validateBaseDeviceCapabilities } from '../types/devices/types/device.types';
import { LightState, validateLightState, parseLightState } from '../types/devices/types/light.types';
import { SwitchState, validateSwitchState, parseSwitchState } from '../types/devices/types/switch.types';
import { ClimateState, validateClimateState, parseClimateState } from '../types/devices/types/climate.types';
import { DeviceErrorCode } from '../services/deviceServices';

export const localProvider: DeviceProvider = {
    async updateLight(device: Device, state: Partial<LightState>): Promise<Device> {
        const currentState = parseLightState(device.state);

        if(!validateLightState(state)) {
            throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
        }

        if(device.capabilities == null || typeof device.capabilities == 'number' || typeof device.capabilities == 'boolean') {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const capabilities = device.capabilities as (keyof LightState)[];

        if(!validateBaseDeviceCapabilities(state, capabilities)) {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const newState = {
            ...currentState,
            ...state,
        };

        const newStateJson = JSON.stringify(newState);

        const updatePromise = prisma.device.update({
            where: { id: device.id },
            data: { state: newStateJson },
        });

        return updatePromise;
    },

    async updateSwitch(device: Device, state: Partial<SwitchState>): Promise<Device> {
        const currentState = parseSwitchState(device.state);

        if(!validateSwitchState(state)) {
            throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
        }

        if(device.capabilities == null || typeof device.capabilities == 'number' || typeof device.capabilities == 'boolean') {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const capabilities = device.capabilities as (keyof SwitchState)[];

        if(!validateBaseDeviceCapabilities(state, capabilities)) {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const newState = {
            ...currentState,
            ...state,
        };

        const newStateJson = JSON.stringify(newState);

        const updatePromise = prisma.device.update({
            where: { id: device.id },
            data: { state: newStateJson },
        });

        return updatePromise;
    },

    async updateClimate(device: Device, state: Partial<ClimateState>): Promise<Device> {
        const currentState = parseClimateState(device.state);

        if(!validateClimateState(state)) {
            throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
        }

        if(device.capabilities == null || typeof device.capabilities == 'number' || typeof device.capabilities == 'boolean') {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const capabilities = device.capabilities as (keyof ClimateState)[];

        if(!validateBaseDeviceCapabilities(state, capabilities)) {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const newState = {
            ...currentState,
            ...state,
        };

        const newStateJson = JSON.stringify(newState);

        const updatePromise = prisma.device.update({
            where: { id: device.id },
            data: { state: newStateJson },
        });

        return updatePromise;
    },
};
