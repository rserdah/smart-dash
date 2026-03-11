export async function fetchDevices() {
    const res = await fetch(`http://localhost:4000/api/devices/`);
    
    return res.json();
}

export async function fetchDevice(id: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/`);
    
    return res.json();
}

export async function setDevicePower(id: number, power: boolean) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/state/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            power: power
        })
    });

    return res.json();
}

export async function setDeviceTemperature(id: number, temp: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/state/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            targetTemperature: temp
        })
    });

    return res.json();
}
