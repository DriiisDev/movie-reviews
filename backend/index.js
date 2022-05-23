import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config(); 

const uri = process.env.MOVIEREVIEWS_DB_URI;

const client = new mongodb.MongoClient(uri);

const port = process.env.PORT||8000;


async function main(){

    try{
        //Connect to the MongoDB cluster
        await client.connect();
        app.listen(port, ()=>{
            console.log("server is running on port:" +port);
        })
    }catch(e){
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error);