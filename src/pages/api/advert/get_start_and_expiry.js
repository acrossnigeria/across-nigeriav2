import db from "../../../../utils/db";
import Advert from "@/models/Advert";

const Handler = async ( req, res ) => {
    function hasDatePassed(dateString) {
        // Expected format: 'YYYY-MM-DD'
        const inputDate = new Date(dateString);
        
        // Set today's date to midnight for accurate comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Strip time
      
        // Also set the input date to midnight to match format
        inputDate.setHours(0, 0, 0, 0);
      
        // Compare
        return inputDate < today;
    }

    const advertMaxSlot = {
        "Bronze": {
            max:2
        },
        "Diamond": {
            max:2
        },
        "Gold": {
            "static":1,
            "scroll":10
        },
        "Silver": {
            "static":1,
            "scroll":10
        }
    }

    function getNewAdvertDates(existingExpiryDates, advertDurationDays, maxSlot) {
        const formatDate = date => date.toISOString().split('T')[0];
        if (existingExpiryDates.length+1 < maxSlot ) {

            const today = new Date();
            const startDate = formatDate(today);

            const todayToExpiry = new Date();
            todayToExpiry.setDate(today.getDate() + advertDurationDays); 
            const expiryDate = formatDate(todayToExpiry);

            return { startDate, expiryDate }
                
        } else {
            // Convert all date strings to Date objects
            const dateObjects = existingExpiryDates.map(date => new Date(date));

            // Find the latest expiry date
            const latestExpiryDate = new Date(Math.max(...dateObjects));

            // Generate a new start date (next day after latest expiry)
            const newStartDate = new Date(latestExpiryDate);
            newStartDate.setDate(newStartDate.getDate() + 1);

            // Generate a new expiry date by adding the advert duration
            const newExpiryDate = new Date(newStartDate);
            newExpiryDate.setDate(newExpiryDate.getDate() + advertDurationDays);

            // Format the dates to "YYYY-MM-DD"

            return {
                startDate: formatDate(newStartDate),
                expiryDate: formatDate(newExpiryDate)
            };
        }
    }


    try {

        if ( req.method === "POST" ) {
            const { type, days, displayMode } = req.body;

            await db.connect();
            console.log('Connected to database')
            const adverts = await Advert.find( { advertTypeName:type } );
            console.log(adverts)
            await db.disconnect();
            console.log('Disconnected from database')
            const liveAdverts = adverts.filter( ad => !hasDatePassed(ad.expiryDate));
            const liveAdvertsExpiryDates = liveAdverts.map( ad => ad.expiryDate );
            
            console.log(type, displayMode)
            const maxSlot = (type === "Diamond" || type === "Bronze") ? advertMaxSlot[type]?.max : advertMaxSlot[type][displayMode];
            const datesData = getNewAdvertDates( liveAdvertsExpiryDates, days, maxSlot );

            res.status(200).json( { success:true, datesData } );

        } else {
            res.status(403).json( { msg:'Method not allowed', success:false } );
        }

    } catch(err) {
        console.log(err)
        res.status(500).json( { error:err.message, msg:'Something went wrong', success:false } );
    }
}

export default Handler;