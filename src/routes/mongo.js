import express from "express";
import {
  CreateProduct,
  GetProduct,
  Delete,
  Update,
  Product,
} from "../schema/productSchema.js";

const Mongo = express.Router();
Mongo.get("/", (req, res) => {
  res.send("Hello to the server!");
});
Mongo.post("/create", (req, res) => {
  // console.log(req.body);
  //CreateProduct(req.body);

  CreateProduct(req.body).then((data) => {
    res.send("Created").status(200);
  });
});
Mongo.get("/get", (req, res) => {
  GetProduct(req.query.id).then((data) => {
    res.send(data).status(200);
  });
});
Mongo.get("/product", (req, res) => {
  Product()
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((err) => {
      res.send("Products not found").status(200);
    });
});
Mongo.post("/delete", (req, res) => {
  Delete(req.body.id).then((data) => {
    if (data.deletedCount >= 1) {
      res.send("Deleted").status(200);
    } else {
      res.send("Not Deleted").status(200);
    }
  });
});
Mongo.post("/update", (req, res) => {
  Update(req.body.id, req.body)
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((err) => {
      res.send("Not Updated").status(200);
    });
});
export default Mongo;
