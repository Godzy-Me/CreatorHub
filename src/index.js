// required('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);         // this and the line above it fixed the querySrv ECONNREFUSED _mongodb._tcp.cluster0.mnrgrpd.mongodb.net + some dns issue

dotenv.config({
    path : '/.env'
})


connectDB()
























/*
(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR: ",error)
            throw error
        })

        app.listen(process.env.PORT, ()=> {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }catch(error){
        console.error("ERROR: ",error)
        throw error
    }
} ) ()

*/
