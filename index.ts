import express from 'express';
import { connectDB } from './database/db';
import {userRoute} from './routes/user_routes'
import bodyParser from 'body-parser';
import { contractRoute } from './routes/contract_routes';
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 4500;
app.use(express.json());
app.use(bodyParser.json());



// routes
app.use("/user",userRoute);
app.use("/contract",contractRoute);



// connecting to database and starting server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
        console.log(`url : "http://localhost:${PORT}"`)
    })
})
    .catch((error: Error) => {
        console.log(error)
    })
