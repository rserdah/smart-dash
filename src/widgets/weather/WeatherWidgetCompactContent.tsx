/** @jsxImportSource @emotion/react */
import { use, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import { WeatherState, WeatherActions } from "./useWeatherWidget";
import Widget from '@/components/Widget';
import { ModalProps, ModalBody, ModalFooter, ModalFooterBtn } from '@/modals/ModalShell';
import ToggleSwitch from "@/components/input/ToggleSwitch";
import { useModal } from '@/modals/ModalContext';
import MaterialIcon from '@/components/MaterialIcon';
import ExpandedWidget from '../ExpandedWidget';


type Props = {
    state: WeatherState;
    actions: WeatherActions;
    setExpanded: (expanded: boolean) => void;
    expanded: boolean;
};

function ConfirmModal({ message, onConfirm, onClose }: ModalProps) {
    return (
        <>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>

            <ModalFooter>
                <ModalFooterBtn onClick={() => { onClose?.(); }}>Cancel</ModalFooterBtn>
                <ModalFooterBtn onClick={async () => { const result = await onConfirm(); result && onClose?.(); }}>Confirm</ModalFooterBtn>
            </ModalFooter>
        </>
    )
}

const weekdayIndices = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
};

export default function WeatherWidgetCompact({ state, actions, setExpanded, expanded }: Props) {
    const [checked, setChecked] = useState(false);
    const modal = useModal();

    // The 'use' call was throwing errors when it was used in the useWeatherWidget hook so it is moved here
    const weatherData: typeof testWeatherData = state.weatherDataPromise ? use(state.weatherDataPromise) : {};

    const testWeatherData = {
        city: "Loganville",
        state: "GA",
        forecastUrl: "https://api.weather.gov/gridpoints/FFC/68,92/forecast",
        forecastHourlyUrl: "https://api.weather.gov/gridpoints/FFC/68,92/forecast/hourly",
        forecastPeriods: [
            {
                number: 1,
                name: "Overnight",
                startTime: "2026-02-08T00:00:00-05:00",
                endTime: "2026-02-08T06:00:00-05:00",
                isDaytime: false,
                temperature: 26,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 0
                },
                windSpeed: "0 to 5 mph",
                windDirection: "N",
                icon: "https://api.weather.gov/icons/land/night/skc?size=medium",
                shortForecast: "Clear",
                detailedForecast: "Clear, with a low around 26. North wind 0 to 5 mph."
            },
            {
                number: 2,
                name: "Sunday",
                startTime: "2026-02-08T06:00:00-05:00",
                endTime: "2026-02-08T18:00:00-05:00",
                isDaytime: true,
                temperature: 54,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 1
                },
                windSpeed: "0 mph",
                windDirection: "",
                icon: "https://api.weather.gov/icons/land/day/few?size=medium",
                shortForecast: "Sunny",
                detailedForecast: "Sunny, with a high near 54. South wind around 0 mph."
            },
            {
                number: 3,
                name: "Sunday Night",
                startTime: "2026-02-08T18:00:00-05:00",
                endTime: "2026-02-09T06:00:00-05:00",
                isDaytime: false,
                temperature: 35,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 3
                },
                windSpeed: "0 mph",
                windDirection: "",
                icon: "https://api.weather.gov/icons/land/night/bkn?size=medium",
                shortForecast: "Mostly Cloudy",
                detailedForecast: "Mostly cloudy, with a low around 35. Southeast wind around 0 mph."
            },
            {
                number: 4,
                name: "Monday",
                startTime: "2026-02-09T06:00:00-05:00",
                endTime: "2026-02-09T18:00:00-05:00",
                isDaytime: true,
                temperature: 61,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 1
                },
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/day/few?size=medium",
                shortForecast: "Sunny",
                detailedForecast: "Sunny, with a high near 61. Southeast wind 0 to 5 mph."
            },
            {
                number: 5,
                name: "Monday Night",
                startTime: "2026-02-09T18:00:00-05:00",
                endTime: "2026-02-10T06:00:00-05:00",
                isDaytime: false,
                temperature: 41,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 0
                },
                windSpeed: "0 mph",
                windDirection: "",
                icon: "https://api.weather.gov/icons/land/night/few?size=medium",
                shortForecast: "Mostly Clear",
                detailedForecast: "Mostly clear, with a low around 41. South wind around 0 mph."
            },
            {
                number: 6,
                name: "Tuesday",
                startTime: "2026-02-10T06:00:00-05:00",
                endTime: "2026-02-10T18:00:00-05:00",
                isDaytime: true,
                temperature: 70,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 0
                },
                windSpeed: "0 to 10 mph",
                windDirection: "SW",
                icon: "https://api.weather.gov/icons/land/day/bkn?size=medium",
                shortForecast: "Partly Sunny",
                detailedForecast: "Partly sunny, with a high near 70."
            },
            {
                number: 7,
                name: "Tuesday Night",
                startTime: "2026-02-10T18:00:00-05:00",
                endTime: "2026-02-11T06:00:00-05:00",
                isDaytime: false,
                temperature: 54,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 33
                },
                windSpeed: "5 mph",
                windDirection: "W",
                icon: "https://api.weather.gov/icons/land/night/bkn/rain_showers,30?size=medium",
                shortForecast: "Mostly Cloudy then Chance Rain Showers",
                detailedForecast: "A chance of rain showers after 1am. Mostly cloudy, with a low around 54. Chance of precipitation is 30%."
            },
            {
                number: 8,
                name: "Wednesday",
                startTime: "2026-02-11T06:00:00-05:00",
                endTime: "2026-02-11T18:00:00-05:00",
                isDaytime: true,
                temperature: 71,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 46
                },
                windSpeed: "5 to 10 mph",
                windDirection: "W",
                icon: "https://api.weather.gov/icons/land/day/rain_showers,50?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a high near 71. Chance of precipitation is 50%."
            },
            {
                number: 9,
                name: "Wednesday Night",
                startTime: "2026-02-11T18:00:00-05:00",
                endTime: "2026-02-12T06:00:00-05:00",
                isDaytime: false,
                temperature: 52,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 41
                },
                windSpeed: "5 mph",
                windDirection: "NW",
                icon: "https://api.weather.gov/icons/land/night/rain_showers,40/rain_showers,30?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a low around 52. Chance of precipitation is 40%."
            },
            {
                number: 10,
                name: "Thursday",
                startTime: "2026-02-12T06:00:00-05:00",
                endTime: "2026-02-12T18:00:00-05:00",
                isDaytime: true,
                temperature: 68,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 26
                },
                windSpeed: "5 mph",
                windDirection: "N",
                icon: "https://api.weather.gov/icons/land/day/rain_showers,30/rain_showers,20?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a high near 68. Chance of precipitation is 30%."
            },
            {
                number: 11,
                name: "Thursday Night",
                startTime: "2026-02-12T18:00:00-05:00",
                endTime: "2026-02-13T06:00:00-05:00",
                isDaytime: false,
                temperature: 50,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 54
                },
                windSpeed: "5 mph",
                windDirection: "NE",
                icon: "https://api.weather.gov/icons/land/night/rain_showers,30/rain_showers,50?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a low around 50. Chance of precipitation is 50%."
            },
            {
                number: 12,
                name: "Friday",
                startTime: "2026-02-13T06:00:00-05:00",
                endTime: "2026-02-13T18:00:00-05:00",
                isDaytime: true,
                temperature: 61,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 54
                },
                windSpeed: "5 to 10 mph",
                windDirection: "NE",
                icon: "https://api.weather.gov/icons/land/day/rain_showers,50?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a high near 61. Chance of precipitation is 50%."
            },
            {
                number: 13,
                name: "Friday Night",
                startTime: "2026-02-13T18:00:00-05:00",
                endTime: "2026-02-14T06:00:00-05:00",
                isDaytime: false,
                temperature: 40,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 45
                },
                windSpeed: "5 mph",
                windDirection: "E",
                icon: "https://api.weather.gov/icons/land/night/rain_showers,30/rain_showers,50?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a low around 40. Chance of precipitation is 50%."
            },
            {
                number: 14,
                name: "Saturday",
                startTime: "2026-02-14T06:00:00-05:00",
                endTime: "2026-02-14T18:00:00-05:00",
                isDaytime: true,
                temperature: 51,
                temperatureUnit: "F",
                temperatureTrend: null,
                probabilityOfPrecipitation: {
                    unitCode: "wmoUnit:percent",
                    value: 48
                },
                windSpeed: "10 mph",
                windDirection: "E",
                icon: "https://api.weather.gov/icons/land/day/rain_showers,50?size=medium",
                shortForecast: "Chance Rain Showers",
                detailedForecast: "A chance of rain showers. Mostly cloudy, with a high near 51."
            }
        ]
    }

    const currentForecast = weatherData?.forecastPeriods?.[0];
    const { temperature, temperatureUnit, shortForecast, windSpeed, detailedForecast, name } = currentForecast ?? {};

    const weekForecast = Array.from({ length: 7 });
    weatherData?.forecastPeriods?.forEach(x => x.name in weekdayIndices && (weekForecast[weekdayIndices[x.name as keyof typeof weekdayIndices]] = x))

    const Container = expanded ? ExpandedWidget : Widget;

    if(!weatherData) {
        return null;
    }

    return (
        <Container
            header={<>
                <div css={css`display: flex; flex-direction: column; color: white;`}>
                    <div css={css`display: flex; flex-direction: row; align-items: center; justify-content: space-between;`}>
                        <MaterialIcon icon='partly_cloudy_day' wght={300} addCssGetter={() => css`font-size: 4rem; color: yellow;`} />
                        <span css={css`font-size: 2.4rem;`}>{`${temperature}°${temperatureUnit}`}</span>
                    </div>

                    <div css={css`display: flex; flex-direction: row; align-items: center; justify-content: space-between;`}>
                        <span css={css``}>{shortForecast}</span>
                        <span css={css``}>{`${windSpeed} wind`}</span>
                    </div>
                </div>
            </>}
            addCssGetter={() => css`${ !expanded ? css`height: 100%;` : css``} background: #00aeff91; border-color: #70d2ffff; background: radial-gradient(#96bcde 60%, #5a96c6); background-size: 1000px 1000px; background-repeat: no-repeat;`}
            onLongPress={() => setExpanded(true)}
        >
            <div css={css`display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-top: auto; width: 100%; font-weight: 200;`}>
                {
                    weatherData?.forecastPeriods && weekForecast.map((x: any, i) => (
                        <div css={css`display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2px; width: 3.2rem; border-radius: 5px; background: ${new Date().getDay() == i ? '#ffffff48' : 'transparent'};`}>
                            <span css={css`color: #ffffff8e;`}>{x ? (x.name+'').charAt(0) : '--'}</span>
                            <span>{x ? `${x.temperature}°` : 'ERR'}</span>
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}
