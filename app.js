const express = require('express');
const db = require('./db');
const router = require('./routes/router');
const app = new express();
const port = 8000;
const cors = require('cors');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("./uploads"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});