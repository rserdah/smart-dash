import { Device } from "@prisma/client";

export interface DeviceProvider {
    toggle(device: Device): Promise<Device>;
    setTargetTemperature(device: Device, temp: number): Promise<Device>;
}
