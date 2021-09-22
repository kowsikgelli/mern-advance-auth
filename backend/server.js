const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const errorHanlder = require('./middleware/error');
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(cors())


app.use("/",require('./routes/auth'))
app.use("/private",require("./routes/private"))

// error handler should be the last middleware the only error handler works from next
app.use(errorHanlder);
const PORT = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    {   useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology:true
    });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connection sucessful');
})

const server = app.listen(PORT,()=>console.log(`server running on ${PORT}`))

// process.on("unhandledRejection",(err,promise)=>{
//     console.log(`Error message: ${err}`)
//     server.close(()=>process.exit(1))
// })