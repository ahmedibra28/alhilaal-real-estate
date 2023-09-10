import { createContext } from 'react'

interface IStore {
    properties: any[]
}

export const StoreContext = createContext<IStore>({
    properties: [],
})
