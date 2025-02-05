import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';

export async function GET(req:NextRequest){

    //Getting the user email for something, i don't know. probably delete this route later.
    
    const email = req.nextUrl.searchParams.get('email');
    const user = await prisma.user.findUnique({
        where : {
            email: email ?? undefined,
        }
    });
    return NextResponse.json(user, {status: 200});
}