const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// Handling the news letter
router.post("/subscribe", async(req, res) =>{
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({message:"Email is required"});
    }

    try {
        // Checking if the email is subscribed
        let subscriber = await Subscriber.findOne({ email });

        if(subscriber){
            return res.status(400).json({message: "email is already subscribed"});
        }

        subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({message: "Successfully subscribed to the news letter"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server on email has error"});
    }
});

module.exports = router;