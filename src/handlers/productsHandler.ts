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
    res.json(err)
  }
};

const create = async (req:express.Request, res:express.Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        jwt.verify(token as string, creds.tokenSecret as string)
    } catch (err) {
        res.status(401)
        res.send(`Authentication Error`)
        return
    }
    try {
        const newProd = await productModel.create(req.body)
        res.json(newProd)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req:express.Request, res:express.Response) => {
    try {
        const product = await productModel.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const productsRoutes = (app:express.Application) => {
    app.get('/products', listProducts)
    app.post('/create_product', create)
    app.get('/product/:id', show)
}

export default productsRoutes;