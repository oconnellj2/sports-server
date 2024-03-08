import express from 'express';
import {connect} from 'mongoose';

import router from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB.
connect('mongodb://localhost:27017/myDatabase')
	.then(() => console.log('MongoDB connected'))
	.catch(e => console.error('MongoDB connection error:', e));

// Define context root.
app.use('/box-score', router);
// Start server.
app.listen(PORT, () => console.log(`Access via: http://localhost:${PORT}/box-score/:sport/:gameId`));
