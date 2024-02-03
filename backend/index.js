import connectDB from "./DB/dataBase.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: './backend/.env' });

console.log(`port: ${process.env.PORT}`);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(`connection Failed`, err);
});
