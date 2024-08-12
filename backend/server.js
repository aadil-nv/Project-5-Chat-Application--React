const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const colors = require("colors");
const userRoute = require('./Routes/userRoute');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const cors = require('cors');
const chatRoute = require('./Routes/chatRoute');

dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("API is running")
});


app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);


app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log(`server started on port http://localhost:${PORT}`.bgBrightYellow.bold.underline));

