import axios from 'axios';
import {Router} from 'express';

import Model from '../models/Model.js';

const router = Router();

const checkCache = async (_, res,) => {
	try {
		// Find cached data in the database
		const cachedData = await Model.findOne();

		// If cached data exists and its last updated time is within 15 seconds
		if (cachedData && Date.now() - cachedData.lastUpdated.getTime() < 15000) {
			// Return cached data
			res.json(cachedData.data);
		} else {
			// Fetch fresh data from the feed
			const response = await axios.get('https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json');
			const freshData = response.data;

			// Update or create cached data in the database
			if (cachedData) {
				cachedData.data = freshData;
				cachedData.lastUpdated = new Date();
				await cachedData.save();
			} else {
				await Model.create({data: freshData, lastUpdated: new Date()});
			}

			// Return fresh data
			res.json(freshData);
		}
	} catch (err) {
		console.error('Error:', err);
		res.status(500).send('Server Error');
	}
};
// GET all items
router.get('/data', checkCache);

export default router;
