import express from "express";
import creds from "./creds";
import userRoutes from "./handlers/usersHandler";

const app: express.Application = express();
const port = parseInt(creds.port as string);

app.use(express.json());

app.get("/", (_req: express.Request, res: express.Response) => {
  // console.log(_req.body);
  res.sendStatus(200);
});

userRoutes(app);

app.listen(port, () => {
  console.log(`Server is now operational on port ${port}`);
});

export default app;
