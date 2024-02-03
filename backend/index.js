
import connectDB from "./DB/dataBase.js";
import app from "./app.js";
import dotenv from "dotenv";


dotenv.config({ path: './backend/.env' });




connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log(`connection Failed`,err)
})