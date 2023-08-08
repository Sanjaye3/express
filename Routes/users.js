import express from "express";
import { genPassword } from "./helper.js";
 

const router = express.Router();


 
  
  
router.post("/signup",async function (request,response) {
    const {username,password} = request.body;
    console.log(password);
    const hashedPassword = await genPassword(password)
  
   
    response.send(hashedPassword);
  })
  
 






export const usersRouter = router;




