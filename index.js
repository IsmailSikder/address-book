
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

    //adding to the address-book 
    app.post('/registar',(req,res)=>{
        console.log(req.body)
        name= req.body.name
        email= req.body.email
        phoneNumber= req.body.phoneNumber
        place= req.body.place

        let newAddress = new Address({
            name:name,
            email:email,
            phoneNumber,
            place: place
        })
        newAddress.save()
        .then(address=>res.send(address))
        .catch(err=>console.log(err))
    })

    //retrieve the user from database byb id
    app.get('/user/:id', (req,res)=>{

        Address.findById(req.params.id)
        .then(address=>res.send(address), console.log('found'))
        .catch(err=>console.log('address not there'))
        // .then(()=>console.log('address found'))
        // .catch(err=>console.log('address not there'))
    })

    //update a user address by id
    app.put('/update/:id',(req,res)=>{
        let address ={}
        if(req.body.name) address.name=req.body.name
        if(req.body.email) address.email=req.body.email
        if(req.body.phoneNumber) address.phoneNumber=req.body.phoneNumber
        if(req.body.place) address.place = req.body.place

        address = {$set:address}

        Address.update({_id:req.params.id},address)
        .then(()=>res.send(address))
        .catch(err=>console.log(err))
    })

    app.delete('/delete/:id',(req,res)=>{

        Address.remove({_id:req.params.id})
        .then(()=>res.send('Removed'))
        .catch(err=>console.error(err))
    })