import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate the input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the admin by email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    // If no admin is found, return an error
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await compare(password, admin.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email }, // Payload
      process.env.JWT_SECRET!, // Secret key (from environment variables)
      { expiresIn: '1h' } // Token expiration
    );

    // Return the token (excluding sensitive fields like password)
    return NextResponse.json(
      { token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}