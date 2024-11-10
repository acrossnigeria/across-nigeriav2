import Booking from "@/models/Booking";
import db from "../../../../utils/db";

const handler = async (req, res) => {
    const{param}=req.query;
    if(req.method==='GET' && param==='fetch'){
    
     try {
            await db.connect();
            const selectedDate = await Booking.find().lean();
            const convertedDate = selectedDate.map(db.convertDocToObj);
            await db.disconnect();
            return res.status(200).json(convertedDate); // Send the response back to the client
        } catch (error) {
            return res.status(500).json({ error: "Error fetching data" }); // Send error response
        }
    } 
    else if (req.method === 'GET' && param === 'show') {
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
  } 
    else if(req.method==='POST' && param==='save'){
        console.log("Body of request", req.body)
        const data= req.body;
                try {
            await db.connect();
            await Booking.insertMany(data);
                 await db.disconnect();
              res.send({ message: 'Date updated successfully' }); // Send the response back to the client
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