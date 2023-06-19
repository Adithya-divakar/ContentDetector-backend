import express from "express";


const router = express.Router()

router.post("/log",()=>{
    console.log("working,,,");
})
export default router
