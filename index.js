import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import "dotenv/config.js";

const app = express();

const corsOptions = {
  origin: "https://jelajah-ai-web.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
