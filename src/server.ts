import express, { Request, Response, Application } from 'express'
import bodyParser from 'body-parser'
import weaponsRoutes from "./handlers/api/weapons";
import usersRoutes from "./handlers/api/users";

const app: Application = express();

const port: number = 3000;

app.use(bodyParser.json());

app.use("/api/mythical_weapons/", weaponsRoutes);
app.use("/api/users/", usersRoutes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

app.listen(port, function () {
    console.log(`starting app on port: ${port}`)
});

export default app;

