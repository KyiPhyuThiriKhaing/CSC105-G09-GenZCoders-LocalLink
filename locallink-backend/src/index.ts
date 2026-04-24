import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

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
