import express from "express";
import { mongoURI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import transactionsRoutes from "./routes/transactions.js";
import path from "path";

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("build"));
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(mongoURI);

app.use("/api/transactions", transactionsRoutes);

app.get("/", (req, res) => res.send("hello"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client, public", "index.html"));
  });
}

app.listen(port, () => console.log("Express is running at port " + port));
