import { Device } from "@prisma/client";
import { LightState } from '../types/devices/types/light.types';
import { SwitchState } from '../types/devices/types/switch.types';
import { ClimateState } from '../types/devices/types/climate.types';

export interface DeviceProvider {
    updateLight?(device: Device, state: Partial<LightState>): Promise<Device>;
    updateSwitch?(device: Device, state: Partial<SwitchState>): Promise<Device>;
    updateClimate?(device: Device, state: Partial<ClimateState>): Promise<Device>;
}
