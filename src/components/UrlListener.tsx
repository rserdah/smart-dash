// Modified from Gemini
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export function UrlListener() {
    const { roomId } = useParams();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(roomId) {
            // Sync the URL param to the Global Query Cache
            queryClient.setQueryData(['roomId'], Number(roomId));
        }
    }, [roomId, queryClient]);

    return null; // This component doesn't render anything UI-wise
}
