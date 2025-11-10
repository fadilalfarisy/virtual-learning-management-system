import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { initDatabase } from "./config/database.js";

dotenv.config();

initDatabase();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONT_END_ORIGIN],
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Path not found" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
