"use client";
import SeatSelector from "@/components/SeatSelector";
import useShowStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Show {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
  totalSeats: number;
  availableSeats: number;
}

export default function SeatSelectorExample({
  params,
}: {
  params: { showId: string };
}) {
  const { showId } = params;

  
  const { seatsBooked } = useShowStore(); // Get from Zustand
  const router = useRouter();

  console.log("seats booked ", seatsBooked);


  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const { data: session } = useSession();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalSeats, setTotalSeats] = useState<number | null>(null); // State for totalSeats
  // const [seatsBooked, setSeatsBooked] = useState<number>(1); // State for seatsBooked

  // load the razorpay script.
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const getTotalSeats = async () => {
     
        const response = await axios.get("/api/getTotalSeats?eventId=" + showId);
        setTotalSeats(response.data.totalSeats)

     
    }

    if(showId){
      getTotalSeats();
    }
   
  },[showId])

  

  const handleBooking = async () => {
    setBookingMessage(null);
    try {
      const emailId = session?.user?.email;
      console.log(emailId);

      //getTotalSeats

     

      

      const response = await axios.get("/api/user?email=" + emailId);

      const id = response.data.id;

      console.log(emailId);

      console.log("selected seats " ,{selectedSeats});

      const res = await axios.post("/api/createOrder", {
        amount: 1 * seatsBooked,
      });
      const order = res.data;
      console.log("order", order);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      //options
      // Step 3: Open Razorpay Payment Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount * 100,
        currency: order.currency,
        name: "Show Time",
        description: "Booking Payment",
        order_id: order.id,
        handler: async (res: any) => {
          // Step 4: Verify Payment and Confirm Booking
          try {
            const verifyResponse = await axios.post("/api/verifyPayment", {
              razorpayPaymentId: res.razorpay_payment_id,
              razorpayOrderId: res.razorpay_order_id,
              razorpaySignature: res.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              // Step 5: Create Booking Record in Database
              await axios.post("/api/bookings", {
                userId: id,
                userContact: emailId,
                showId,
                seatsBooked,
                selectedSeats,
                paymentReference: res.razorpay_payment_id,
              });
              // when bookind is success , send the user to the home route.
              router.push('/')

              setBookingMessage("Booking successful!");
              setShow((prev) =>
                prev
                  ? {
                      ...prev,
                      availableSeats: prev.availableSeats - seatsBooked,
                    }
                  : prev
              );
            } else {
              setBookingMessage("Payment verification failed.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            setBookingMessage("Payment verification failed.");
          }
        },
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error booking show:", error);
      setBookingMessage("Booking failed");
    }
  };

  return (
    <>
      {/* Pass totalSeats to SeatSelector */}
      {totalSeats !== null ? (
        <SeatSelector
          totalSeats={totalSeats}
          maxSelectable={seatsBooked}
          eventId={showId}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
      ) : (
        <p>Loading seat information...</p>
      )}
      <Button onClick={handleBooking}>Pay amount</Button>
      {bookingMessage && (
        <p className="mt-2 text-sm text-gray-600">{bookingMessage}</p>
      )}
    </>
  );
}