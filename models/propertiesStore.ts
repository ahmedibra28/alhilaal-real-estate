import { create } from 'zustand'

export interface IProperties {
    id: number
    name: string
    image: string
    location: string
    beds: number
    bathrooms: number
    pricePerMonth: number
}

export type PropertiesStore = {
    properties: IProperties[]
}

export const usePropertiesStore = create<PropertiesStore>((set) => ({
    properties: [
        {
            id: 1,
            name: 'TCC Apartment A-2-1',
            image: '/images/imgsix.png',
            location: 'Mogadishu',
            pricePerMonth: 1000,
            beds: 4,
            bathrooms: 1,
        },
        {
            id: 1,
            name: 'TCC Apartment A-4-1',
            image: '/images/imgfour.png',
            location: 'Beledweyne',
            pricePerMonth: 1000,
            beds: 4,
            bathrooms: 1,
        },
        {
            id: 1,
            name: 'TCC Apartment A-7-1',
            image: '/images/imgthree.png',
            location: 'Kismaayo',
            pricePerMonth: 1000,
            beds: 4,
            bathrooms: 1,
        },
    ],
}))
