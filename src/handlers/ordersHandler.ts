import express from "express";
import { OrderModel } from "../models/ordersModel";
import jwt from "jsonwebtoken";
import creds from "../creds";

const orderModel = new OrderModel();

const listOrders = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const orders = await orderModel.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const order = await orderModel.show(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const newOrder = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const newOrd = await orderModel.addOrder(req.body);
    res.json(newOrd);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const addItem = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const add = await orderModel.addItem(parseInt(req.params.id), req.body);
    res.json(add);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const editItem = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const edit = await orderModel.editItem(parseInt(req.params.id), req.body);
    res.json(edit);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const deleteItem = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const del = await orderModel.deleteItem(parseInt(req.params.id));
    res.json(del);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const deleteOrder = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const del = await orderModel.deleteOrder(parseInt(req.params.id));
    res.json(del);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.post("/create_order", newOrder);
  app.get("/orders", listOrders);
  app.get('/order/:id', show)
  app.post("/order/:id/add", addItem);
  app.post("/order/:id/edit", editItem);
  app.delete("/order/:id/delete_item", deleteItem);
  app.delete('/order/:id/delete_order', deleteOrder)
};

export default ordersRoutes;
