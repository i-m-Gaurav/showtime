'use client'
import type React from "react"
import { useState, useCallback } from "react"

interface SeatSelectorProps {
  totalSeats: number
  maxSelectable: number
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({ totalSeats, maxSelectable }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  const handleSeatClick = useCallback(
    (seatId: number) => {
      setSelectedSeats((prevSelected) => {
        if (prevSelected.includes(seatId)) {
          // If the seat is already selected, remove it
          return prevSelected.filter((id) => id !== seatId)
        } else if (prevSelected.length < maxSelectable) {
          // If the seat is not selected and we haven't reached the max, add it
          return [...prevSelected, seatId]
        }
        // If we've reached the max selectable, don't change anything
        return prevSelected
      })
    },
    [maxSelectable],
  )

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select up to {maxSelectable} seats</h2>
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatId = index + 1
          const isSelected = selectedSeats.includes(seatId)
          return (
            <div
              key={seatId}
              className={`
                w-8 h-8 flex items-center justify-center rounded-md cursor-pointer
                ${isSelected ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"}
                ${selectedSeats.length >= maxSelectable && !isSelected ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={() => handleSeatClick(seatId)}
            >
              {seatId}
            </div>
          )
        })}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Seats:</h3>
        <p>{selectedSeats.join(", ")}</p>
      </div>
    </div>
  )
}

// Example usage
export default function SeatSelectorExample() {
  return <SeatSelector totalSeats={50} maxSelectable={5} />
}

