import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/index";
import { uploadsDir } from "./lib/uploads";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.get("/", (_req, res) => {
  res.json({
    message: "LocalLink backend is running.",
  });
});

app.use("/api", apiRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
