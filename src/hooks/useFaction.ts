import { create } from 'zustand'
import type { Faction } from '@/utils/constants'

type State = { 
  faction: Faction;
  setFaction: (faction: Faction) => void
}
const useFaction = create<State>((set) => ({
  faction: 'DOG',
  setFaction: (faction) => set(() => ({ faction: faction }))
}))

export default useFaction
