import express from "express";
import { UserModel } from "../models/usersModel";
import jwt from "jsonwebtoken";
import creds from "../creds";

const userModel = new UserModel();

const listUsers = async (_req: express.Request, res: express.Response) => {
  try {
    const auth = _req.headers.authorization;
    const token = auth?.split(" ")[1];
    if (auth?.split(" ")[0].toLowerCase() === "bearer") {
      try {
        jwt.verify(token as string, creds.tokenSecret as string);
      } catch (err) {
        res.status(401);
        res.json("Authentication Failed!");
        return;
      }
      const users = await userModel.index();
      res.json(users);
    } else {
      res.status(401);
      res.json("Authentication Failed!");
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const username = await userModel.createUser(req.body);
    const token = jwt.sign(
      { user_data: username },
      creds.tokenSecret as string
    );
    res.json({ username, token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.show(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.json("User not found.");
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const modUser = await userModel.updateUser(req.body);
    res.json(modUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token as string, creds.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.send(`Authentication Error`);
    return;
  }
  try {
    const delUser = await userModel.deleteUser(req.body.username);
    res.json(delUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: express.Request, res: express.Response) => {
  try {
    const authUser = await userModel.authenticate(
      req.body.username,
      req.body.password
    );
    const token = jwt.sign(
      { user_data: authUser },
      creds.tokenSecret as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.post("/create_user", createUser);
  app.get("/users", listUsers);
  app.get("/user/:id", showUser);
  app.post("/authenticate", authenticate);
  app.post("/user/update", updateUser);
  app.delete("/user/delete", deleteUser);
};

export default userRoutes;
