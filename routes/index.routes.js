const express = require("express");
const authRoutes = require("./auth.routes");
const courseRoutes = require("./course.routes");
const scheduleRoutes = require("./schedule.routes");

const app = express();

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/schedule", scheduleRoutes);

module.exports = app;
