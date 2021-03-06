import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from "./dao/moviesdao.js"
import ReviewsDAO from "./dao/reviewsdao.js"

dotenv.config(); 

const uri = process.env.MOVIEREVIEWS_DB_URI;

const client = new mongodb.MongoClient(uri);

const port = process.env.PORT||8000;


async function main(){

    try{
        //Connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)

        app.listen(port, ()=>{
            console.log("server is running on port:" +port);
        })
        
    }catch(e){
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error);