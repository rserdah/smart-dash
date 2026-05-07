import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDeviceActions } from './useDeviceActions';
import { useParams } from 'react-router-dom';

export type DeviceState = {
} | any;

export function useDevice(deviceId: number) {
    const { roomId } = useParams();

    const { data: _device, isLoading } = useQuery({
        queryKey: ['rooms', Number(roomId || 0), 'layout'],
        queryFn: () => fetch(`http://localhost:4000/api/rooms/${roomId}/layout`).then(res => res.json())/* .then(x => { console.warn(x.dashboard.widgets.find((w: any) => w.widget.deviceId == 1).widget.device.state); return x; }) */,
        enabled: !!roomId /* && !!deviceId */,
        select: data => data.dashboard.widgets.find((w: any) => w.widget.deviceId == deviceId).widget.device,
    });

    const actions = useDeviceActions(_device);

    let stateParsed;
    if(_device != undefined) {
        try {
            stateParsed = JSON.parse(_device.state);
        }
        catch(e) {
            if(e instanceof SyntaxError) {
                console.warn('Device state is not valid JSON');
            }
            else {
                console.error(e);
            }

            stateParsed = undefined;
        }
    }
    else {
        stateParsed = undefined;
    }

    // Conditional return AFTER useDeviceActions or else the number of hooks called can change which will result in a React error
    if(isLoading || _device == undefined || stateParsed == undefined || actions == undefined) {
        return {
            device: null,
            state: null,
            actions: null,
            isLoading: isLoading,
        };
    }

    return {
        device: _device,
        state: stateParsed,
        actions,
        isLoading: isLoading,
    };
}
