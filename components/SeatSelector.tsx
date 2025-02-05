"use client"
import React, { useState, useCallback, useEffect } from "react"

interface SeatSelectorProps {
  totalSeats: number
  maxSelectable: number
  eventId: string
  selectedSeats: number[]
  setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ totalSeats, maxSelectable, eventId, selectedSeats, setSelectedSeats }) => {
  const [seats, setSeats] = useState<{ id: string; number: number; status: string }[]>([]);







  useEffect(() => {
    const fetchSeats = async () => {
      const response = await fetch('/api/seats/?eventId='  + eventId);
      const data = await response.json();
      console.log('seat data',data);
      setSeats(data.seats);
    };

    fetchSeats();
  }, [eventId]);








  console.log('seats',{seats});

  const handleSeatClick = useCallback(
    (seatNumber: number) => {
      setSelectedSeats((prevSelected) => {
        if (prevSelected.includes(seatNumber)) {
          // Deselect the seat
          return prevSelected.filter((id) => id !== seatNumber);
        } else if (prevSelected.length < maxSelectable) {
          // Select the seat
          return [...prevSelected, seatNumber];
        }
        return prevSelected;
      });
    },
    [maxSelectable, setSelectedSeats]
  );

  // Debugging: Log the selected seats whenever they change
  useEffect(() => {
    console.log("Selected Seats:", selectedSeats);
  }, [selectedSeats]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select up to {maxSelectable} seats</h2>
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1;
          const seat = seats.find((s) => s.number === seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);
          const isBooked = seat?.status === "booked";
          return (
            <div
              key={seatNumber}
              className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer ${
                isSelected ? "bg-red-500 text-white" : isBooked ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
              } ${selectedSeats.length >= maxSelectable && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isBooked && handleSeatClick(seatNumber)}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Seats:</h3>
        <p>{selectedSeats.join(", ") || "None"}</p>
      </div>
    </div>
  );
};

export default SeatSelector;