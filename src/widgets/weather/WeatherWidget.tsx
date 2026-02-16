/** @jsxImportSource @emotion/react */
'use client';
import { Suspense, use, useMemo, useState } from 'react';
import WidgetController from '../WidgetController';
import WeatherWidgetCompactContent from './WeatherWidgetCompactContent';
import { useWeatherWidget } from './useWeatherWidget';
import Widget from '@/components/Widget';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import MaterialIcon from '@/components/MaterialIcon';
import ExpandedWidget from '../ExpandedWidget';

type Props = {
    grid: {
        col: number;
        colSpan: number;
        row: number;
        rowSpan: number;
    }
};

export function WeatherWidget({ grid }: Props) {
    const weather = useWeatherWidget();

    // The expanded and compact widgets are currently the same
    const content = (props: any) => <WeatherWidgetCompactContent state={weather.state} actions={weather.actions} setExpanded={props.setExpanded} expanded={props.expanded} />;

    return (
        <Suspense fallback={'loading'}>
            <WidgetController
                compactRender={content}
                expandedRender={content}
            />
        </Suspense>
    )
}
