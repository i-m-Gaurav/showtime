import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        
        const { userId, showId, seatsBooked } = body; // Changed from showId to eventId

        const eventId = showId; // Changed from showId to eventId

        console.log("Booking request:", { userId, showId, seatsBooked });

        // Fetch event details
        const event = await prisma.event.findUnique({
            where: { id: showId },
        });

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        // Check seat availability
        if (event.availableSeats < seatsBooked) {
            return NextResponse.json({ message: "Not enough available seats" }, { status: 400 });
        }

        // Create a booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                eventId, // Matches your schema
                seatsBooked,
                bookingDate: new Date(),
                status: "booked",
            },
        });

        // Update available seats
        await prisma.event.update({
            where: { id: eventId },
            data: { availableSeats: event.availableSeats - seatsBooked },
        });

        return NextResponse.json({ message: "Booking successful", booking }, { status: 201 });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
