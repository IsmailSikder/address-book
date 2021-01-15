
const express = require('express')

const Address = require('./model/models.js');

const bodyParser = require('body-parser')

//initializing express
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

//setting post to listen
app.listen(3000,()=>console.log('listening to 3000'))

// getting collection string from mongo atlas
const collectionsStr = 'mongodb+srv://msikder:msikder08@cluster0.n8b3k.mongodb.net/address-book?retryWrites=true&w=majority';

const mongoose = require('mongoose')

//creating connection to mongo atlas cluster
mongoose.connect(collectionsStr,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log('connected to db'))
    .catch(err=>console.log(err))
