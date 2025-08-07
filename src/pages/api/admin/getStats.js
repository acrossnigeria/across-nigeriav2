import db from "../../../../utils/db";
import User from "@/models/User";

const nigeriaStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const genders = [ 'male', 'female' ]
const ageGroup = [  { group :'18-24', top: 24, low: 18 },
                    { group :'25-34', top: 34, low: 24 }, 
                    { group :'35-44', top: 44, low: 35 }, 
                    { group :'45-above', top: 1000, low: 45 }
                ]

const Handler = async ( req, res) => {

    // compares two date and returns the days between them
    function calcDaysBetween( date1, date2 ) {
        const oneDayInMs = 1000 * 60 * 60 * 24;
        const differenceInMs = Math.abs(date2-date1);
        return Math.floor( differenceInMs / oneDayInMs );
    }

    if ( req.method === 'GET' ) {
        try {
            await db.connect();
            const data = await User.find().lean();
            const totalUsers = data.length;

            // Getting new users in the last 5 days
            const today = new Date();
            today.setHours(0, 0, 0, 0); // normalize date to midnight
            const newUsers = [];
            data.map( user => {
                let createdAt = user.createdAt;
                createdAt.setHours(0, 0, 0, 0); //normalize dates to midnight;
                let daysBetween = calcDaysBetween( createdAt, today );
                if ( daysBetween <= 5 ) {
                    let data = { fullname: `${user.name} ${user.surname}`, residence:user.residence, email:user.residence };
                    newUsers.push(data);
                }

            } )

            // Getting gender data
            const genderDataPrototype = { 'male':0, 'female':0 };
            genders.map( gender => {
                data.map( user => {
                    if ( user.gender === gender ) {
                        genderDataPrototype[gender] = genderDataPrototype[gender]+1;
                    }
                })
            })
            const genderData = Object.values(genderDataPrototype);

            //Getting state data
            const stateDataPrototype = {
                'Abia':0, 'Adamawa':0, 'Akwa Ibom':0, 'Anambra':0, 'Bauchi':0, 'Bayelsa':0, 'Benue':0, 'Borno':0,
                'Cross River':0, 'Delta':0, 'Ebonyi':0, 'Edo':0, 'Ekiti':0, 'Enugu':0, 'FCT':0, 'Gombe':0, 'Imo':0,
                'Jigawa':0, 'Kaduna':0, 'Kano':0, 'Katsina':0, 'Kebbi':0, 'Kogi':0, 'Kwara':0, 'Lagos':0, 'Nasarawa':0,
                'Niger':0, 'Ogun':0, 'Ondo':0, 'Osun':0, 'Oyo':0, 'Plateau':0, 'Rivers':0, 'Sokoto':0, 'Taraba':0, 'Yobe':0, 'Zamfara':0
            };
            nigeriaStates.map( state => {
                data.map( user => { 
                    let isFromState = user.residence === state;
                    if (isFromState) {
                        let oldVal = stateDataPrototype[state];
                        let newVal = oldVal+1;
                        stateDataPrototype[state] = newVal;
                    }
                } )
            })
            //Getting state with lowest users and highest users
            let lowestStates = '';
            let highestStates = '';
            let highestVal = 0;
            let topPercentUsers = Math.floor((data.length*30)/100);

            // loop to determine highest users of a single state
            Object.entries( stateDataPrototype ).map( ( state ) => {
                if ( state[1] >= highestVal ) {
                    highestVal = state[1];
                }
            });

            Object.entries( stateDataPrototype ).map( ( state ) => {
                if ( state[1] < 11 ) {
                    lowestStates = `${lowestStates}${state[0]}: ${state[1]} users (${Math.floor((state[1]/totalUsers)*100)}%), `;
                }
                if ( state[1] > topPercentUsers ) {
                    highestStates = `${highestStates}${state[0]}: ${state[1]} users (${Math.floor((state[1]/totalUsers)*100)}%), `;
                }
            })
            const stateData = { lowestStates, highestStates, list:Object.values( stateDataPrototype ) };

            //Getting age groups
            const ageGroupPrototype = { '18-24':0, '25-34':0, '35-44':0, '45-above':0 };
            const presentYear = today.getFullYear();
            ageGroup.map( ( group )=> {
               data.map( user => {
                  let dob = user.dob;
                  let userAge = presentYear - Number(dob.slice(0, 4));
                  if ( userAge <= group.top && userAge >= group.low) {
                    ageGroupPrototype[group.group] = ageGroupPrototype[group.group] + 1
                  }
               });
            })

            let highestAgeGroup = { age: 0, group:'' }
            Object.entries(ageGroupPrototype).map( ( group ) => {
                if ( group[1] > highestAgeGroup.age ) {
                    highestAgeGroup.age = group[1];
                    highestAgeGroup.group = group[0];
                }
            })
            const ageData = { highestAgeGroup, list:Object.values(ageGroupPrototype) }

            const stats = { totalUsers, newUsers, stateData, genderData, ageData };

            await db.disconnect();
            res.status(200).json( { success:true ,  stats });
           } catch (err) {
            console.log(err.message)
             res.status(500).json( { error: err.message}) 
           }
    }
}

export default Handler;