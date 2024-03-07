import axios from 'axios';
import {Router} from 'express';

import Model from '../models/Model.js';

const router = Router();

const checkCache = async (req, res, next) => {
	try {
		const cachedData = await Model.findOne({sport: req.params.sport, gameId: req.params.gameId});
		if (cachedData && Date.now() - cachedData.lastUpdated.getTime() < 15000) {
			console.log('\nSending game data from cache.');
			return res.json(cachedData.data);
		}
		console.log('\nCache game data not found or expired; fetching fresh game data.');
		return next();
	} catch (e) {
		console.error('Error:', e);
		res.status(500).send('Server Error!');
	}
};

const fetchFreshData = async (req, res) => {
	try {
		const [cachedData, response] = await Promise.all([
			Model.findOne({sport: req.params.sport, gameId: req.params.gameId}),
			axios.get(`https://chumley.barstoolsports.com/dev/data/games/${req.params.gameId}.json`)
		]);
		const freshData = response.data;

		if (cachedData) {
			console.log('Updating cache.');
			cachedData.data = freshData;
			cachedData.lastUpdated = new Date();
			await cachedData.save();
		} else {
			console.log('Inserting into cache.');
			await Model.create({
				sport: req.params.sport,
				gameId: req.params.gameId,
				data: freshData,
				lastUpdated: new Date()
			});
		}
		console.log('Sending fresh game data.');
		return res.json(freshData);
	} catch (e) {
		console.error('Error:', e);
		res.status(500).send('Server Error!');
	}
};

router.get('/:sport/:gameId', checkCache, fetchFreshData);

export default router;
