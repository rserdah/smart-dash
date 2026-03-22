/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fetchDevices } from '@/api/devices';
import ToggleSwitch from '@/components/input/ToggleSwitch';
import MaterialIcon from '@/components/MaterialIcon';
import { useDevice } from '@/widgets/device/useDevice';


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

export default function DeviceCard({ device }: any) {
    const deviceHook = useDevice(device);

    return (
        <Card>
            <Header>
                <MaterialIcon icon='devices' addCssGetter={() => css`margin-right: 0.5rem;`} />
                {device.name}
                <div css={css`margin-left: auto;`}>
                    <ToggleSwitch checked={deviceHook.state.power} onToggle={deviceHook.actions.setPower} stopPointerDownPropagation />
                </div>
            </Header>

            <Body>

            </Body>
        </Card>
    )
}
