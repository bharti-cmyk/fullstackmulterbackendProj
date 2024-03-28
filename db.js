const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log("DATABASE connected")).catch((err)=> console.log("error" + err.message));

