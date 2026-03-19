/** @jsxImportSource @emotion/react */
import { useTransition } from 'react';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import ToggleButton from "@/components/input/ToggleButton";
import Widget from '@/components/Widget';
import ToggleSwitch from "@/components/input/ToggleSwitch";
import InputLinearSlider from '@/components/input/InputLinearSlider';
import { useDebouncedState } from '../../useDebouncedState';
import InputKnob from '@/components/input/InputKnob';

type Props = {
    state: any; // DeviceState;
    actions: any; // DeviceActions;
    setExpanded: (expanded: boolean) => void;
    expanded: boolean;
    device: any;
};

function hexToRgb(hex: string) {
    return [
        parseInt(hex.substring(1, 3), 16),
        parseInt(hex.substring(3, 5), 16),
        parseInt(hex.substring(5, 7), 16),
    ];
}

function rgbToHex(rgb: [number, number, number], withHash: boolean = false) {
    return rgb.reduce((c: string, x: number) => c + x.toString(16).padStart(2, '0'), withHash ? '#' : '');
}

export default function LightWidgetCompactContent({ device, state, actions, setExpanded, expanded }: Props) {
    // const [_brightness, _setBrightness] = useState(state.brightness);

    // useEffect(() => _setBrightness(state.brightness), [state.brightness]);

    // const debouncedSetBrightness = useDebounce((x: number) => actions.setBrightness(x), 75);

    // const setBrightness = useCallback((x: number) => {
    //     if(x > 0 && !state.power) {
    //         actions.setPower(true);
    //     }

    //     _setBrightness(x);
    //     debouncedSetBrightness(x);
    // }, [state.power, actions.setPower, _setBrightness, debouncedSetBrightness]);

    const [isColorPending, startColorTransition] = useTransition();

    const onColorChange = (e: any) => {
        const color = e.target.value;

        startColorTransition(() => {
            _setColor(hexToRgb(color));
        });
    };

    const [_brightness, _setBrightness] = useDebouncedState((x: number) => {
        if(x > 0 && !state.power) {
            actions.setPower(true);
        }
        else if(x <= 0 && state.power) {
            actions.setPower(false);
        }
    }, state.brightness, actions.setBrightness, 75);
    
    const [_color, _setColor] = useDebouncedState((x: [number, number, number]) => {
        if(x.reduce((s: number, v: number) => s + v, 0) > 0 && !state.power) {
            actions.setPower(true);
        }
        else if(x.reduce((s: number, v: number) => s + v, 0) <= 0 && state.power) {
            actions.setPower(false);
        }
    }, state.color, actions.setColor, 75);

    const hexColor = _color ? rgbToHex(_color, true) : '#000000';

    return (
        <Widget
            addCssGetter={() => css`height: 100%;`}
            header={<div css={css`display: flex; flex-direction: row; justify-content: space-between; gap: 10px;`}>
                <span css={css`color: white;`}>{device?.name || 'Name N/A'}</span>
                <ToggleSwitch checked={state.power} onToggle={actions.setPower} stopPointerDownPropagation />
            </div>}
            onLongPress={() => setExpanded(true)}
        >
            { device.capabilities.includes('brightness') && <span>{state.power ? _brightness : 0}%</span> }

            <div css={css`display: flex; flex-direction: row;`}>
                <div css={css`display: flex; flex-direction: row; flex-basis: 33%;`}>
                    <ToggleButton
                        name='ToggleButton1'
                        checked={state.power}
                        onChange={actions.setPower}
                    />
                </div>

                <div css={css`display: flex; flex-direction: row; flex-basis: 33%;`}>
                    { device.capabilities.includes('brightness') && <InputKnob name='' /* onChange={console.log} */ value={(_brightness / 100) * (160 - -160) + -160} min={-160} max={160} onChange={_setBrightness} mapOnChange stopPointerDownPropagation /> }
                </div>

                <div css={css`display: flex; flex-direction: row; justify-content: flex-end; flex-basis: 33%;`}>
                    { device.capabilities.includes('color') && <input type='color' value={hexColor} onChange={onColorChange} /> }
                </div>
            </div>

            { device.capabilities.includes('brightness') && <InputLinearSlider
                value={_brightness}
                onChange={_setBrightness}
                // disabled={!state.power}
                stopPointerDownPropagation
            /> }
        </Widget>
    )
}
