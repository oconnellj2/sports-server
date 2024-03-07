import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
	data: Object,
	lastUpdated: Date
	// Add more fields as needed
});

const Model = mongoose.model('Model', modelSchema);

export default Model;