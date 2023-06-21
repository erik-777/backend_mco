import mongoose from "mongoose";
import OpenConnection from "../service/mongo/openConnetion.js";
import ClosedConnection from "../service/mongo/closedConnetion.js";
import dotenv from "dotenv";
dotenv.config();
const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  sku: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});

const productModel = mongoose.model("product", productSchema, "product");

export async function CreateProduct(product) {
  OpenConnection(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`
  )
    .then(() => {
      productModel.insertMany(product);
    })
    .catch((err) => {
      console.log(err);
    });
}
export async function GetProduct(id) {
  let product = OpenConnection(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`
  )
    .then(() => {
      // console.log("Funtion called " + id);
      product = productModel.find({ id: `${id}` });
      // console.log(product);
      return product;
    })
    .catch((err) => {
      console.log("Product not found");
    })
    .finally(() => {
      ClosedConnection();
    });
  return product;
}
export async function Product() {
  let product = OpenConnection(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`
  )
    .then(() => {
      // console.log("Funtion called " + id);
      product = productModel.find();
      // console.log(product);
      return product;
    })
    .catch((err) => {
      console.log("Product not found");
    })
    .finally(() => {
      ClosedConnection();
    });
  return product;
}
export function Delete(id) {
  let product = OpenConnection(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`
  )
    .then(() => {
      const product = productModel.deleteMany({ id: `${id}` });
      return product;
    })
    .catch((err) => {
      console.log(err);
    });
  return product;
}
export async function Update(id, product) {
  let productUpdate = OpenConnection(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}`
  )
    .then(() => {
      productUpdate = productModel.findOneAndUpdate({ id: `${id}` }, product);
      return productUpdate;
    })
    .catch((err) => {
      console.log(err);
    });

  return productUpdate;
}

export default productModel;
