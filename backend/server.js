import express from "express"
import cors from "cors"
import "dotenv/config"


const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('server is live')
})


const port= process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("App is running on port ", port);
})