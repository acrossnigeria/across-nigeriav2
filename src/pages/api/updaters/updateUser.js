import { Parser } from 'json2csv';
import db from '../../../../utils/db';
import TheaterSkit from '@/models/TheaterSkit';
import TheaterSkitVote from '@/models/TheaterSkitVote';
import User from '@/models/User';
import { CountrySelector } from 'react-international-phone';

const Handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const startDate = new Date('2025-04-25');

            const users = await User.find({ createdAt: { $gte: startDate } })

            const phonesAndAccounts = {};
            const duplicateAccounts = [];
            users.map( ( user ) => {
                if (!phonesAndAccounts[user.phone]) {
                    phonesAndAccounts[user.phone] = [];
                };
                phonesAndAccounts[user.phone].push(user._id);
            });

            for ( let phone in phonesAndAccounts ) {
                if ( phonesAndAccounts[phone].length > 1 ) {
                    duplicateAccounts.push(...phonesAndAccounts[phone]);
                }
            }
            console.log(`the length of duplicate accounts is ${duplicateAccounts.length}`);

            if ( duplicateAccounts.length > 0) {
                await TheaterSkitVote.deleteMany( { user: { $in:duplicateAccounts }});
                console.log(`Deleted ${duplicateAccounts.length} votes created with duplicate fake accounts`);
                await User.deleteMany( { _id: { $in:duplicateAccounts}});
                console.log(`Deleted ${duplicateAccounts.length} duplicate fake accounts`);
            } else {
                console.log('No duplicate accounts found');
            }


            
            
            res.status(200).json( { duplicateAccounts });
        } else {
            res.status(405).json({ success: false, error: 'Method Not Allowed' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export default Handler;
