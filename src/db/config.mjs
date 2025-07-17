import { connect } from "mongoose";

const dbConnect = connect(process.env.MONGO_URL);

export default dbConnect;
