import mongoose from 'mongoose';

const Model = mongoose.model(
	'Model',
	new mongoose.Schema({
		sport: String,
		gameId: String,
		data: Object,
		lastUpdated: Date
	})
);

export default Model;
