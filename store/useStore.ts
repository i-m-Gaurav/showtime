

interface ShowState {

    seatsBooked : number;
    setSeatsBooked : (data : number) => void;

}

import {create} from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware';

const useShowStore = create<ShowState>()(
  persist(
    (set) => ({
      seatsBooked: 0,
      setSeatsBooked: (value) => set({ seatsBooked: value }),
    }),
    {
      name: 'seats-storage',
    } as PersistOptions<ShowState>
  )
);



export default useShowStore