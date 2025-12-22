/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface MaterialIconProps {
    icon: string;
    fill?: number;
    wght?: number;
    grad?: number;
    opsz?: number;
    addCssGetter?: typeof css;
}

const Icon = styled.span<{ $fill?: number, $wght?: number, $grad?: number, $opsz?: number }>`
    font-variation-settings:
        'FILL' ${p => p.$fill ?? 0},
        'wght' ${p => p.$wght ?? 200},
        'GRAD' ${p => p.$grad ?? 0},
        'opsz' ${p => p.$opsz ?? 24};
`;

export default function MaterialIcon({ icon, fill, wght, grad, opsz, addCssGetter } : MaterialIconProps) {
    return (
        <Icon className='material-symbols-outlined' css={addCssGetter?.()} $fill={fill} $wght={wght} $grad={grad} $opsz={opsz}>
            {icon}
        </Icon>
    )
}
