// Modified from ChatGPT
import { useState } from 'react';
import WidgetPortal from '@/layout/WidgetPortal';

type WidgetContentProps = {
    setExpanded: (expanded: boolean) => void;
    expanded: boolean;
}

type Props = {
    compactRender: (props: WidgetContentProps) => React.ReactNode;
    expandedRender: (props: WidgetContentProps) => React.ReactNode;
};

export default function WidgetController({ compactRender, expandedRender }: Props) {
    const [expandedOpen, setExpandedOpen] = useState(false);

    return (
        <>
            {
                !expandedOpen ?
                    <>
                        {compactRender({ setExpanded: setExpandedOpen, expanded: expandedOpen })}
                    </>
                    :
                    <WidgetPortal expanded={expandedOpen} onClose={() => setExpandedOpen(false)}>
                        {expandedRender({ setExpanded: setExpandedOpen, expanded: expandedOpen })}
                    </WidgetPortal>
            }
        </>
    )
}
