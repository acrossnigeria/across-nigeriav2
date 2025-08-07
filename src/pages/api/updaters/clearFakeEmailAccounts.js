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


            
            
            res.status(200).json( { duplicateAccounts });
        } else {
            res.status(405).json({ success: false, error: 'Method Not Allowed' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export default Handler;
