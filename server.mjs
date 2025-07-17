import 'dotenv/config';
import express from 'express';
import rootRouter from './Routes/index.mjs';
import dbConnect from './src/db/config.mjs';



const server = express()
const PORT = process.env.PORT || 5001

server.use(express.json())
// server.use(cors());
//ROUTE CONNECT 
server.use('/api/v1/',rootRouter);

// server.use('/uploads', express.static('uploads'));



dbConnect.then(()=>{
    console.log("DB Connected...... :)");
    server.listen(PORT,()=>console.log(`Server is running........on port ${PORT}`));
    
})


