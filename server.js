import { APP_PORT,DB_URL } from './config';
import express from 'express';
import routes from './routes';
import mongoose  from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import  path  from 'path';

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log('DB connected')
})

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

global.appRoot = path.resolve(__dirname);


const app = express();
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions)) 

app.use(express.json());

app.use('/api',routes);

 app.use(errorHandler); 


app.listen(APP_PORT,()=>{
    console.log(`listning on port ${APP_PORT}`)
})