import { create } from "zustand";

interface BookingState {
  eventId: string | null;
  eventName: string | null;
  userId: string | null;
  userName: string | null;
  timeSlot: string | null; // Not included in your schema, but can be derived
  totalSeats: number;
  availableSeats: number;
  price: number;
  setBookingDetails: (data: Partial<BookingState>) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  eventId: null,
  eventName: null,
  userId: null,
  userName: null,
  timeSlot: null,
  totalSeats: 0,
  availableSeats: 0,
  price: 0,
  setBookingDetails: (data) => set((state) => ({ ...state, ...data })),
  resetBooking: () =>
    set({
      eventId: null,
      eventName: null,
      userId: null,
      userName: null,
      timeSlot: null,
      totalSeats: 0,
      availableSeats: 0,
      price: 0,
    }),
}));
