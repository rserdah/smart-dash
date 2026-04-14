/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fetchDevices } from '@/api/devices';
import ToggleSwitch from '@/components/input/ToggleSwitch';
import MaterialIcon from '@/components/MaterialIcon';
import { useDevice } from '@/widgets/device/useDevice';
import { Link } from 'react-router-dom';


const Card = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
    padding: 10px;
    width: 100%;
    height: 100%;
    min-height: 0px;
    border: 1px solid white;
    border-radius: 10px;
    /* background: var(--container-background-color); */
    background: #69696910;
    color: var(--text-color);
    backdrop-filter: blur(10px) saturate(0.9);
    overflow: hidden;
`;

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

const Header = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    color: white;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    color: white;
`;

/** Temp.; for mapping rooms to images before the images are stored in DB */
const _roomImgs = {
    living_room: 'src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg',
    dining_room: 'src/img/DiningRoomImage_Jean_van_der_Meulen_Pexels.jpg',
    bedroom: 'src/img/BedroomImage_Jean_van_der_Meulen_Pexels.jpg',
};

export default function RoomCard({ room }: any) {
    return (
        <Link to={`/rooms/${room.id}`} css={css`text-decoration: none; color: inherit;`}>
            <Card>

                <ImgBackground src={_roomImgs[room?.roomKey as keyof typeof _roomImgs]} css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25);`} />

                <Header>
                    {room?.name}
                </Header>

                <Body></Body>
            </Card>
        </Link>
    )
}
