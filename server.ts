import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
