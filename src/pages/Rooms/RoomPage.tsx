/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fetchDevices } from '@/api/devices';
import ToggleSwitch from '@/components/input/ToggleSwitch';
import MaterialIcon from '@/components/MaterialIcon';
import RoomCard from './components/RoomCard';
import DeviceCard from '../DevicesPage/components/DeviceCard';
import { useParams } from 'react-router-dom';


const ImgBackground = styled.img`
    position: absolute;
    height: 100%;
    z-index: -1;
    opacity: 1;

    transition: opacity 2s ease;

    /* Use this to make room backgrounds fade in (but fade out is instant currently) */
    /* @starting-style {
        opacity: 0;
    } */
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

/** Temp.; for mapping rooms to images before the images are stored in DB */
const _roomImgs = {
    living_room: 'src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg',
    dining_room: 'src/img/DiningRoomImage_Jean_van_der_Meulen_Pexels.jpg',
    bedroom: 'src/img/BedroomImage_Jean_van_der_Meulen_Pexels.jpg',
};

export default function RoomPage() {
    const [room, setRoom] = useState(null as any);

    const { id: roomId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/api/rooms/${roomId}/devices`)
            .then(res => res.json())
            .then(json => setRoom(json))
            .catch(e => console.error(e))
    }, []);

    if(!room) {
        return null;
    }

    const devices = room.devices || [];

    return (
        <>
            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; background: gray; overflow: hidden;`}>
                <ImgBackground src={_roomImgs[room?.roomKey as keyof typeof _roomImgs]} css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25);`} />
            </div>
            

            <div css={css`label: DevicesPage_div; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding: 25px 50px; min-width: 0px; color: var(--text-color);`}>
                <div css={css`label: DevicesPage_div2; box-sizing: border-box; display: flex; flex-direction: column; flex: 1; gap: 10px; width: 80%; min-height: 0px;`}>
                    <div css={css`display: flex; gap: 10px;`}>
                        <h1 css={css`flex: 1; margin: 0px; color: var(--text-color-inverted);`}>{room.name}</h1>
                    </div>

                    <Thing1>
                        {devices.map((device: any, i: number) => (
                            <DeviceCard key={`${device.name}_${device.id}_${i}`} device={device} />
                        ))}
                    </Thing1>
                </div>
            </div>
        </>
    )
}
