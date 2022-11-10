import app from './app';
import dotenv from "dotenv";
import {appDataSource} from "./db";

dotenv.config();

async function main() {
    try {
        await appDataSource.initialize();
        console.log('Database connected')
        const port = process.env.PORT || 3000
        app.listen(port)
        console.log('Sever listen on port', 3000)
    } catch (error) {
        console.error(error)
    }
}
main()

