export async function fetchDevices() {
    const res = await fetch(`http://localhost:4000/api/devices/`);
    
    return res.json();
}

export async function fetchDevice(id: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/`);
    
    return res.json();
}

export async function toggleDevice(id: number) {
    const res = await fetch(`http://localhost:4000/api/devices/${id}/toggle/`, { method: 'POST' });

    return res.json();
}
