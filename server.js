 const express = require('express')
//  require("dotenv").config({path:"./config/.env"});
  const mongoose = require('mongoose')
  const app = express()
const bodyParser = require('body-parser')
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// connection to database---------------------------------------
mongoose
  //   .connect(process.env.CONNECT)
  .connect('mongodb+srv://hamza:hamza@apis.fkvqm.mongodb.net/restapi?retryWrites=true&w=majority')
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));


//routes--------------------------------------------------------
app.post("/",async (req,res,next)=>{
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.status(201).json({message: "success"})
    }catch(error){
        res.status(500).send(error);
    }
});

app.get("/",async (req,res,next)=>{
    try{
        const users = await  User.find({});
        res.status(201).send(users);
    }catch(error){
        res.status(500).send(error);
    }
});
app.put("/:id",async (req,res,next)=>{
    try{
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body}
        );
        if(!updateUser){
            res.status(404).send("not found");
        }
        res.status(201).send(updateUser);

    }catch(error){
        res.status(500).send(error);
    }
});
app.delete("/:id",async (req,res,next)=>{
    try{await User.findOneAndDelete({_id:req.params.id})
    res.status(201).send("success");}
    catch(error){
        res.status(500).send(error);
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))



