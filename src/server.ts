import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import apiRoutes from "./handlers/api/mythical_weapons";

const app: express.Application = express();

const port: number = 3000;

app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

app.listen(port, function () {
    console.log(`starting app on port: ${port}`)
});

export default app;

