const express = require('express');
const cors = require("cors")
const app = express();
require('dotenv').config()
const port = process.env.PORT
app.use(cors())
app.use(express.json());

const mainRouter = require('./routes/index')
app.use("/api/v1",mainRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
