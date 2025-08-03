import "dotenv/config";
import express from "express";
import dbConnect from "./src/db/config.mjs";
import cors from "cors";
import rootRouter from "./src/Routes/index.mjs";
import cookieParser from "cookie-parser";

const server = express();
const PORT = process.env.PORT || 5001;

server.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);
server.use(express.json());
server.use(cookieParser())

//ROUTE CONNECT
server.use("/api/v1/", rootRouter);

// server.use('/uploads', express.static('uploads'));

dbConnect.then(() => {
   console.log("DB Connected...... :)");
   server.listen(PORT, () =>
      console.log(`Server is running........on port ${PORT}`)
   );
});
