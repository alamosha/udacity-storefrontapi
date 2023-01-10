import express from "express";
import { CategoryModel } from "../models/categoriesModel";
import jwt from "jsonwebtoken";
import creds from "../creds";

const categoryModel = new CategoryModel();

const listCategories = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const cats = await categoryModel.index();
    res.json(cats);
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
    const cat = await categoryModel.show(parseInt(req.params.id));
    res.json(cat);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};
const editCategory = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const editCat = await categoryModel.editCategory(
      parseInt(req.params.id),
      req.body.category_name
    );
    res.json(editCat);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const createCategory = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const createCat = await categoryModel.addCategory(req.body.category_name);
    res.json(createCat);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const deleteCategory = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const deleteCat = await categoryModel.deleteCategory(parseInt(req.params.id));
    res.json(deleteCat);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const categoryRoutes = (app: express.Application) => {
  app.get("/categories", listCategories);
  app.get("/category/:id", show);
  app.post("/category/:id/update", editCategory);
  app.post("/create_category", createCategory);
  app.delete('/category/:id/delete', deleteCategory)
};

export default categoryRoutes;
