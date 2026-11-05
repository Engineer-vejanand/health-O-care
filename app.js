const express = require("express");//actuall backend connect here 
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const path = require("path");
app.use(express.static(path.join(__dirname,"public")));

const {connectDB} = require("./db/index.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRouter = require("./routes/users.route.js");
const indexRouter = require("./routes/index.js");
const orderRouter = require("./routes/orders.route.js")
const appointmentRouter = require("./routes/appoitment.route.js")
const healthrecordRouter = require("./routes/healthrecord.route.js")

const cookieParser = require("cookie-parser");

require("dotenv").config();

app.set("view engine","ejs");
app.use(cookieParser());

app.use("/",indexRouter);
app.use("/users",userRouter);
app.use("/orders",orderRouter);
app.use("/appointments",appointmentRouter);
app.use("/health-records",healthrecordRouter);

const PORT = 3000;
connectDB()
.then(()=>{
    app.listen(3000 , ()=>{
        console.log(`server is running at port : ${PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!!",err);
})
