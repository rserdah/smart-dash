import { Device } from '@prisma/client';
import { DeviceProvider } from './types';
import { prisma } from '../lib/prisma';
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
