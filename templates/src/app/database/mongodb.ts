import { connect } from 'mongoose';



const url: string = process.env.MONGODB_URI!;

(async() => {
   try {
    await connect(url);
    console.log('DB is connected successfuly')
   } catch (error) {
     console.log(error)
   }
})()