import { useQueryClient, useQuery } from "@tanstack/react-query";

// Modified from Gemini
export function useCurrentRoom() {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['roomId'],
        // Since queryFn is required, make it return the current value to fulfill the requirement
        queryFn: () => queryClient.getQueryData(['roomId']) ?? 1,
        staleTime: Infinity,
        // Provide a fallback of 1 if the state hasn't been set yet
        initialData: 1,
    });
}
