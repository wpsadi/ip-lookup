import express from "express"

import resolveIP from "./using Puppeteer/01 beginning/01.js"
import {config} from "dotenv"
config()

import {exec} from "child_process"

// Replace 'ls' with the command you want to run
let test = ()=>exec('npx puppeteer browsers install chrome', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Command stderr: ${stderr}`);
    return;
  }
  console.log(`Command output: ${stdout}`);
});

test()

const app = express()

app.use("/ip/:ip", async(req, res) => {
    try{
        if (!req.params.ip){
            throw new Error("IP Address is required")
            return
        }
        const result = await resolveIP(req.params.ip)

        res.status(200).json(result)


    }catch(e){
        res.status(400).send(e.message)
    }
})

app.use("*", (req, res) => {
    res.send("send Request to /ip/:ip-address<br> Example: /ip/8.8.8.8")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000")
})