import { create } from 'zustand'

export type IGlobalStore = {
    openModal: boolean
    onOpenModal: (value?: boolean) => void
}

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
    openModal: false,

    onOpenModal(value?: boolean) {
        set({ openModal: value || !get().openModal })
    },
}))
