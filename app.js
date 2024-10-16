require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/blog", require("./Routes/blogRoutes"))

app.get("/", (req, res)=>{
    res.send("<h2 style='text-align: center; margin: 20px;'>This is a Blog API</h2>")
});

app.listen(PORT, ()=>{
    console.log("Server is up at "+PORT);
})