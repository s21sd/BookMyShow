const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  // To use the cookie
const authRotes = require('./Routes/Auth');
const adminRoutes = require('./Routes/Admin');
const cors = require("cors");
const port = 8000;
require('dotenv').config();
require('./db');
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000'];  // allow only for the local host site of the next js 
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);
app.use(cookieParser());

// Here I am using my router 
app.use('/auth', authRotes);
app.use('/admin', adminRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Api is woking fine"
    })
})


app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})






