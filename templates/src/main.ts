import dotenv from 'dotenv';
dotenv.config();
import { app } from './app/app';


const port = process.env.PORT || 2818;

app.listen(port, () => {
    console.log(`Server runing on http://localhost:${port}`)
});