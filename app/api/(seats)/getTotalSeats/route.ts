import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request : NextRequest)  {


    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId'); // Get eventId from query string

    
    try {

        console.log(eventId)
        
        const event = await prisma.event.findUnique({
            where: { id : eventId },
            select: { totalSeats: true }
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ totalSeats: event.totalSeats });

    } catch (error) {
        console.error("Error",error)
        return NextResponse.json({ error: "Failed to fetch seats" }, { status: 500 });
    }
}