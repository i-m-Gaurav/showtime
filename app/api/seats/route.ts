import { NextRequest, NextResponse } from "next/server";
import {prisma } from '@/lib/prisma';

export async function GET(request : NextRequest){

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId'); // Get eventId from query string

    try {

        if(!eventId){
            return NextResponse.json({error : "Show ID is required"}, {status : 400});
        }

        const seats = await prisma.seat.findMany({
            where : {eventId : eventId},
            select : {
                id : true,
                number : true,
                status : true,
            }
        })

        return NextResponse.json({ seats });
        
    } catch (error) {
        console.error("Error fetching seats details:", error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
          );
        
    }
}