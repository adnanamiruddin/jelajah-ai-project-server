import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import "dotenv/config.js";

const app = express();
app.use(
  cors({
    origin: "*",
    headers: "content-type",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposeHeaders:
      "access-control-allow-origin,access-control-allow-methods,access-control-allow-headers",
  })
);
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
