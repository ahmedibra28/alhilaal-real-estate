import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query'

interface Fetch {
    method: string
    headers: {
        'Content-Type': string
    }
    body: string
}

interface GlobalQueryProps {
    queryKey: string[]
    url: string
    options?: Fetch
}

export function useGlobalQuery({
    queryKey,
    url,
    options,
}: GlobalQueryProps): UseQueryResult {
    return useQuery([queryKey], async () => {
        const res = await fetch(`/api/${url}`, { ...options })
        const json = await res.json()
        return json
    })
}
