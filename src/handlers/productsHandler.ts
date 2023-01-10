import express from "express";
import { ProductModel } from "../models/productsModel";
import jwt from "jsonwebtoken";
import creds from "../creds";

const productModel = new ProductModel();

const listProducts = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await productModel.index();
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const newProd = await productModel.create(req.body);
    res.json(newProd);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const modProd = await productModel.updateProduct(req.body, parseInt(req.params.id));
    res.json(modProd);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const delProd = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const del = await productModel.deleteProduct(parseInt(req.params.id));
    res.json(del);
  } catch (err) {
    res.status(400);
    res.send(err);   
  }
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", listProducts);
  app.post("/create_product", create);
  app.get("/product/:id", show);
  app.post("/product/:id/update", update);
  app.delete('/product/:id/delete', delProd)
};

export default productsRoutes;
