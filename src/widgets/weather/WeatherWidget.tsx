/** @jsxImportSource @emotion/react */
'use client';
import { Suspense } from 'react';
import WidgetController from '../WidgetController';
import WeatherWidgetCompactContent from './WeatherWidgetCompactContent';
import { useWeatherWidget } from './useWeatherWidget';

type Props = {
    grid: {
        col: number;
        colSpan: number;
        row: number;
        rowSpan: number;
    };

    locationCity: string;
    locationState: string;
    locationCountry: string;
    locationString?: string;
};

export function WeatherWidget({ grid, locationCity, locationState, locationCountry, locationString }: Props) {
    const weather = useWeatherWidget({
        lon: -84.3898151, // -83.9007,
        lat: 33.7544657, // 33.839,
    });

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <WeatherWidgetCompactContent state={weather.state} actions={weather.actions} setExpanded={props.setExpanded} expanded={props.expanded} locationCity={locationCity} locationState={locationState} locationCountry={locationCountry} locationString={locationString} />;

    return (
        <Suspense fallback={'loading'}>
            <WidgetController
                compactRender={content}
                expandedRender={content}
            />
        </Suspense>
    )
}
