import mongoose from "mongoose";
//  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`
export default function OpenConnection(uri) {
  return mongoose.connect(uri);
}
