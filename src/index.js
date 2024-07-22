const express = require("express");
const app = express();
//const quotesData = require("./quotes.json");
const userRoute = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5001;

const mongoose = require("mongoose");

// it's middleware also but it create headers in our responses
app.use(cors());

app.use(express.json());

app.use("/users",userRoute);
app.use("/notes",noteRouter);

app.get("/",(req,res)=>{
    res.send("Notes API from TahirDev");
});

//for testing purpose
// app.use((req,res,next) => {
//     console.log("HTTP Method -" + req.method + " , URL -" + req.url);
//     next();
// });


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server started on port no ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
})

