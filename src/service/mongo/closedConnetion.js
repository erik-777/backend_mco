import mongoose from "mongoose";
export default function ClosedConnection() {
  return mongoose.disconnect();
}
