import Booking from "@/models/Booking";
import Comment from "@/models/Comment";
import db from "../../../../utils/db";

const handler = async (req, res) => {
    const{param}=req.query;
    if(req.method==='GET'){
        try {
            const today = new Date();
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'};
            const brokenDateStr = today.toLocaleDateString('en-US', options).split(', ');
            const formatedDate = `${brokenDateStr[0]} ${brokenDateStr[1]} ${brokenDateStr[2]}`

            console.log(formatedDate);
            
            await db.connect();
            const allBookings = await Booking.find().lean();
            const bookings = [];
            allBookings.map(booking => {
              const isFit = booking.dateSelected === formatedDate;
              if (isFit) { bookings.push( booking )};
            });
            
            await db.disconnect();
            return res.status(200).json(bookings); // Send the response back to the client
        } catch (error) {
            return res.status(500).json({ error: "Error fetching data" }); // Send error response
        }

    }  else if (req.method === 'GET' && param === 'show') {

      try {
        await db.connect();

        // Get today's date in the same format as `dateSelected`
        const today = new Date().toDateString(); // Format: "Fri May 31 2024"
          console.log("todays date",today)
        // Find bookings with dateSelected equal to today's date
        const bookings = await Booking.find({ dateSelected: today }).lean();
        
        await db.disconnect();

        if (bookings.length > 0) {
          // Send the bookings found for today
          console.log("Bookings Found",bookings)
          return res.status(200).json(bookings);
        } else {
          // No bookings found for today
          return res.status(404).json({ message: "No bookings found for today" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        await db.disconnect();
        return res.status(500).json({ error: "Error fetching data" });
      }

    } else if(req.method==='PATCH') {
        console.log("Body of request", req.body)
        const { dateSelected, category, name, shoutOut, bookingId, user } = req.body;
        const finalizedBooking = {
          dateSelected,
          category,
          name,
          shoutOut,
          finalized:'true',
          user,
        }
        try {
            await db.connect();
            const booking = await Booking.findByIdAndUpdate(bookingId, finalizedBooking, { new: true} );
            await db.disconnect();
            res.send({ message: 'Shout out booked successfully!' }); // Send the response back to the client
        } catch (error) {
            console.error("Error Uploading data:", error);
            return res.status(500).json({ error: "Error updating Booking" }); // Send error response
        }
    }
    else if(req.method==='POST'){
      console.log("Body of request", req.body)
      const { mediaUrl, user }= req.body;
      try {
        await db.connect();
        const tempBooking = await Booking.create({ mediaUrl, user });
        await db.disconnect();
        res.send({ message: 'Temporary Booking created', tempBooking }); // Send the response back to the client
      } catch (error) {
          console.error("Error Uploading data:", error);
          return res.status(500).json({ error: "Error updating Booking" }); // Send error response
      }
  }
  
    else {
        return res.status(400).json({ error: "Invalid request" }); // Send error response for invalid request method or query
    }
}
export default handler;