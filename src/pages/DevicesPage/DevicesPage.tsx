/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fetchDevices } from '@/api/devices';
import ToggleSwitch from '@/components/input/ToggleSwitch';
import MaterialIcon from '@/components/MaterialIcon';
import DeviceCard from './components/DeviceCard';


// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const ImgBackground = styled.img`
    position: absolute;
    height: 100%;
    z-index: -1;
`;

export default function DevicesPage() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        (async () => {
            const devices = await fetchDevices();
            setDevices(devices);

            console.log('devices', devices);
        })();
    }, []);

    return (
        <>
            {/* <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden; background: radial-gradient(#131313ff, #535353ff); background-size: 150vw 150vw; background-position: center; background-repeat: no-repeat;`}></div> */}

            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden;`}>
                <ImgBackground src='src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg' />
            </div>

            <div css={css`box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding: 25px 50px; width: 100%; color: var(--text-color);`}>
                <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex: 1; gap: 10px; width: 80%;`}>
                    <div css={css`display: flex; gap: 10px;`}>
                        <h3 css={css`flex: 1; margin: 0px; color: var(--text-color);`}>Devices</h3>
                    </div>

                    <div css={css`display: flex; flex-direction: column; justify-content: center; gap: 10px;`}>
                        { devices.map((device: any, i: number) => (
                            <DeviceCard key={`${device.name}_${device.id}_${i}`} device={device} />
                        )) }
                    </div>
                </div>
            </div>
        </>
    )
}
