// Backend: app/api/shows/[showId]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { showId: string } }
) {
    const { showId } = params;

    try {
        if (!showId) {
            return NextResponse.json(
                { error: 'Show ID is required' },
                { status: 400 }
            );
        }

        const show = await prisma.event.findUnique({
            where: { id: showId },
            select: {
                id: true,
                description: true,
                name : true,
                date : true,
                location : true,
                imageUrl : true,
                totalSeats : true,
                availableSeats : true,
                

                // Add other fields you want to return
            }
        });

        if (!show) {
            return NextResponse.json(
                { error: 'Show not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: show });
    } catch (error) {
        console.error('Error fetching show:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}