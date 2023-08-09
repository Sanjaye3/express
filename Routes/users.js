import express from "express";
import { createUser, genPassword, getUserByName, verifyPassword } from "./helper.js";
 

const router = express.Router();


 
  
  ///////////////////signup/////////////////////////////
router.post("/signup",async function (request,response) {
    const {username,password} = request.body;
     

    const hashedPassword = await genPassword(password);


    const isUserExist = await getUserByName(username);
    console.log(isUserExist);

    if(isUserExist){
        response.status(400).send({message:"user already exist"});
    } else if (password.length < 5){
        response.status(400).send({message:"Provide a Longer Password"});
    }
    else {
    const newUser ={username:username, password:hashedPassword};
    const result = await createUser(newUser);
    response.send(result);
    }
  })
  
// /////////////////////login//////////////////////////



  router.post("/login",async function (request,response) {
    const {username,password} = request.body;
     
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);


    if(!userFromDB){
        response.send({message:"Invalid Credentials"});
    } else {
         const storePassword = userFromDB.password;
         const isPasswordMatch = await verifyPassword(password,storePassword)


         if (isPasswordMatch){
            response.send({message:"logged in"})
         }
         else {
            response.send({message:"invalid credentials"});
         }
    }

   
  })
 






export const usersRouter = router;




