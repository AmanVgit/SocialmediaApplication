import express from 'express';
import * as dotenv from 'dotenv';

import connectDB from './mongodb/connect.js';

import AuthRoute from './Routes/AuthRoute.js'
// import UserRoute from './Routes/UserRoute.js'
// import PostRoute from './Routes/PostRoute.js'


dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));



app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Server is Live',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_DB);
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

// usage of routes
app.use('/auth', AuthRoute)
// app.use('/user', UserRoute)
// app.use('/post', PostRoute)
