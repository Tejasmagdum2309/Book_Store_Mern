
import { asyncHandler } from "../utils/asyncHandler.js";

 const fi = asyncHandler(  async (req,res)=>{

        console.log("sending / message 1....");
        return res.status(200).send("yop11...");
       
})

const sec = async (req,res)=>{
    try {
        console.log("sending / message 2....");
        return res.status(200).send("yop22...");
       } catch (error) {
          console.log("error" , error)
       }
}

export {fi,sec}