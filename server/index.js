const express = require("express");
const app = express(); // Takes express lib and runs it
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.listen(5000, () => {
    console.log("started server on port 5000")
});