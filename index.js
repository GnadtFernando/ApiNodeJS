require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/personRoutes');


app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

const personRoutes = require('./routes/personRoutes');

app.use('/register', personRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ujjbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000);
        console.log("Conectado")
    })
    .catch((err) => console.log(err));
