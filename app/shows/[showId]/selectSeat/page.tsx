// "use client";
// import SeatSelector from "@/components/SeatSelector";
// import useShowStore from "@/store/useStore";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader";

// interface Show {
//   id: string;
//   name: string;
//   description: string;
//   location: string;
//   date: string;
//   imageUrl: string;
//   totalSeats: number;
//   availableSeats: number;
// }

// export default function SeatSelectorExample({
//   params,
// }: {
//   params: { showId: string };
// }) {
//   const { showId } = params;

  
//   const { seatsBooked } = useShowStore(); // Get from Zustand
//   const router = useRouter();

//   console.log("seats booked ", seatsBooked);


//   const [bookingMessage, setBookingMessage] = useState<string | null>(null);
//   const [show, setShow] = useState<Show | null>(null);
//   const { data: session } = useSession();
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
//   const [totalSeats, setTotalSeats] = useState<number | null>(null); // State for totalSeats
//   // const [seatsBooked, setSeatsBooked] = useState<number>(1); // State for seatsBooked

//   // load the razorpay script.
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   useEffect(() => {
//     const getTotalSeats = async () => {
     
//         const response = await axios.get("/api/getTotalSeats?eventId=" + showId);
//         setTotalSeats(response.data.totalSeats)

     
//     }

//     if(showId){
//       getTotalSeats();
//     }
   
//   },[showId])

  

  

//   const handleBooking = async () => {
//     setBookingMessage(null);
//     try {
//       const emailId = session?.user?.email;
//       console.log(emailId);

//       //getTotalSeats

     

      

//       const response = await axios.get("/api/user?email=" + emailId);

//       const id = response.data.id;

//       console.log(emailId);

//       console.log("selected seats " ,{selectedSeats});

//       const res = await axios.post("/api/createOrder", {
//         amount: 1 * seatsBooked,
//       });
//       const order = res.data;
//       console.log("order", order);
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         throw new Error("Failed to load Razorpay script");
//       }

//       //options
//       // Step 3: Open Razorpay Payment Modal
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount * 100,
//         currency: order.currency,
//         name: "Show Time",
//         description: "Booking Payment",
//         order_id: order.id,
//         handler: async (res: any) => {
//           // Step 4: Verify Payment and Confirm Booking
//           try {
//             const verifyResponse = await axios.post("/api/verifyPayment", {
//               razorpayPaymentId: res.razorpay_payment_id,
//               razorpayOrderId: res.razorpay_order_id,
//               razorpaySignature: res.razorpay_signature,
//             });

//             if (verifyResponse.data.success) {
//               // Step 5: Create Booking Record in Database
//               await axios.post("/api/bookings", {
//                 userId: id,
//                 userContact: emailId,
//                 showId,
//                 seatsBooked,
//                 selectedSeats,
//                 paymentReference: res.razorpay_payment_id,
//               });
//               // when bookind is success , send the user to the home route.
//               router.push('/')

//               setBookingMessage("Booking successful!");
//               setShow((prev) =>
//                 prev
//                   ? {
//                       ...prev,
//                       availableSeats: prev.availableSeats - seatsBooked,
//                     }
//                   : prev
//               );
//             } else {
//               setBookingMessage("Payment verification failed.");
//             }
//           } catch (error) {
//             console.error("Error verifying payment:", error);
//             setBookingMessage("Payment verification failed.");
//           }
//         },
//         prefill: {
//           name: session?.user?.name,
//           email: session?.user?.email,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razorpayInstance = new (window as any).Razorpay(options);
//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Error booking show:", error);
//       setBookingMessage("Booking failed");
//     }
//   };

//   return (
//     <>
//       {/* Pass totalSeats to SeatSelector */}
//       {totalSeats !== null ? (
//         <SeatSelector
//           totalSeats={totalSeats}
//           maxSelectable={seatsBooked}
//           eventId={showId}
//           selectedSeats={selectedSeats}
//           setSelectedSeats={setSelectedSeats}
//         />
//       ) : (
//         <div>
//           <Loader/>

//         </div>
      
//       )}
//       <div className="flex justify-center flex-col p-4">

//       <Button onClick={handleBooking} className="bg-red-500">Pay amount</Button>
//       {bookingMessage && (
//         <p className="mt-2 text-sm text-gray-600 ">{bookingMessage}</p>
//       )}

//       </div>
      
//     </>
//   );
// }


"use client";
import SeatSelector from "@/components/SeatSelector";
import useShowStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import jsPDF from 'jspdf'; // Import jsPDF

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
  const [show, setShow] = useState<Show | null>(null); // State to hold show details
  const { data: session } = useSession();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalSeats, setTotalSeats] = useState<number | null>(null); // State for totalSeats
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [bookingDataForTicket, setBookingDataForTicket] = useState<any | null>(null); // Store booking data for ticket in modal


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
      setTotalSeats(response.data.totalSeats);
    }
    const fetchShowDetails = async () => { // Fetch show details
      try {
        const response = await axios.get(`/api/shows/${showId}`);
        setShow(response.data.data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };


    if(showId){
      getTotalSeats();
      fetchShowDetails(); // Fetch show details on component mount
    }

  },[showId]);


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createTicketPDF = (booking: any, showDetails: Show | null) => { // Rename to createTicketPDF and return doc
    if (!showDetails) {
      console.error("Show details are not available for ticket generation.");
      return null; // Return null if showDetails is missing
    }

    const doc = new jsPDF();

    // Ticket Header
    doc.setFontSize(22);
    doc.text(`Event Ticket`, 20, 30);

    // Event Details
    doc.setFontSize(16);
    doc.text(`${showDetails.name}`, 20, 50);
    doc.setFontSize(12);
    doc.text(`Date: ${formatDate(showDetails.date)}`, 20, 65);
    doc.text(`Location: ${showDetails.location}`, 20, 75);

    // Booking Details
    doc.setFontSize(14);
    doc.text(`--- Booking Details ---`, 20, 95);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking.id}`, 20, 105);
    doc.text(`User Email: ${booking.userContact}`, 20, 115);
    doc.text(`Seats Booked: ${booking.seatsBooked} (Seats: ${selectedSeats.join(', ')})`, 20, 125); // Use selectedSeats here
    doc.text(`Payment Ref: ${booking.paymentReference}`, 20, 135);
    doc.text(`Booking Date: ${formatDate(booking.bookingDate)}`, 20, 145);


    // Footer or any other info
    doc.setFontSize(10);
    doc.text(`Thank you for your booking!`, 20, 165);
    doc.text(`[Your Website/Company Name]`, 20, 175); // Replace with your website/company name

    return doc; // Return the jsPDF doc object
  };

  const downloadTicketPDF = (booking: any, showDetails: Show | null) => {
    const doc = createTicketPDF(booking, showDetails);
    if (doc) {
      doc.save(`ticket_${booking.id}.pdf`); // Download the PDF
    }
  };


  const handleBooking = async () => {
    setBookingMessage(null);
    try {
      const emailId = session?.user?.email;
      console.log(emailId);


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
              const bookingResponse = await axios.post("/api/bookings", { // Capture booking response
                userId: id,
                userContact: emailId,
                showId,
                seatsBooked,
                selectedSeats,
                paymentReference: res.razorpay_payment_id,
              });

              if(bookingResponse.status === 201) {
                const bookingData = bookingResponse.data.booking;
                setBookingDataForTicket(bookingData); // Store booking data
                setIsModalOpen(true); // Open the modal
                setBookingMessage("Booking successful!");


              } else {
                setBookingMessage("Booking creation failed after successful payment.");
              }


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

  const closeModal = () => {
    setIsModalOpen(false);
    setBookingDataForTicket(null); // Clear booking data when modal closes
  };


  return (
    <>
      {/* Pass totalSeats to SeatSelector */}
      {totalSeats !== null && show ? ( // Conditionally render SeatSelector and ensure show is loaded
        <SeatSelector
          totalSeats={totalSeats}
          maxSelectable={seatsBooked}
          eventId={showId}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
      ) : (
        <div>
          <Loader/>
        </div>
      )}

      <div className="flex justify-center p-4">
        <Button onClick={handleBooking} className="bg-red-500 w-1/3" disabled={selectedSeats.length !== seatsBooked}> {/* Disable button if selected seats count != seatsBooked */}
          Pay amount
        </Button>
        {/* {bookingMessage && (
          <p className="mt-2 text-sm text-gray-600 text-center">{bookingMessage}</p>
        )} */}
      </div>

      {/* Booking Confirmation Modal */}
      {isModalOpen && bookingDataForTicket && show && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">Booking Confirmed!</h2>
            <div className="mb-4 p-2 border border-gray-200 rounded">
              <h3 className="text-md font-semibold">Ticket Preview:</h3>
              <p className="text-sm">Event: {show.name}</p>
              <p className="text-sm">Booking ID: {bookingDataForTicket.id}</p>
              <p className="text-sm">Seats: {selectedSeats.join(', ')}</p>
              {/* Add more preview details here if needed */}
            </div>

            <div className="flex justify-around gap-4">
              <Button variant="outline" onClick={() => {
                  downloadTicketPDF(bookingDataForTicket, show);
                  closeModal(); // Close modal after download starts
                  router.push('/'); // Go to home page after download starts
                }}>
                Download PDF & Go Home
              </Button>
              <Button variant="secondary" onClick={() => {
                  closeModal();
                  router.push('/'); // Just go to home page
                }}>
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}