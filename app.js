import express from "express";
import cors from "cors";
import Mongo from "./src/routes/mongo.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello to the server!");
});
app.use("/mongo", Mongo);
app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
