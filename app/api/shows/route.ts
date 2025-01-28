import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const shows = await prisma.event.findMany();
        
        // Explicitly handle unexpected null/undefined case
        const safeShows = Array.isArray(shows) ? shows : [];
        
        return NextResponse.json({ data: safeShows }, { status: 200 });
    } catch (error: unknown) {
        // Enhanced error logging
        console.error("Error fetching shows:", error instanceof Error ? error.message : "Unknown error");
        
        // Ensure we always return a valid JSON response
        return NextResponse.json(
            { 
                error: "Failed to fetch shows",
                details: error instanceof Error ? error.message : null
            },
            { status: 500 }
        );
    }
}