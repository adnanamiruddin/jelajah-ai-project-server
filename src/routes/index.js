import express from "express";
import usersRoute from "../routes/users.route.js";
import toolsRoute from "../routes/tools.route.js";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/tools", toolsRoute);

export default router;
