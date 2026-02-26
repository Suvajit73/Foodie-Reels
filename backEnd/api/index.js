require("dotenv").config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../src/db/db');
const authRoutes = require('../src/routes/auth.routs')
const foodRoutes = require('../src/routes/food.routes')
const foodPartnerRoutes = require('../src/routes/food-partner.routes')


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());




// Routes
app.use(cors({
    origin: "https://foodie-reels-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes)

// vercel settings  start ------------------

let isConnected = false;

const startServer = async () => {

    try {

        if (!isConnected) {

            await connectDB();

            isConnected = true;

        }

    } catch (error) {

        console.error("❌ Error starting server:", error);

    }

};


app.use((req, res, next) => {
    if (!isConnected) {
        startServer();
    }
    next();
});

module.exports = app;