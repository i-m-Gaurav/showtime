import { NextRequest,NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, showId, seatsBooked, paymentReference, userContact, selectedSeats } = body;

    console.log("✅ Booking request received:", { userId, showId, seatsBooked, paymentReference, userContact });
    console.log("🪑 Selected seats:", selectedSeats);

    const eventId = showId;

    // Fetch event details
    const event = await prisma.event.findUnique({
      where: { id: showId },
    });

    if (!event) {
      console.error("❌ Event not found:", showId);
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Check seat availability
    if (event.availableSeats < seatsBooked) {
      console.error("❌ Not enough available seats:", { availableSeats: event.availableSeats, requestedSeats: seatsBooked });
      return NextResponse.json({ message: "Not enough available seats" }, { status: 400 });
    }

    // Fetch seat IDs based on seat numbers
    const seats = await prisma.seat.findMany({
      where: {
        eventId: showId,
        number: { in: selectedSeats.map(Number) }, // Convert to numbers
      },
      select: { id: true },
    });

    const seatIds = seats.map(seat => seat.id);
    console.log("🪑 Fetched seat IDs:", seatIds);

    if (seatIds.length !== seatsBooked) {
      console.error("❌ Mismatch in seats booked and available seat IDs:", { seatIds, seatsBooked });
      return NextResponse.json({ message: "Some selected seats are unavailable" }, { status: 400 });
    }

    // Create a booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        seatsBooked,
        userContact,
        bookingDate: new Date(),
        status: "booked",
        paymentReference,
        Seat: {
          connect: seatIds.map((seatId: string) => ({ id: seatId })),
        },
      },
    });

    console.log("✅ Booking created:", booking);

    // Update seat status
    await prisma.seat.updateMany({
      where: {
        id: { in: seatIds },
      },
      data: {
        status: 'booked',
        bookingId: booking.id,
      },
    });

    console.log("✅ Seats updated to booked:", seatIds);

    // Update available seats
    await prisma.event.update({
      where: { id: eventId },
      data: { availableSeats: event.availableSeats - seatsBooked },
    });

    console.log("✅ Updated available seats:", event.availableSeats - seatsBooked);

    return NextResponse.json({ message: "Booking successful", booking }, { status: 201 });
  } catch (error) {
    console.error("❌ Booking error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
