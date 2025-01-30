import { NextRequest, NextResponse } from "next/server";

// pages/api/create-razorpay-order.js
// const Razorpay = require('razorpay');

import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req:NextRequest) {
    
        try {
            const body = await req.json();
            const { amount } = body;

            const options = {
                amount: amount * 100, // Convert to paise
                currency: 'INR',
                receipt: `receipt_${Date.now()}`, // Unique receipt ID
            };

            const order = await razorpay.orders.create(options);

            return NextResponse.json(order,{status : 200});

        } catch (error) {
            console.error('Error creating order:', error);
        }
    
    
}