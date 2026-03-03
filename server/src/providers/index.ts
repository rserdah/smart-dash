import { DeviceProvider } from "@prisma/client";
import { localProvider } from "./localProvider";
import { homeAssistantProvider } from "./homeAssistantProvider";
import { smartThingsProvider } from "./smartthingsProvider";
import { customRpiProvider } from "./customRpiProvider";

const deviceProviders = {
    'LOCAL': localProvider,
    'HOME_ASSISTANT': homeAssistantProvider,
    'SMARTTHINGS': smartThingsProvider,
    'CUSTOM_RPI': customRpiProvider,
};

export function getDeviceProvider(provider: DeviceProvider) {
    if(provider == null || !(provider in deviceProviders)) {
        throw new Error(`Invalid provider requested: ${provider}`);
    }
    
    return deviceProviders[provider];
}
