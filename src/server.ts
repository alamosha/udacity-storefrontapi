import express from "express";
import creds from "./creds";
import userRoutes from "./handlers/usersHandler";
import productsRoutes from "./handlers/productsHandler";
import ordersRoutes from "./handlers/ordersHandler";
import categoryRoutes from "./handlers/categoryHandler";

const app: express.Application = express();
const port = parseInt(creds.port as string);

app.use(express.json());

app.get("/", (_req: express.Request, res: express.Response) => {
  // console.log(_req.body);
  res.sendStatus(200);
});

userRoutes(app);
productsRoutes(app)
ordersRoutes(app)
categoryRoutes(app)

app.listen(port, () => {
  console.log(`Server is now operational on port ${port}`);
});

export default app;
