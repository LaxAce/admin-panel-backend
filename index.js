import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import users from './routes/users.js';
import signup from './routes/signup.js';
import login from './routes/login.js';
import notFound from './middleware/not-found.js';
import verifyToken from './middleware/auth.js';
import cors from 'cors';

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
});

// routes
app.use('/api/v1/signup', signup);
app.use('/api/v1/login', login);
app.use('/api/v1/users', verifyToken, users);

app.use(notFound);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDB(process.env.DBURI);
        app.listen(port, console.log(`listening to port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
