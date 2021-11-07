const express=require("express");
const path=require("path");
const dotenv=require("dotenv");
const router=require("./routers/index")
const cookieParser=require("cookie-parser");
const connectionDatabase = require("./helpers/database/connectionDatabase")
const bodyParser=require("body-parser");

const app = express();

dotenv.config({
  path: './config/env/config.env',
});


connectionDatabase()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use("/api",router)



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening app at http://localhost:${port}`);
});
