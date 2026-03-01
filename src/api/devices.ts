export async function fetchDevices() {
    const res = await fetch(`http://localhost:4000/api/devices/`);
    
    return res.json();
}

export async function fetchDevice(id: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/`);
    
    return res.json();
}

export async function toggleDevicePower(id: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/power/`, { method: 'PATCH' });

    return res.json();
}

export async function setDeviceTemperature(id: number, temp: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/temperature/`, {
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
