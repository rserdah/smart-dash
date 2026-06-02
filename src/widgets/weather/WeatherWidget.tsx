/** @jsxImportSource @emotion/react */
'use client';
import { Suspense } from 'react';
import { css } from '@emotion/react';
import WidgetController from '../WidgetController';
import WeatherWidgetCompactContent from './WeatherWidgetCompactContent';
import { useWeatherWidget } from './useWeatherWidget';

const Fallback = () => (
    <span css={css`color: var(--text-color-inverted);`}>Loading...</span>
);

type Props = {
    grid: {
        col: number;
        colSpan: number;
        row: number;
        rowSpan: number;
    };

    longitude: number;
    latitude: number;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    locationString?: string;
};

export function WeatherWidget({ grid, longitude, latitude, locationCity, locationState, locationCountry, locationString }: Props) {
    if(typeof longitude !== 'number' || typeof latitude !== 'number') {
        return <Fallback />;
    }

    const weather = useWeatherWidget({
        lon: longitude,
        lat: latitude,
    });

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <WeatherWidgetCompactContent state={weather.state} actions={weather.actions} setExpanded={props.setExpanded} expanded={props.expanded} locationCity={locationCity} locationState={locationState} locationCountry={locationCountry} locationString={locationString} />;

    return (
        <Suspense fallback={<Fallback />}>
            <WidgetController
                compactRender={content}
                expandedRender={content}
            />
        </Suspense>
    )
}
