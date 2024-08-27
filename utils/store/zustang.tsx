import { create } from 'zustand'
import { Member } from '../types'

type State = {
  member: Member[];
}


type Action = {
    ZupdateMember: (member: State['member']) => void
    // updateLastName: (lastName: State['lastName']) => void
  }


// Create your store, which includes both state and (optionally) actions
export  const useMemberStore = create<State & Action>((set) => ({
    member: [] , 
    ZupdateMember: (member) => set(() => ({ member: member })),
  }))