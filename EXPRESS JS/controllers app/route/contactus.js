const express=require('express')
const route=express.Router();
const contactUsController=require('../controllers/contactus')

route.get('/contactus',contactUsController.getContactUs)

module.exports=route;