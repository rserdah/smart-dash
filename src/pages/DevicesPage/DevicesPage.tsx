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

const Thing1 = styled.div`
    label: Thing1;

    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    gap: 10px;

    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 16rem);
    grid-template-rows: repeat(4, 16rem);
    gap: 10px;
    /* padding: 3rem 0px; */
    min-height: 0px;
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
            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden; background: radial-gradient(#e0e0e0, #494949); background-size: 150vw 150vw; background-position: center; background-repeat: no-repeat;`}></div>

            <div css={css`label: DevicesPage_div; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding: 25px 50px; min-width: 0px; color: var(--text-color);`}>
                <div css={css`label: DevicesPage_div2; box-sizing: border-box; display: flex; flex-direction: column; flex: 1; gap: 10px; width: 80%; min-height: 0px;`}>
                    <div css={css`display: flex; gap: 10px;`}>
                        <h1 css={css`flex: 1; margin: 0px; color: var(--text-color);`}>Devices</h1>
                    </div>

                    {/* Was going to make a rooms page (loop through rooms and display room images as the cards' backgrounds) */}
                    {/* Was going to make a rooms page (loop through rooms and display room images as the cards' backgrounds) */}
                    {/* Was going to make a rooms page (loop through rooms and display room images as the cards' backgrounds) */}
                    {/* Was going to make a rooms page (loop through rooms and display room images as the cards' backgrounds) */}
                    {/* Was going to make a rooms page (loop through rooms and display room images as the cards' backgrounds) */}

                    <Thing1>
                        { devices.map((device: any, i: number) => (
                            <DeviceCard key={`${device.name}_${device.id}_${i}`} deviceId={device.id} />
                        )) }
                    </Thing1>
                </div>
            </div>
        </>
    )
}
