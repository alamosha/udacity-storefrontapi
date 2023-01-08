import express from "express";
import creds from "./creds";
// import db from "./database";

const app: express.Application = express();
const port = parseInt(creds.port as string);

app.get('/', (_req:express.Request, res:express.Response) => {
    // console.log(req);
    res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server is now operational on port ${port}`);
});

export default app;